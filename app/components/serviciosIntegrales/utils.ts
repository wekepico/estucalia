// utils.ts
export const isHtml = (value?: string | null) =>
  !!value && /<\/?[a-z][\s\S]*>/i.test(value);
