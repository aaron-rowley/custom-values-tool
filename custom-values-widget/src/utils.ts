export function normalize(values: any): import('./types').CustomValue[] {
  if (!values) return [];
  if (Array.isArray(values)) return values as import('./types').CustomValue[];
  if (Array.isArray(values?.customValues)) return values.customValues as import('./types').CustomValue[];
  if (values?.data && Array.isArray(values.data)) return values.data as import('./types').CustomValue[];
  return [];
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function getQS(key: string, fallback = ''): string {
  const qs = new URLSearchParams(window.location.search);
  const v = qs.get(key) || fallback;
  try {
    return /%[0-9A-Fa-f]{2}/.test(v) ? decodeURIComponent(v) : v;
  } catch { return v; }
}
