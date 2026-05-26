export interface InstallTemplateArgs {
  appName: string;
  root: string;
  bundler: "rsbuild" | "vite";
  language: "ts" | "js";
  useAxios: boolean;
  packageManager: string;
  skipInstall?: boolean;
}
