import express from 'express';
import path from 'path';
import chokidar from 'chokidar';
import browserSync from 'browser-sync';
import { modes } from '../constants';
import { compileTCFile } from '../compiler.js';

// Start Express server
const app = express();
const port = 3000;

// Directories
const publicDir = path.join(process.cwd(), 'public');
const inputFile = path.join(process.cwd(), 'landing.tc');

// Start BrowserSync for live reload
const bs = browserSync.create();

// Serve HTML dynamically instead of using files from `dist`
app.get('/', (req, res) => {
  // Generate HTML dynamically each time the page is requested
  const htmlContent = compileTCFile(modes.DEVELOPMENT); // Compile TC file dynamically
  res.send(htmlContent); // Serve the generated HTML content
});

// Start BrowserSync
bs.init({
  proxy: 'http://localhost:3000', // Proxy Express server
  files: [`${publicDir}/**/*.*`], // Watch files in the public folder for changes
  port: 3000,
});

// Watch for changes in .tc file and public folder
const watcher = chokidar.watch([inputFile, publicDir], {
  persistent: true,
  ignoreInitial: true,
  ignored: path.join(process.cwd(), 'dist'), // Ignore the dist folder
});

// When there are changes, recompile and reload
watcher.on('change', (path) => {
  console.log(`File changed: ${path}`);
  bs.reload(); // Trigger reload after recompiling the TC file
});

// Start the Express server
app.listen(port, () => {
  console.log(`Development server running at http://localhost:${port}`);
});
