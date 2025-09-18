
// lib/api.js
const BASE_URL = process.env.HUBSPOT_BASE_URL;
const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

// Функция для получения блогов
export async function getBlogData(locale = 'en', filters = {}) {
  // Используем CLIENT_BASE_URL для клиентских запросов, BASE_URL для серверных
  const API_BASE = typeof window !== 'undefined' ? CLIENT_BASE_URL : BASE_URL;
  const BLOG_ENDPOINT = `${API_BASE}/api/blogs?lang=${locale}`;
  
  // Добавляем параметры фильтрации
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.limit) params.append('limit', filters.limit);
  if (filters.page) params.append('page', filters.page);
  
  const url = params.toString() ? `${BLOG_ENDPOINT}&${params}` : BLOG_ENDPOINT;
  
  console.log(`🌐 [blogs] Trying to fetch from: ${url}`);
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal
    });

    console.log(`📡 [blogs] Response status: ${res.status}`);

    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);

    let raw;
    try {
      raw = await res.json();
      console.log(`✅ [blogs] Server data received:`, raw);
    } catch {
      throw new Error(`Invalid JSON from blogs endpoint`);
    }

    // Обработка данных из вашей БД
    let items = [];
    let totalCount = 0;
    let currentPage = 1;
    let totalPages = 1;

    // Структура вашей БД: { total, page, pageCount, blogs: [...] }
    if (raw && typeof raw === 'object') {
      items = Array.isArray(raw.blogs) ? raw.blogs : [];
      totalCount = raw.total || items.length;
      currentPage = raw.page || 1;
      totalPages = raw.pageCount || 1;
    } else if (Array.isArray(raw)) {
      items = raw;
      totalCount = items.length;
    }

    // Нормализация данных блога для вашей структуры БД
    items = items.map((blog, idx) => {
      // Получаем контент для нужного языка
      const content = blog.contents?.find(c => c.language?.code === locale) || blog.contents?.[0] || {};
      
      return {
        id: blog.id ?? idx,
        slug: `blog-${blog.id}` ?? `blog-${idx}`,
        title: content.title ?? '',
        subtitle: content.subtitle ?? '',
        excerpt: content.subtitle ?? content.content?.replace(/<[^>]*>/g, '').substring(0, 150) ?? '',
        content: content.content ?? '',
        categoryKey: blog.categoryKey ?? blog.category ?? '',
        categoryLabel: blog.categoryLabel ?? blog.category ?? '',
        date: blog.created_at ?? '',
        readTime: Math.ceil((content.content?.length || 0) / 1000) + ' min read',
        author: blog.author?.name ?? blog.author ?? '',
        authorEmail: blog.author?.email ?? '',
        image: blog.image ? `${API_BASE}${blog.image}` : '/placeholder-blog.svg',
        carouselImages: blog.carousel_images?.map(img => `${API_BASE}${img}`) ?? [],
        tags: blog.tags ?? [],
        href: `/${locale}/blog/blog-${blog.id}`,
        updatedAt: blog.updated_at ?? blog.created_at ?? ''
      };
    });

    console.log(`📊 [blogs] Processed ${items.length} blog items from ${totalCount} total`);

    return { 
      items, 
      error: null,
      totalCount,
      currentPage,
      totalPages
    };

  } catch (err) {
    console.error(`❌ [blogs] API failed, using fallback:`, err.message);
    
    // Fallback к статическим данным из переводов
    try {
      // Только на сервере можем импортировать next-intl
      if (typeof window === 'undefined') {
        const { getTranslations } = await import('next-intl/server');
        const t = await getTranslations({ locale, namespace: 'home' });
        const blogData = t.raw('blog') || {};
        const fallbackItems = blogData?.latest?.items || [];
        
        return { 
          items: fallbackItems, 
          error: err?.message ?? 'Unknown error',
          totalCount: fallbackItems.length,
          currentPage: 1,
          totalPages: 1
        };
      } else {
        // На клиенте просто возвращаем пустой массив
        return { 
          items: [], 
          error: err?.message ?? 'Unknown error',
          totalCount: 0,
          currentPage: 1,
          totalPages: 1
        };
      }
    } catch (importErr) {
      console.error(`[getBlogData] Fallback failed:`, importErr);
      return { 
        items: [], 
        error: err?.message ?? 'Unknown error',
        totalCount: 0,
        currentPage: 1,
        totalPages: 1
      };
    }
  } finally {
    clearTimeout(timeout);
  }
}

