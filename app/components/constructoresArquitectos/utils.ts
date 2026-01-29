export const isHtml = (s?: string | null) =>
  !!s && /<\/?[a-z][\s\S]*>/i.test(s);

export const splitBullets = (bullets?: string | null): string[] => {
  if (!bullets) return [];
  return bullets
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => x.replace(/^[-•]\s*/, "")); // quita "- " o "• "
};
