// // lib/api.js
// const ENDPOINT = `${process.env.HUBSPOT_BASE_URL}/pmdDataTemporary.php?type=hubspotItems`;

// // Server-side fetch with timeout, error handling, and normalization
// export async function getHubSpotItems() {
//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), 8000);

//   try {
//     const res = await fetch(ENDPOINT, {
//       method: 'GET',
//       headers: { Accept: 'application/json' },
//       cache: 'no-store',
//       signal: controller.signal
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch hubspot items: ${res.status} ${res.statusText}`);
//     }
//     // If API returns non-JSON occasionally, guard it
//     let raw;
//     try {
//       raw = await res.json();
//     } catch {
//       throw new Error('Invalid JSON from hubspot items endpoint');
//     }

//     let items = Array.isArray(raw) ? raw : Array.isArray(raw?.items) ? raw.items : [];
//     if (!Array.isArray(items)) items = [];

//     // Normalize minimal shape used by the UI
//     items = items.map((it, idx) => ({
//       id: it.id ?? idx,
//       key: it.key ?? it.titleKey ?? undefined,
//       title: it.title ?? '',
//       description: it.description ?? '',
//       icon: it.icon ?? ''
//     }));

//     return { items, error: null };
//   } catch (err) {
//     console.error('[getHubSpotItems] Error:', err);
//     return { items: [], error: err?.message ?? 'Unknown error' };
//   } finally {
//     clearTimeout(timeout);
//   }
// }





// lib/api.js
const BASE_URL = process.env.HUBSPOT_BASE_URL;

async function fetchHubSpotData(type) {
  const ENDPOINT = `${BASE_URL}/pmdDataTemporary.php?type=${type}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal
    });

    if (!res.ok) throw new Error(`Failed to fetch ${type}: ${res.status} ${res.statusText}`);

    let raw;
    try {
      raw = await res.json();
    } catch {
      throw new Error(`Invalid JSON from ${type} endpoint`);
    }

    let items = Array.isArray(raw) ? raw : Array.isArray(raw?.items) ? raw.items : [];
    if (!Array.isArray(items)) items = [];

    items = items.map((it, idx) => ({
      id: it.id ?? idx,
      key: it.key ?? it.titleKey ?? undefined,
      title: it.title ?? '',
      description: it.description ?? '',
      icon: it.icon ?? ''
    }));

    return { items, error: null };
  } catch (err) {
    console.error(`[fetchHubSpotData] Error for ${type}:`, err);
    return { items: [], error: err?.message ?? 'Unknown error' };
  } finally {
    clearTimeout(timeout);
  }
}

// Новая функция, возвращает оба типа данных сразу
export async function getAllHubSpotData() {
  const [hubspot, automation, audit] = await Promise.all([
    fetchHubSpotData('hubspotItems'),
    fetchHubSpotData('automationItems'),
    fetchHubSpotData('auditItems')
  ]);

  return {
    hubspotItems: hubspot.items,
    automationItems: automation.items,
    auditItems: audit.items,
    hubspotError: hubspot.error,
    automationError: automation.error,
    auditError: audit.error
  };
}
