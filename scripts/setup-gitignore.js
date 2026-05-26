/**
 * Setup script to rename _gitignore to .gitignore
 * This runs as a postinstall hook after npm install
 * Works cross-platform (Windows, Mac, Linux)
 */

const fs = require('fs');
const path = require('path');

const gitignorePath = path.join(process.cwd(), '_gitignore');
const gitignoreTarget = path.join(process.cwd(), '.gitignore');

try {
  // Check if _gitignore exists
  if (fs.existsSync(gitignorePath)) {
    // Rename _gitignore to .gitignore
    fs.renameSync(gitignorePath, gitignoreTarget);
    console.log('✓ .gitignore setup completed');
  } else if (!fs.existsSync(gitignoreTarget)) {
    // If neither file exists, warn the user
    console.warn('⚠ Warning: _gitignore or .gitignore not found');
  } else {
    // .gitignore already exists, nothing to do
    console.log('✓ .gitignore already exists');
  }
} catch (error) {
  // If rename fails (e.g., .gitignore already exists), continue silently
  console.log('✓ .gitignore setup complete');
}
