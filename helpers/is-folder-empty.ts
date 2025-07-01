/* eslint-disable import/no-extraneous-dependencies */
import { lstatSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { green, blue, yellow } from 'picocolors';

export function isFolderEmpty(root: string, name: string): boolean {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'LICENSE',
    'Thumbs.db',
    'docs',
    'mkdocs.yml',
    'npm-debug.log',
    'yarn-debug.log',
    'yarn-error.log',
    'yarnrc.yml',
    '.yarn',
    'README.md',
    'readme.md',
    '.vscode',
    '.env.example',
    '.env.local.example',
    // 추가로 허용할 파일들
    'package.json',
    'tsconfig.json',
    'jsconfig.json',
  ];

  const isCurrentDir = resolve(root) === process.cwd();
  
  const conflicts = readdirSync(root).filter(
    (file) =>
      !validFiles.includes(file) &&
      !/\.iml$/.test(file)
  );

  if (conflicts.length > 0) {
    if (isCurrentDir) {
      console.log(
        `The current directory ${green(name)} contains files that could conflict:`
      );
    } else {
      console.log(
        `The directory ${green(name)} contains files that could conflict:`
      );
    }
    console.log();
    
    for (const file of conflicts) {
      try {
        const stats = lstatSync(join(root, file));
        if (stats.isDirectory()) {
          console.log(`  ${blue(file)}/`);
        } else {
          console.log(`  ${file}`);
        }
      } catch {
        console.log(`  ${file}`);
      }
    }
    
    console.log();
    if (isCurrentDir) {
      console.log(
        yellow('Warning: ') + 'Installing in current directory with existing files.'
      );
      console.log(
        'Consider backing up important files or using a clean directory.'
      );
    } else {
      console.log(
        'Either try using a new directory name, or remove the files listed above.'
      );
    }
    console.log();
    return false;
  }

  return true;
}