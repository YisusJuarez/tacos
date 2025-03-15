#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { copyPublicFiles, ensureOutputDir, readTacoFile } from "./fileUtils.js";
import { headTags, tagHandlers } from "./tagHandlers.js";
import { HTML_DEFAULT, HTML_DEFAULT_END, HTML_HEAD_END, HTML_BODY, HTML_BODY_END, modes } from "./constants.js";

// Input and output paths
const inputFile = path.join(process.cwd(), "landing.taco");
const outputDir = path.join(process.cwd(), "dist");
const outputFile = path.join(outputDir, "index.html");
const publicDir = path.join(process.cwd(), "public");

// Read and compile .taco file
export const compileTCFile = (mode = modes.PRODUCTION) => {
  console.log("🌮 Compiling .taco file...");
  console.log(`📄 Input file: ${inputFile}`);
  
  let html = HTML_DEFAULT; // Start with a fresh HTML template
  let inHead = true; // Flag to check if we are still in the head section

  const content = readTacoFile(inputFile);
  const lines = content.split("\n").map((line) => line.trim());

  // Compile the content of the .taco file
  const compileLine = (line) => {
    if (inHead) {
      const isHeaderTag = Object.keys(headTags).find((tag) =>
        line.startsWith(tag)
      );
      if (isHeaderTag) {
        return headTags[isHeaderTag](line) + "\n";
      } else {
        // No more head tags, close head and open body
        inHead = false;
        return HTML_HEAD_END + HTML_BODY + compileLine(line);
      }
    }

    const tagType = Object.keys(tagHandlers).find((tag) =>
      line.startsWith(tag)
    );
    if (!tagType) return "";

    return tagHandlers[tagType](line) + "\n";
  };

  lines.forEach((line) => {
    html += compileLine(line);
  });

  // Close the HTML document
  html += HTML_BODY_END + HTML_DEFAULT_END;

  if (mode === modes.PRODUCTION) {
    console.log("🚀 Generating production build...");
    console.log(`📦 Output directory: ${outputDir}`);
    // Ensure the output directory exists
    ensureOutputDir(outputDir);
    // Write the new HTML file (this will overwrite the old file)
    fs.writeFileSync(outputFile, html);
    // Copy static files
    copyPublicFiles(publicDir, outputDir);
  }

  console.log("🎉 Compilation complete!");

  return html;
};
