const fs = require("fs-extra");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");


fs.ensureDirSync(dist);

try {
  
  if (fs.existsSync(path.join(root, "README.md"))) {
    fs.copySync(path.join(root, "README.md"), path.join(dist, "README.md"));
    console.log("✅ Copied README.md");
  }

  
  const templatesPath = path.join(root, "templates");
  const distTemplatesPath = path.join(dist, "templates");

  if (fs.existsSync(templatesPath)) {
    fs.copySync(templatesPath, distTemplatesPath);
    console.log("✅ Copied templates/");
  }

  
  const removeTargets = ["index.ts", "types.ts"];
  for (const file of removeTargets) {
    const filePath = path.join(distTemplatesPath, file);
    if (fs.existsSync(filePath)) {
      fs.removeSync(filePath);
      console.log(`🗑️ Removed templates/${file}`);
    }
  }

  const packageJson = fs.readJsonSync(path.join(root, "package.json"));
  const publishPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    keywords: packageJson.keywords,
    author: packageJson.author,
    license: packageJson.license,
    repository: packageJson.repository,
    homepage: packageJson.homepage,
    bin: {
      "b1nd-react-app": "./index.js"
    },
    engines: packageJson.engines,
    dependencies: packageJson.dependencies || {}
  };
  fs.writeJsonSync(path.join(dist, "package.json"), publishPackageJson, { spaces: 2 });
  console.log("✅ Created publish package.json");

  console.log("🎉 Build complete! dist ready for publishing.");
} catch (err) {
  console.error("❌ Build failed:", err);
  process.exit(1);
}
