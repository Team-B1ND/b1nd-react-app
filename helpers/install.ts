import { performance } from "node:perf_hooks";
import { bold, green, cyan } from "picocolors";
import { spawn } from "child_process";
import { promisify } from "util";

class SimpleSpinner {
  private interval?: NodeJS.Timeout;
  private frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private currentFrame = 0;
  private text: string;
  private isSpinning = false;

  constructor(text: string) {
    this.text = text;
  }

  start() {
    if (this.isSpinning) return this;
    
    this.isSpinning = true;
    process.stdout.write('\x1B[?25l'); // Hide cursor
    
    // 즉시 첫 프레임 출력
    this.render();
    
    this.interval = setInterval(() => {
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
      this.render();
    }, 80); // 80ms로 더 빠르게 조정
    
    return this;
  }

  private render() {
    if (!this.isSpinning) return;
    
    // 현재 줄을 완전히 지우고 새로 그리기
    process.stdout.write('\r\x1B[K'); // Clear line
    process.stdout.write(this.frames[this.currentFrame] + ' ' + this.text);
  }

  succeed(text: string) {
    this.stop();
    process.stdout.write('\r\x1B[K✅ ' + green(text) + '\n');
  }

  fail(text: string) {
    this.stop();
    process.stdout.write('\r\x1B[K❌ ' + text + '\n');
  }

  updateText(text: string) {
    this.text = text;
    if (this.isSpinning) {
      this.render();
    }
  }

  private stop() {
    this.isSpinning = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    process.stdout.write('\x1B[?25h'); // Show cursor
  }
}

function runCommand(command: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'pipe', // 출력을 파이프로 처리
      shell: true
    });

    let stderr = '';

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

export async function installDependencies(
  packageManager: string,
  cwd: string,
  projectName?: string
) {
  const spinner = new SimpleSpinner("📦 Installing dependencies...");
  spinner.start();
  const startTime = performance.now();

  try {
    // 패키지 매니저별 명령어 설정
    let command: string;
    let args: string[];

    switch (packageManager) {
      case 'yarn':
        command = 'yarn';
        args = ['install'];
        break;
      case 'pnpm':
        command = 'pnpm';
        args = ['install'];
        break;
      case 'bun':
        command = 'bun';
        args = ['install'];
        break;
      default:
        command = 'npm';
        args = ['install'];
    }

    spinner.updateText(`📦 Installing dependencies with ${packageManager}...`);
    
    await runCommand(command, args, cwd);

    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);
    spinner.succeed(`Dependencies installed in ${duration}s using ${packageManager}`);

    if (projectName) {
      console.log(green(`\n✅ Project "${projectName}" created successfully! 🚀`));
      console.log();
      console.log("Next steps:");
      console.log(bold(`  cd ${projectName === "." ? "" : projectName}`));
      console.log(bold(`  ${packageManager} ${packageManager === 'npm' ? 'run ' : ''}dev`));
      console.log();
    }
  } catch (error) {
    spinner.fail("Failed to install dependencies");
    console.error(error);
    process.exit(1);
  }
}