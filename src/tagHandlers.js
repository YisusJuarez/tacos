import { parseElement, parsePageMeta } from "./parseUtils.js";

export const tagHandlers = {
  "page(": parsePageMeta,
  h1: (line) => parseElement(line, "h1"),
  p: (line) => parseElement(line, "p"),
};
