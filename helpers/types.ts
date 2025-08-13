export interface InstallTemplateArgs {
    appName: string;
    root: string;
    bundler: "default" | "vite" | "webpack";
    language: "ts" | "js";
    useAxios: boolean;
    packageManager: string;
    skipInstall?: boolean;
  }
  