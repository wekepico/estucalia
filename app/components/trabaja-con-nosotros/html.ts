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

export function sanitizeBasicHtml(input?: string | null) {
  if (!input) return "";

  // si no parece HTML, lo devolvemos tal cual (se renderiza como texto normal)
  if (!isHtml(input)) return input;

  const doc = document.implementation.createHTMLDocument("");
  const container = doc.createElement("div");
  container.innerHTML = input;

  const walk = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tag = el.tagName.toUpperCase();

      // si tag no permitido -> lo desempaquetamos
      if (!ALLOWED_TAGS.has(tag)) {
        const parent = el.parentNode;
        if (!parent) return;
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
        return;
      }

      // limpia atributos peligrosos
      const attrs = [...el.attributes];
      for (const attr of attrs) {
        const name = attr.name.toLowerCase();
        const value = attr.value ?? "";

        // bloquea eventos/attrs no permitidos
        if (!ALLOWED_ATTRS.has(name)) {
          el.removeAttribute(attr.name);
          continue;
        }

        // href seguro
        if (tag === "A" && name === "href") {
          const href = value.trim();
          if (/^javascript:/i.test(href)) el.setAttribute("href", "#");
        }
      }

      // rel seguro cuando target=_blank
      if (tag === "A") {
        const target = el.getAttribute("target");
        if (target === "_blank") {
          el.setAttribute("rel", "noopener noreferrer");
        }
      }
    }

    [...node.childNodes].forEach(walk);
  };

  walk(container);
  return container.innerHTML;
}

/**
 * Marca anchors internos para luego convertirlos a <Link>
 */
export function markInternalAnchors(html: string) {
  const doc = document.implementation.createHTMLDocument("");
  const container = doc.createElement("div");
  container.innerHTML = html;

  const anchors = container.querySelectorAll("a[href]");
  anchors.forEach((a) => {
    const href = a.getAttribute("href") || "";
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) a.setAttribute("data-internal-link", "1");
  });

  return container.innerHTML;
}
