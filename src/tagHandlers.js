import { parseElement, parsePageMeta } from "./parseUtils.js";

export const headTags = {
  title: (line) => parseElement(line, "title"),
  meta: (line) => parseElement(line, "meta"),
  link: (line) => parseElement(line, "link"),
  script: (line) => parseElement(line, "script"),
  "page[": parsePageMeta,
}
export const tagHandlers = {
  h1: (line) => parseElement(line, "h1"),
  h2: (line) => parseElement(line, "h2"),
  h3: (line) => parseElement(line, "h3"),
  h4: (line) => parseElement(line, "h4"),
  h5: (line) => parseElement(line, "h5"),
  h6: (line) => parseElement(line, "h6"),
  p: (line) => parseElement(line, "p"),
  div: (line) => parseElement(line, "div"),
  span: (line) => parseElement(line, "span"),
};
