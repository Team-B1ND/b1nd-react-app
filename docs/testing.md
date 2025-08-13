# How to Test (Run with Local Package)

Use the following steps to package `b1nd-react-app` locally and run it from the `test` workspace.

## Prerequisites
- Node.js 18.18.0 or higher
- pnpm installed
- Your project root is this repository (`b1nd-react-app`)

## 1) Build and pack
From the repo root, build and create a tarball:

```bash
pnpm build && pnpm pack
```

This will generate a tarball `b1nd-react-app-<version>.tgz` in the root. Example: `b1nd-react-app-1.3.0.tgz`.

## 2) Prepare the test workspace
Go to the `test` directory, initialize, and add the tarball you just created:

```bash
cd test
pnpm init -y
pnpm add ../b1nd-react-app-1.3.0.tgz  # adjust the filename to your version
```

If `test/package.json` already references the tarball, you can simply run:

```bash
pnpm install
```

## 3) Run the CLI to scaffold a project
Run the CLI. Replace `myapp` with your desired app name:

```bash
npx b1nd-react-app myapp
```

Follow the prompts to choose bundler/language/package manager. The template files will be copied and dependencies will be installed.

## 4) After creation (once installation completes)
Change into the generated directory and start the dev server. Example (adjust to your selected package manager):

```bash
cd myapp
npm install        # or yarn / pnpm / bun
npm run dev        # or yarn dev / pnpm dev / bun dev
```

## Troubleshooting
- ENOSPC (No space left on device):
  - Example message: `ENOSPC: no space left on device`
  - Action: Free up disk space and rerun dependency installation inside the generated `myapp` directory.
  - Note: If installation failed after templates were copied, the `myapp` folder likely already exists. After freeing space, run `cd myapp && <your package manager> install` again.

- Tarball filename mismatch:
  - The tarball name depends on the package version. Verify the actual filename produced by `pnpm pack` and reference it accurately in `pnpm add ../b1nd-react-app-<version>.tgz`.

- Node version:
  - This package requires Node.js 18.18.0 or higher. Check with `node -v` and upgrade if needed.