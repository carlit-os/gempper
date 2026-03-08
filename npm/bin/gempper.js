#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const home = os.homedir();
const skillDir = path.join(home, '.gemini', 'skills', 'gempper');
const gempperDir = path.join(home, 'gempper');
const pkgDir = path.join(__dirname, '..');

// Handle --uninstall
if (process.argv.includes('--uninstall')) {
  let removed = false;
  if (fs.existsSync(skillDir)) {
    fs.rmSync(skillDir, { recursive: true });
    console.log('  Removed skill from', skillDir);
    removed = true;
  }
  if (fs.existsSync(gempperDir)) {
    fs.rmSync(gempperDir, { recursive: true });
    console.log('  Removed files from', gempperDir);
    removed = true;
  }
  if (removed) {
    console.log('\n  Gempper uninstalled.');
  } else {
    console.log('  Nothing to uninstall.');
  }
  process.exit(0);
}

console.log('\n  Gempper Setup\n');

// 1. Install Gemini CLI skill
try {
  fs.mkdirSync(skillDir, { recursive: true });
  fs.copyFileSync(
    path.join(pkgDir, 'skill', 'SKILL.md'),
    path.join(skillDir, 'SKILL.md')
  );
  console.log('  [1/3] Skill installed -> ~/.gemini/skills/gempper/');
} catch (err) {
  console.error('  Failed to install skill:', err.message);
  process.exit(1);
}

// 2. Copy .fap files
try {
  fs.mkdirSync(gempperDir, { recursive: true });
  const fapSrc = path.join(pkgDir, 'faps');
  for (const f of fs.readdirSync(fapSrc)) {
    fs.copyFileSync(path.join(fapSrc, f), path.join(gempperDir, f));
  }
  console.log('  [2/3] Flipper apps  -> ~/gempper/');
} catch (err) {
  console.error('  Failed to copy .fap files:', err.message);
  process.exit(1);
}

// 3. Copy macro presets
try {
  const macroDir = path.join(gempperDir, 'macros');
  fs.mkdirSync(macroDir, { recursive: true });
  const macroSrc = path.join(pkgDir, 'macros');
  for (const f of fs.readdirSync(macroSrc)) {
    fs.copyFileSync(path.join(macroSrc, f), path.join(macroDir, f));
  }
  console.log('  [3/3] Macro presets -> ~/gempper/macros/');
} catch (err) {
  console.error('  Failed to copy macros:', err.message);
  process.exit(1);
}

console.log('\n  Done! Next steps:\n');
console.log('  Gemini CLI:');
console.log('    The Gempper skill auto-activates when Gemini detects remote control use.\n');
console.log('  Flipper Zero:');
console.log('    Copy the .fap file to your Flipper SD card:');
console.log('    - BLE (Momentum/Unleashed): ~/gempper/gemini_remote_ble.fap');
console.log('      -> SD/apps/Bluetooth/');
console.log('    - USB (stock firmware):     ~/gempper/gemini_remote_usb.fap');
console.log('      -> SD/apps/Tools/\n');
console.log('  Macros (optional):');
console.log('    Copy a macro preset to your Flipper SD card:');
console.log('    ~/gempper/macros/default.txt -> SD/apps_data/gemini_remote_ble/macros.txt\n');
console.log('  Uninstall:');
console.log('    npx gempper --uninstall\n');
