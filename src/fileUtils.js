import fs from "fs-extra";

// Copy public directory to output directory
export function copyPublicFiles(publicDir, outputDir) {
  if (!fs.existsSync(publicDir)) return;
  fs.copySync(publicDir, outputDir);
  console.log("📂 Archivos estáticos copiados.");
}

// Ensure output directory exists
export function ensureOutputDir(outputDir) {
  fs.ensureDirSync(outputDir);
}

// Read taco file (.tc)
export function readTacoFile(inputFile) {
  return fs.readFileSync(inputFile, "utf-8");
}