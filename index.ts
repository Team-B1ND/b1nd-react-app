import { Command } from "commander";
import { createProject } from "./helpers/create";
import { green, cyan } from "picocolors";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

interface ProgramOptions {
  bundler?: string;
  language?: string;
  packageManager?: string;
  axios?: boolean;
  skipInstall?: boolean;
}

const program = new Command();

program
  .name("b1nd-react-app")
  .description("Create a new project with B1ND Boilerplate")
  .version(pkg.version)
  .argument("[directory]", "Project directory (use '.' for current directory)")
  .option("--bundler <bundler>", "Choose bundler: rsbuild, vite")
  .option("--language <language>", "Choose language: ts, js")
  .option("--package-manager <pm>", "Choose package manager: npm, yarn, pnpm, bun")
  .option("--axios", "Include Axios")
  .option("--no-axios", "Exclude Axios")
  .option("--skip-install", "Skip dependency installation", false)
  .action(async (directory: string | undefined, options: ProgramOptions) => {

    if (!directory && process.argv.length === 2) {
      console.log(green("🚀 B1ND React App Creator"));
      console.log();
      console.log("Usage:");
      console.log(`  ${cyan("npx b1nd-react-app my-app")}     Create in new directory`);
      console.log(`  ${cyan("npx b1nd-react-app .")}          Create in current directory`);
      console.log();
      console.log("Examples:");
      console.log(`  ${cyan("npx b1nd-react-app my-app")}`);
      console.log(`  ${cyan("npx b1nd-react-app .")}`);
      console.log(`  ${cyan("npx b1nd-react-app my-app --bundler rsbuild --language ts")}`);
      console.log();
      program.help();
      return;
    }

    await createProject(directory || ".", options);
  });

program.on('command:*', () => {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);
