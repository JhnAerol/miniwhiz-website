#!/usr/bin/env node
/**
 * MiniWhiz CLI Version Updater
 * 
 * Usage:
 *   node set-version.js <new_version>
 *   e.g. node set-version.js 1.1.2
 * 
 * This updates the version in app.js (the source of truth) as well as
 * the fallback static download links and version badges in index.html,
 * privacy.html, and terms.html.
 */

const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];

if (!newVersion) {
  console.log('\n❌ Error: Please specify a version.');
  console.log('Usage: node set-version.js <new_version>');
  console.log('Example: node set-version.js 1.1.2\n');
  process.exit(1);
}

// Clean version string (strip leading 'v' if user typed 'v1.1.2')
const cleanVersion = newVersion.startsWith('v') ? newVersion.slice(1) : newVersion;

console.log(`\n🚀 Updating MiniWhiz version to: ${cleanVersion}\n`);

// 1. Update app.js
const appJsPath = path.join(__dirname, 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsContent = fs.readFileSync(appJsPath, 'utf8');
  const updatedAppJs = appJsContent.replace(
    /version:\s*['"][^'"]+['"]/,
    `version: '${cleanVersion}'`
  );
  fs.writeFileSync(appJsPath, updatedAppJs, 'utf8');
  console.log('  ✅ Updated app.js (APP_CONFIG.version)');
}

// 2. Update HTML files fallback links & badges
const htmlFiles = ['index.html', 'privacy.html', 'terms.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace github release download URL version tag
    content = content.replace(
      /(releases\/download\/)[^/]+(\/)/g,
      `$1${cleanVersion}$2`
    );

    // Replace (vX.X.X) version badge text
    content = content.replace(
      /\(v\d+\.\d+\.\d+[^)]*\)/g,
      `(v${cleanVersion})`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Updated ${file}`);
  }
});

console.log(`\n✨ Successfully updated all files to v${cleanVersion}!\n`);
