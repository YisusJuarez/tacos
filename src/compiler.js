#!/usr/bin/env node

import path from "path";
import { copyPublicFiles, ensureOutputDir, readTacoFile } from "./fileUtils.js";
import { tagHandlers } from "./tagHandlers.js";
import fs from 'fs-extra';

// Inputs and outputs files
const inputFile = path.join(process.cwd(), "landing.tc");
const outputDir = path.join(process.cwd(), "dist");
const outputFile = path.join(outputDir, "index.html");
const publicDir = path.join(process.cwd(), "public");

// HTML template
let html = '<!DOCTYPE html>\n<html lang="es">\n<head>\n';

const content = readTacoFile(inputFile);
const lines = content.split("\n").map((line) => line.trim());

// Compile the content of the .tc file
const compileLine = (line) => {
  const tagType = Object.keys(tagHandlers).find((tag) => line.startsWith(tag));
  if (!tagType) return "";

  return tagHandlers[tagType](line) + "\n";
};

lines.forEach((line) => {
  html += compileLine(line);
});

// Close HTML
html += "</head>\n<body>\n</body>\n</html>";

// Create output directory
ensureOutputDir(outputDir);

// Write HTML file
fs.writeFileSync(outputFile, html);

// Copy public files
copyPublicFiles(publicDir, outputDir);

console.log("✅ Build generated successfully -> dist/");
