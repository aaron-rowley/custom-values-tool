const FETCH_URL = 'https://api.visquanta.com/webhook/call-custom-values-data';

export async function fetchCustomValues(locationId: string) {
  const res = await fetch(FETCH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ locationId }),
  });
  const text = await res.text();
  let payload: any = {};
  try { payload = text ? JSON.parse(text) : {}; } catch { payload = { raw: text }; }
  if (!res.ok) throw new Error(`Fetch returned ${res.status}`);
  return payload;
}
