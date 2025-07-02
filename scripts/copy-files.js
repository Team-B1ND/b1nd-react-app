const fs = require("fs-extra");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

fs.ensureDirSync(dist);

try {
  
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

  console.log("🎉 Build complete! dist ready for publishing.");
} catch (err) {
  console.error("❌ Build failed:", err);
  process.exit(1);
}
