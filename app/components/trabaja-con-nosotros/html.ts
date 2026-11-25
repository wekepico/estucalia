export const isHtml = (value?: string | null) =>
  !!value && /<\/?[a-z][\s\S]*>/i.test(value);

const ALLOWED_TAGS = new Set([
  "A",
  "STRONG",
  "P",
  "SPAN",
  "BR",
  "H1",
  "H2",
  "H3",
]);
const ALLOWED_ATTRS = new Set([
  "class",
  "href",
  "target",
  "rel",
  "data-internal-link",
]);

// No usa el DOM: se ejecuta igual en el servidor y en el navegador. Reconstruye
// solo las etiquetas y atributos permitidos y escapa cualquier otro "<".
const TAG_RE =
  /<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s"'=<>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*\/?>/g;
const ATTR_RE =
  /([^\s"'=<>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

const escapeText = (value: string) => value.replace(/</g, "&lt;");

// Los navegadores ignoran espacios y entidades dentro del esquema de la URL.
const isSafeHref = (href: string) => {
  const plain = href
    .replace(/&#x([0-9a-f]+);?/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&#(\d+);?/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&(colon|tab|newline);/gi, (_, n) =>
      n.toLowerCase() === "colon" ? ":" : "",
    )
    .replace(/[\u0000- ]/g, "");
  const scheme = plain.match(/^([a-z][a-z0-9+.-]*):/i)?.[1]?.toLowerCase();
  return !scheme || ["http", "https", "mailto", "tel"].includes(scheme);
};

function cleanTag(closing: string, name: string, rawAttrs: string) {
  const tag = name.toUpperCase();
  if (!ALLOWED_TAGS.has(tag)) return "";
  const lower = tag.toLowerCase();
  if (closing) return lower === "br" ? "" : `</${lower}>`;

  const attrs: Record<string, string> = {};
  for (const match of Array.from(rawAttrs.matchAll(ATTR_RE))) {
    const key = match[1].toLowerCase();
    if (!ALLOWED_ATTRS.has(key)) continue;
    let value = match[2] ?? match[3] ?? match[4] ?? "";
    if (key === "href" && !isSafeHref(value)) value = "#";
    attrs[key] = value.replace(/"/g, "&quot;");
  }
  if (lower === "a" && attrs.target === "_blank") {
    attrs.rel = "noopener noreferrer";
  }

  const out = Object.entries(attrs)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");
  return `<${lower}${out}>`;
}

export function sanitizeBasicHtml(input?: string | null) {
  if (!input) return "";

  // si no parece HTML, lo devolvemos tal cual (se renderiza como texto normal)
  if (!isHtml(input)) return input.replace(/</g, "&lt;");

  const source = input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)\b[\s\S]*?<\/\1\s*>/gi, "");

  let result = "";
  let last = 0;
  for (const match of Array.from(source.matchAll(TAG_RE))) {
    result += escapeText(source.slice(last, match.index));
    result += cleanTag(match[1], match[2], match[3] ?? "");
    last = (match.index ?? 0) + match[0].length;
  }
  return result + escapeText(source.slice(last));
}

/**
 * Marca anchors internos para luego convertirlos a <Link>
 */
export function markInternalAnchors(html: string) {
  return html.replace(
    /<a\b(?![^>]*data-internal-link)(?=[^>]*\shref\s*=\s*["']\/(?!\/))/gi,
    '<a data-internal-link="1"',
  );
}
