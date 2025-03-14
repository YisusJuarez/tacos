// Parse page metadata (title, description, url)
export function parsePageMeta(line) {
  const meta = line.match(/title: "(.*?)", description: "(.*?)", url: "(.*?)"/);
  if (!meta) return "";

  const [, title, description, url] = meta;
  return `
      <title>${title}</title>
      <meta name="description" content="${description}">
      <meta property="og:url" content="${url}">
    `.trim();
}

// Parse individual elements (h1, p, etc.)
export function parseElement(line, tag) {
  const content = line.replace(`${tag} `, "");
  return `<${tag}>${content}</${tag}>`;
}
