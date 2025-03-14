#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";

// Inputs and outputs files
const inputFile = path.join(process.cwd(), "landing.tc");
const outputDir = path.join(process.cwd(), "dist");
const outputFile = path.join(outputDir, "index.html");
const publicDir = path.join(process.cwd(), "public");

// Copy public directory to output directory
function copyPublicFiles() {
  if (!fs.existsSync(publicDir)) return;
  fs.copySync(publicDir, outputDir);
  console.log("📂 Archivos estáticos copiados.");
}

// Read taco file (.tc)
const content = fs.readFileSync(inputFile, 'utf-8');
const lines = content.split('\n').map(line => line.trim());

// HTML template
let html = '<!DOCTYPE html>\n<html lang="es">\n<head>\n';

let title = '', description = '', url = '';

// Process taco file content
lines.forEach(line => {
  if (line.startsWith('page(')) {
    const meta = line.match(/title: "(.*?)", description: "(.*?)", url: "(.*?)"/);
    if (meta) {
      title = meta[1];
      description = meta[2];
      url = meta[3];
      html += `<title>${title}</title>\n<meta name="description" content="${description}">\n<meta property="og:url" content="${url}">\n`;
    }
  } else if (line.startsWith('h1 ')) {
    html += `<h1>${line.replace('h1 ', '')}</h1>\n`;
  } else if (line.startsWith('p ')) {
    html += `<p>${line.replace('p ', '')}</p>\n`;
  }
});

// Close HTML
html += '</head>\n<body>\n</body>\n</html>';

// Create output directory
fs.ensureDirSync(outputDir);

// Write HTML file
fs.writeFileSync(outputFile, html);

// Copy public files
copyPublicFiles();

console.log("✅ Build generated succesfully-> dist/");