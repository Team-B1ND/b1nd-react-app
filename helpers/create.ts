import { resolve, basename } from "path";
import prompts from "prompts";
import { mkdirSync, existsSync } from "fs";
import { red, cyan, green } from "picocolors";
import { installTemplate } from "../helpers/installTemplate";
import { getPkgManager } from "./detectPkg";
import { isFolderEmpty } from "./is-folder-empty";

interface ProjectOptions {
  bundler?: string;
  language?: string;
  packageManager?: string;
  axios?: boolean;
  skipInstall?: boolean;
}

export async function createProject(dir: string, options: ProjectOptions = {}) {
  const projectPath = dir || ".";
  const resolvedPath = resolve(process.cwd(), projectPath);
  
  // 현재 디렉토리인지 확인
  const isCurrentDir = projectPath === "." || resolvedPath === process.cwd();
  
  // 프로젝트 이름 결정
  const projectName = isCurrentDir 
    ? basename(process.cwd()) 
    : basename(resolvedPath);

  // 디렉토리가 존재하지 않으면 생성
  if (!existsSync(resolvedPath)) {
    mkdirSync(resolvedPath, { recursive: true });
  }

  // 디렉토리가 비어있는지 확인
  if (existsSync(resolvedPath) && !isFolderEmpty(resolvedPath, projectName)) {
    process.exit(1);
  }

  if (isCurrentDir) {
    console.log(`Creating a new B1ND React app in ${cyan("current directory")}.`);
    console.log(`Project name: ${green(projectName)}`);
  } else {
    console.log(`Creating a new B1ND React app in ${cyan(resolvedPath)}.`);
  }
  console.log();

  const answers = await prompts([
    {
      type: "select",
      name: "bundler",
      message: "Choose a bundler:",
      choices: [
        { title: "Default", value: "default" },
        { title: "Webpack", value: "webpack" },
        { title: "Vite", value: "vite" },
      ],
    },
    {
      type: "select", 
      name: "language",
      message: "Choose a language:",
      choices: [
        { title: "TypeScript", value: "ts" },
        { title: "JavaScript", value: "js" },
      ],
    },
    {
      type: "select",
      name: "packageManager", 
      message: "Choose a package manager:",
      choices: ["npm", "yarn", "pnpm", "bun"].map(p => ({ title: p, value: p })),
    },
    {
      type: "confirm",
      name: "useAxios",
      message: "Include Axios?",
      initial: true,
    },
  ], {
    onCancel: () => {
      console.log();
      console.log(red("✖") + " Operation cancelled");
      process.exit(0);
    }
  });

  // 사용자가 중간에 취소한 경우
  if (!answers.bundler) {
    console.log();
    console.log(red("✖") + " Operation cancelled");
    process.exit(0);
  }

  const packageManager = answers.packageManager || getPkgManager();

  await installTemplate({
    appName: projectName,
    root: resolvedPath,
    bundler: answers.bundler,
    language: answers.language,
    useAxios: answers.useAxios,
    packageManager,
    skipInstall: false,
  });
}