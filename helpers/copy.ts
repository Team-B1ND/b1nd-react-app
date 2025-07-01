import { existsSync, mkdirSync, readdirSync, copyFileSync, lstatSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

export function copyDir(src: string, dest: string) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });

  for (const file of readdirSync(src)) {
    const srcFile = join(src, file);
    const destFile = join(dest, file);
    
    if (lstatSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      // _gitignore 파일을 .gitignore로 변환
      if (file === "_gitignore") {
        const gitignoreContent = readFileSync(srcFile, "utf8");
        writeFileSync(join(dest, ".gitignore"), gitignoreContent);
      } 
      // gitignore.template 파일을 .gitignore로 변환
      else if (file === "gitignore.template") {
        const gitignoreContent = readFileSync(srcFile, "utf8");
        writeFileSync(join(dest, ".gitignore"), gitignoreContent);
      }
      // 일반 파일 복사
      else {
        copyFileSync(srcFile, destFile);
      }
    }
  }
}