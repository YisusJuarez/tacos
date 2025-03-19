export function parsePageMeta(tacoLine) {
  const metaMatch = tacoLine.match(
    /title: "(.*?)", description: "(.*?)", url: "(.*?)"/
  );
  if (!metaMatch) return "";

  const [, pageTitle, pageDescription, pageUrl] = metaMatch;
  return `
      <title>${pageTitle}</title>
      <meta name="description" content="${pageDescription}">
      <meta property="og:url" content="${pageUrl}">
    `.trim();
}

export function parseElement(tacoLine, htmlTag) {
  const attributeMatch = tacoLine.match(/\[(.*?)\]/);
  if (!attributeMatch) return `<${htmlTag}>${tacoLine}</${htmlTag}>`;

  const [, attributeString] = attributeMatch;

  const elementContent = tacoLine.replace(
    `${htmlTag}[${attributeString}] `,
    ""
  );
  return `<${htmlTag} ${parseHtmlAttributes(
    attributeString
  )}>${elementContent}</${htmlTag}>`;
}

const parseHtmlAttributes = (attributeString) => {
  const attributesList = attributeString.split(",");
  let htmlAttributes = "";

  attributesList.forEach((attribute) => {
    const [attributeName, attributeValue] = attribute.split("=");
    htmlAttributes += `${attributeName}=${attributeValue}`;
  });

  return htmlAttributes;
};
