import { resolve, join } from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { cyan } from "picocolors";
import { copyDir } from "../helpers/copy";
import { installDependencies } from "../helpers/install";
import type { InstallTemplateArgs } from "./types";


export async function installTemplate({
  appName,
  root,
  bundler,
  language,
  useAxios,
  packageManager,
  skipInstall,
}: InstallTemplateArgs) {
  const templateName = useAxios ? `${bundler}-axios` : bundler;
  const templatePath = resolve(__dirname, "templates", templateName, language);
  
  if (!existsSync(templatePath)) {
    console.error(`❌ Template does not exist: ${templatePath}`);
    process.exit(1);
  }

  console.log(`📁 Using template: ${templateName}/${language}`);
  await copyDir(templatePath, root);

  const packageJsonPath = join(root, "package.json");

  const hasPkgJson = existsSync(packageJsonPath);
  if (hasPkgJson) {
    const pkgRaw = await fs.readFile(packageJsonPath, "utf8");
    const pkg = JSON.parse(pkgRaw);
    pkg.name = appName;

    await fs.writeFile(packageJsonPath, JSON.stringify(pkg, null, 2));
  }

  if (skipInstall) return;

  console.log("\n📦 Installing dependencies:");
  const deps = hasPkgJson
    ? Object.keys(JSON.parse(await fs.readFile(packageJsonPath, "utf8")).dependencies || {})
    : [];

  deps.forEach(dep => console.log(`- ${cyan(dep)}`));

  await installDependencies(packageManager, root, appName);
}
