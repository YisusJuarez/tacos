#!/usr/bin/env node

import path from 'path';
import { copyPublicFiles, ensureOutputDir, readTacoFile } from './fileUtils.js';
import { tagHandlers } from './tagHandlers.js';
import fs from 'fs-extra';

// Input and output paths
const inputFile = path.join(process.cwd(), 'landing.tc');
const outputDir = path.join(process.cwd(), 'dist');
const outputFile = path.join(outputDir, 'index.html');
const publicDir = path.join(process.cwd(), 'public');

// Read and compile .tc file
export const compileTCFile = () => {
  let html = HTML_DEFAULT(); // Start with a fresh HTML template

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

  // Close the HTML document
  html += HTML_DEFAULT_END;

  // Ensure the output directory exists
  ensureOutputDir(outputDir);

  // Write the new HTML file (this will overwrite the old file)
  fs.writeFileSync(outputFile, html);

  // Copy static files
  copyPublicFiles(publicDir, outputDir);

  console.log("✅ Build generated successfully -> dist/");
};

// Execute the compilation
compileTCFile();
