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



// THe working frist one 

// lib/api.js
const BASE_URL = process.env.HUBSPOT_BASE_URL;

async function fetchHubSpotData(type) {
  // const ENDPOINT = `${BASE_URL}/pmdDataTemporary.php?type=${type}`;
  const ENDPOINT = `${BASE_URL}/api/data?type=${type}`;

  console.log(`🌐 [${type}] Trying to fetch from: ${ENDPOINT}`);
  console.log(`🔧 BASE_URL from env: ${BASE_URL}`);
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal
    });

    console.log(`📡 [${type}] Response status: ${res.status}`);

    if (!res.ok) throw new Error(`Failed to fetch ${type}: ${res.status} ${res.statusText}`);

    let raw;
    try {
      raw = await res.json();
      console.log(`✅ [${type}] Server data received:`, raw);
    } catch {
      throw new Error(`Invalid JSON from ${type} endpoint`);
    }

    let items = Array.isArray(raw) ? raw : Array.isArray(raw?.items) ? raw.items : [];
    if (!Array.isArray(items)) items = [];

    console.log(`📊 [${type}] Processed ${items.length} items from server`);

    items = items.map((it, idx) => ({
      id: it.id ?? idx,
      key: it.key ?? it.titleKey ?? undefined,
      title: it.title ?? '',
      description: it.description ?? '',
      icon: it.icon ?? '',
      cardSize: it.cardSize ?? 'sm',
      titleFont: it.titleFont ?? 'sm',
      iconBg: it.iconBg ?? 'bg-blue-600 rounded-full',
      bgColor: it.bgColor ?? '#fff',
      badge: it.badge ?? null,
      badgeColor: it.badgeColor ?? 'bg-blue-50 text-blue-600'
    }));

    return { items, error: null };
  } catch (err) {
    console.error(`❌ [${type}] Server failed, using fallback:`, err.message);
    // Fallback to static data when API fails
    try {
      const { hubspotItems, automationItems, auditItems, industriesItems, servicesItems, whyChooseItems } = await import('../data/homeItems.js');
      const fallbackData = {
        hubspotItems,
        automationItems, 
        auditItems,
        industriesItems,
        servicesItems,
        whyChooseItems
      };
      return { items: fallbackData[type] || [], error: err?.message ?? 'Unknown error' };
    } catch (importErr) {
      console.error(`[fetchHubSpotData] Fallback import failed:`, importErr);
      return { items: [], error: err?.message ?? 'Unknown error' };
    }
  } finally {
    clearTimeout(timeout);
  }
}

// Новая функция, возвращает все типы данных сразу
export async function getAllHubSpotData() {
  const [hubspot, automation, audit, industries, services] = await Promise.all([
    fetchHubSpotData('hubspotItems'),
    fetchHubSpotData('automationItems'), 
    fetchHubSpotData('auditItems'),
    fetchHubSpotData('industriesItems'),
    fetchHubSpotData('servicesItems')
  ]);

  return {
    hubspotItems: hubspot.items,
    automationItems: automation.items,
    auditItems: audit.items,
    industriesItems: industries.items,
    servicesItems: services.items,
    hubspotError: hubspot.error,
    automationError: automation.error,
    auditError: audit.error,
    industriesError: industries.error,
    servicesError: services.error
  };
}

// async function fetchHubSpotData(type) {
//   // ✅ НОВЫЙ endpoint для вашего backend
//   // const ENDPOINT = `${BASE_URL}/api/data?type=${type}`;
//   const ENDPOINT = `${BASE_URL}/api/data?type=${type}`;
//   console.log(`🌐 [${type}] Trying to fetch from: ${ENDPOINT}`);
//   console.log(`🔧 BASE_URL from env: ${BASE_URL}`);
  
//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), 8000);

//   try {
//     const res = await fetch(ENDPOINT, {
//       method: 'GET',
//       headers: { Accept: 'application/json' },
//       cache: 'no-store',
//       signal: controller.signal
//     });

//     console.log(`📡 [${type}] Response status: ${res.status}`);

//     if (!res.ok) throw new Error(`Failed to fetch ${type}: ${res.status} ${res.statusText}`);

//     let raw;
//     try {
//       raw = await res.json();
//       console.log(`✅ [${type}] Server data received:`, raw);
//     } catch {
//       throw new Error(`Invalid JSON from ${type} endpoint`);
//     }

//     // ✅ ОБРАБОТКА данных из вашего backend
//     let items = [];
    
//     // Если данные приходят в формате из вашего backend
//     if (raw && typeof raw === 'object') {
//       // Если это массив - используем его
//       if (Array.isArray(raw)) {
//         items = raw;
//       }
//       // Если это объект с массивом items
//       else if (Array.isArray(raw.items)) {
//         items = raw.items;
//       }
//       // Если это данные из Page модели
//       else if (raw.content && Array.isArray(raw.content)) {
//         items = raw.content;
//       }
//       // Если это объект с данными как свойства
//       else {
//         items = Object.values(raw);
//       }
//     }
    
//     if (!Array.isArray(items)) items = [];

//     console.log(`📊 [${type}] Processed ${items.length} items from server`);

//     items = items.map((it, idx) => ({
//       id: it.id ?? idx,
//       key: it.key ?? it.titleKey ?? undefined,
//       title: it.title ?? '',
//       description: it.description ?? '',
//       icon: it.icon ?? '',
//       cardSize: it.cardSize ?? 'sm',
//       titleFont: it.titleFont ?? 'sm',
//       iconBg: it.iconBg ?? 'bg-blue-600 rounded-full',
//       bgColor: it.bgColor ?? '#fff',
//       badge: it.badge ?? null,
//       badgeColor: it.badgeColor ?? 'bg-blue-50 text-blue-600'
//     }));

//     return { items, error: null };
//   } catch (err) {
//     console.error(`❌ [${type}] Server failed, using fallback:`, err.message);
//     // Fallback to static data when API fails
//     try {
//       const { hubspotItems, automationItems, auditItems, industriesItems, servicesItems, whyChooseItems } = await import('../data/homeItems.js');
//       const fallbackData = {
//         hubspotItems,
//         automationItems, 
//         auditItems,
//         industriesItems,
//         servicesItems,
//         whyChooseItems
//       };
//       return { items: fallbackData[type] || [], error: err?.message ?? 'Unknown error' };
//     } catch (importErr) {
//       console.error(`[fetchHubSpotData] Fallback import failed:`, importErr);
//       return { items: [], error: err?.message ?? 'Unknown error' };
//     }
//   } finally {
//     clearTimeout(timeout);
//   }
// }