// Функция для получения отдельного поста блога
export async function getBlogPost(slug, locale = 'en') {
  console.log(`🌐 [blog-post] Looking for post with slug: ${slug}`);
  
  try {
    // Сначала пытаемся получить данные из общего списка блогов
    const blogData = await getBlogData(locale);
    console.log(`📊 [blog-post] Got ${blogData.items?.length || 0} posts from getBlogData`);
    
    // Ищем пост по slug
    const post = blogData.items.find(item => item.slug === slug);
    
    if (post) {
      console.log(`✅ [blog-post] Found post: ${post.title}`);
      return { post, error: null };
    }
    
    // Если не нашли по slug, пробуем найти по ID
    const blogId = slug.replace('blog-', '');
    const postById = blogData.items.find(item => item.id.toString() === blogId);
    
    if (postById) {
      console.log(`✅ [blog-post] Found post by ID: ${postById.title}`);
      return { post: postById, error: null };
    }
    
    console.log(`❌ [blog-post] Post not found with slug: ${slug}`);
    return { post: null, error: 'Post not found' };
    
  } catch (err) {
    console.error(`❌ [blog-post] Error:`, err.message);
    
    // Fallback к переводам
    try {
      if (typeof window === 'undefined') {
        const { getTranslations } = await import('next-intl/server');
        const t = await getTranslations({ locale, namespace: 'home' });
        const blogData = t.raw('blog') || {};
        const fallbackItems = blogData?.latest?.items || [];
        
        const fallbackPost = fallbackItems.find(item => 
          item.slug === slug || 
          `blog-${item.id}` === slug
        );
        
        if (fallbackPost) {
          return { post: fallbackPost, error: err?.message ?? 'Using fallback data' };
        }
      }
    } catch (importErr) {
      console.error(`[getBlogPost] Fallback failed:`, importErr);
    }
    
    return { post: null, error: err?.message ?? 'Unknown error' };
  }
}

// Функция для создания нового поста блога
export async function createBlogPost(formData) {
  const API_BASE = typeof window !== 'undefined' ? CLIENT_BASE_URL : BASE_URL;
  const CREATE_ENDPOINT = `${API_BASE}/api/blogs`;
  
  console.log(`🌐 [create-blog] Trying to create post at: ${CREATE_ENDPOINT}`);
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // Увеличиваем timeout для загрузки файлов

  try {
    const res = await fetch(CREATE_ENDPOINT, {
      method: 'POST',
      body: formData, // FormData с файлами
      signal: controller.signal
    });

    console.log(`📡 [create-blog] Response status: ${res.status}`);

    if (!res.ok) throw new Error(`Failed to create blog post: ${res.status} ${res.statusText}`);

    const result = await res.json();
    console.log(`✅ [create-blog] Post created successfully:`, result);

    return { post: result, error: null };

  } catch (err) {
    console.error(`❌ [create-blog] Failed to create post:`, err.message);
    return { post: null, error: err?.message ?? 'Unknown error' };
  } finally {
    clearTimeout(timeout);
  }
}

// Функция для обновления поста блога
export async function updateBlogPost(blogId, formData) {
  const API_BASE = typeof window !== 'undefined' ? CLIENT_BASE_URL : BASE_URL;
  const UPDATE_ENDPOINT = `${API_BASE}/api/blogs/${blogId}`;
  
  console.log(`🌐 [update-blog] Trying to update post at: ${UPDATE_ENDPOINT}`);
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(UPDATE_ENDPOINT, {
      method: 'PUT',
      body: formData,
      signal: controller.signal
    });

    console.log(`📡 [update-blog] Response status: ${res.status}`);

    if (!res.ok) throw new Error(`Failed to update blog post: ${res.status} ${res.statusText}`);

    const result = await res.json();
    console.log(`✅ [update-blog] Post updated successfully:`, result);

    return { post: result, error: null };

  } catch (err) {
    console.error(`❌ [update-blog] Failed to update post:`, err.message);
    return { post: null, error: err?.message ?? 'Unknown error' };
  } finally {
    clearTimeout(timeout);
  }
}

// Функция для удаления поста блога
export async function deleteBlogPost(blogId) {
  const API_BASE = typeof window !== 'undefined' ? CLIENT_BASE_URL : BASE_URL;
  const DELETE_ENDPOINT = `${API_BASE}/api/blogs/${blogId}`;
  
  console.log(`🌐 [delete-blog] Trying to delete post at: ${DELETE_ENDPOINT}`);
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(DELETE_ENDPOINT, {
      method: 'DELETE',
      signal: controller.signal
    });

    console.log(`📡 [delete-blog] Response status: ${res.status}`);

    if (!res.ok) throw new Error(`Failed to delete blog post: ${res.status} ${res.statusText}`);

    console.log(`✅ [delete-blog] Post deleted successfully`);

    return { success: true, error: null };

  } catch (err) {
    console.error(`❌ [delete-blog] Failed to delete post:`, err.message);
    return { success: false, error: err?.message ?? 'Unknown error' };
  } finally {
    clearTimeout(timeout);
  }
}