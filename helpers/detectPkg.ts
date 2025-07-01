import { existsSync } from "fs";

export function getPkgManager(): string {
  if (existsSync("yarn.lock")) return "yarn";
  if (existsSync("pnpm-lock.yaml")) return "pnpm";
  if (existsSync("bun.lockb")) return "bun";
  return "npm";
}
