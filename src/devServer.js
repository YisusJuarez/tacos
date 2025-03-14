import express from 'express';
import path from 'path';
import chokidar from 'chokidar';
import browserSync from 'browser-sync';
import { compileTCFile } from './compiler.js';

// Start Express server
const app = express();
const port = 3000;

// Directories
const outputDir = path.join(process.cwd(), 'dist');
const publicDir = path.join(process.cwd(), 'public');
const inputFile = path.join(process.cwd(), 'landing.tc');

// Start BrowserSync for live reload
const bs = browserSync.create();

// Configure BrowserSync
bs.init({
  server: {
    baseDir: outputDir,
  },
  files: [`${outputDir}/**/*.html`, `${outputDir}/**/*.css`, `${outputDir}/**/*.js`],
  port: 3000,
});

// Read and compile the .tc file
compileTCFile();

// Watch for changes in .tc file and public folder (ignoring dist)
const watcher = chokidar.watch([inputFile, publicDir], {
  persistent: true,
  ignoreInitial: true,
  ignored: `${outputDir}/**`,  // Ignore the dist folder
});

// When there are changes in the .tc file or public folder, recompile
watcher.on('change', (path) => {
  console.log(`File changed: ${path}`);
  compileTCFile();
  bs.reload();
});

// Start the server
app.listen(port, () => {
  console.log(`Development server running at http://localhost:${port}`);
});
