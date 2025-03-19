import { parseElement, parsePageMeta } from "./parseUtils.js";

// Document metadata handlers
export const headTags = {
  // Page configuration
  "page[": parsePageMeta,
  
  // Document head elements
  title: (line) => parseElement(line, "title"),
  meta: (line) => parseElement(line, "meta"),
  link: (line) => parseElement(line, "link"),
  script: (line) => parseElement(line, "script"),
};

// Content element handlers
export const tagHandlers = {
  // Heading elements
  ...Array.from({ length: 6 }, (_, i) => i + 1).reduce((acc, level) => ({
    ...acc,
    [`h${level}`]: (line) => parseElement(line, `h${level}`)
  }), {}),

  // Text elements
  p: (line) => parseElement(line, "p"),
  
  // Container elements
  div: (line) => parseElement(line, "div"),
  span: (line) => parseElement(line, "span"),
};

// Export all handlers as a single object for convenience
export const allHandlers = {
  ...headTags,
  ...tagHandlers
};