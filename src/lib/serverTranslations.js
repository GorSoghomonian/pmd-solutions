import { getTranslations } from 'next-intl/server';

/**
 * Утилита для получения переводов в серверных компонентах
 * Возвращает объект с переводами для удобного использования
 */
export async function getServerTranslations(namespace = 'home', keys = []) {
  const t = await getTranslations(namespace);
  
  const translations = {};
  
  for (const key of keys) {
    try {
      translations[key] = t(key);
    } catch (error) {
      console.warn(`Translation not found for key: ${namespace}.${key}`);
      translations[key] = key; // fallback to key name
    }
  }
  
  return { t, translations };
}

/**
 * Утилита для безопасного получения перевода с fallback
 */
export async function safeServerTranslation(namespace, key, fallback = '') {
  try {
    const t = await getTranslations(namespace);
    return t(key, { default: fallback });
  } catch (error) {
    console.warn(`Translation failed for ${namespace}.${key}:`, error);
    return fallback;
  }
}
