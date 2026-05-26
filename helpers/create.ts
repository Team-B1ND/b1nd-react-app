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

  const validBundlers = ["default", "webpack", "vite"];
  const validLanguages = ["ts", "js"];
  const validPkgManagers = ["npm", "yarn", "pnpm", "bun"];

  const validate = (label: string, value: string | undefined, allowed: string[]) => {
    if (value && !allowed.includes(value)) {
      console.log(red("✖") + ` Invalid --${label} "${value}". Allowed: ${allowed.join(", ")}`);
      process.exit(1);
    }
  };
  validate("bundler", options.bundler, validBundlers);
  validate("language", options.language, validLanguages);
  validate("package-manager", options.packageManager, validPkgManagers);

  const questions: prompts.PromptObject[] = [];
  if (!options.bundler) {
    questions.push({
      type: "select",
      name: "bundler",
      message: "Choose a bundler:",
      choices: [
        { title: "Default", value: "default" },
        { title: "Webpack", value: "webpack" },
        { title: "Vite", value: "vite" },
      ],
    });
  }
  if (!options.language) {
    questions.push({
      type: "select",
      name: "language",
      message: "Choose a language:",
      choices: [
        { title: "TypeScript", value: "ts" },
        { title: "JavaScript", value: "js" },
      ],
    });
  }
  if (!options.packageManager) {
    questions.push({
      type: "select",
      name: "packageManager",
      message: "Choose a package manager:",
      choices: validPkgManagers.map(p => ({ title: p, value: p })),
    });
  }
  if (typeof options.axios !== "boolean") {
    questions.push({
      type: "confirm",
      name: "useAxios",
      message: "Include Axios?",
      initial: true,
    });
  }

  const answers = questions.length > 0
    ? await prompts(questions, {
        onCancel: () => {
          console.log();
          console.log(red("✖") + " Operation cancelled");
          process.exit(0);
        },
      })
    : ({} as Record<string, unknown>);

  const bundler = (options.bundler ?? (answers.bundler as string | undefined));
  const language = (options.language ?? (answers.language as string | undefined));
  const useAxios = typeof options.axios === "boolean" ? options.axios : (answers.useAxios as boolean | undefined);

  if (!bundler || !language || typeof useAxios !== "boolean") {
    console.log();
    console.log(red("✖") + " Operation cancelled");
    process.exit(0);
  }

  const packageManager = (options.packageManager ?? (answers.packageManager as string | undefined) ?? getPkgManager());

  await installTemplate({
    appName: projectName,
    root: resolvedPath,
    bundler: bundler as "default" | "vite" | "webpack",
    language: language as "ts" | "js",
    useAxios,
    packageManager,
    skipInstall: options.skipInstall ?? false,
  });
}