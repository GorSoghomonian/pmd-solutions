"use client";

import { useTranslations, useMessages, useLocale } from 'next-intl';
import { useMemo, useState, useEffect } from 'react';
import BlogPostCard from '../../../components/molecules/BlogPostCard';
import ActionButtons from '../../../components/molecules/ActionButtons';
import { getBlogData } from '../../../lib/api';

export default function CategoryArticle({ locale, blogData }) {
  const t = useTranslations('home.blog');
  const currentLocale = useLocale();
  
  const [selectedCat, setSelectedCat] = useState('all');
  const [apiPosts, setApiPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fallback данные из translations
  const categories = t.raw('categories') || [];
  const fallbackItems = t.raw('latest.items') || [];

  // Используем данные из API если есть, иначе fallback
  const items = blogData?.items?.length ? blogData.items : fallbackItems;

  // Фильтрация постов
  const filtered = useMemo(() => {
    if (selectedCat === 'all') return items;
    return items.filter((item) => item.categoryKey === selectedCat);
  }, [selectedCat, items]);

  // Загружаем отфильтрованные посты при смене категории
  useEffect(() => {
    if (selectedCat !== 'all') {
      const fetchFilteredPosts = async () => {
        setLoading(true);
        try {
          const result = await getBlogData(locale, { category: selectedCat });
          if (result.items?.length) {
            setApiPosts(result.items);
          }
        } catch (err) {
          console.error('Error fetching filtered posts:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchFilteredPosts();
    } else {
      setApiPosts([]);
    }
  }, [selectedCat, locale]);

  // Используем API посты если доступны и фильтр активен
  const displayPosts = (selectedCat !== 'all' && apiPosts.length) ? apiPosts : filtered;

  const posts = displayPosts.map((item) => ({
    id: item.slug || item.id,
    slug: item.slug || `blog-${item.id}`,
    href: item.href || `/${locale || currentLocale}/blog/${item.slug || `blog-${item.id}`}`,
    image: item.image || '/placeholder-blog.svg',
    category: item.categoryLabel || item.categoryKey,
    date: item.date || '',
    readTime: item.readTime || item.read || '',
    title: item.title || '',
    excerpt: item.excerpt || item.description || '',
    locale: locale || currentLocale,
  }));

  const readMoreLabel = t('latest.readMore', { default: 'Read More' });

  return (
    <section className="py-20">
      <div>
        <div className='pb-8 bg-gradient-to-br from-blue-50 to-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out'>
          <div className='max-w-7xl mx-auto px-6'> 
            <div className='text-center mb-10 pt-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4 transition-all duration-1000 opacity-100 translate-y-0'>
                {t('browse.title')}
              </h2>
              <p className='text-lg text-gray-600 transition-all duration-1000 delay-300 opacity-100 translate-y-0'>
                {t('browse.subtitle')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pb-8">
              {categories.map((c) => {
                const active = c.key === selectedCat;
                return (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCat(c.key)}
                    className={
                      'group flex items-center space-x-3 px-6 py-3 rounded-full  transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer bg-[#2A73DD]  shadow-lg opacity-100 translate-y-0 ' +
                      (active
                        ? 'bg-[#002A93] text-white shadow-[0_6px_16px_rgba(0,42,147,0.35)]'
                        : 'bg-white  text-black hover:text-blue-500 hover:bg-blue-50 border border-gray-200')
                    }
                        >
                    <span
                      className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors duration-300  ${
                        active ? 'bg-blue-400 text-white' : 'bg-gray-100 text-black group-hover:text-blue-500 group-hover:bg-blue-100'
                      }`}
                    >
                      <i className={`${c.iconClass} text-lg`} />
                    </span>
                    {c.label}
                    <span className={`ml-2 w-7 h-7 text-sm rounded-full flex items-center justify-center transition-colors duration-300 ${
                      active ? 'bg-blue-400 text-white' : 'bg-gray-100 text-black group-hover:text-blue-500 group-hover:bg-blue-100'
                      }`}
                    >
                      {c.count}
                    </span>
                  </button>
                );       
              })}
            </div>
          </div>
        </div>
        <div>
          <div className='text-center mb-10 pt-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4 transition-all duration-1000 opacity-100 translate-y-0'>
                {t('latest.title', { default: 'Latest Articles' })}
              </h2>
              <p className='text-lg text-gray-600 transition-all duration-1000 delay-300 opacity-100 translate-y-0'>
                {t('latest.countLabel', { default: 'Discover our latest insights' })}
              </p>
            </div>
          {/* Посты */}
          {loading ? (
            <div className="text-center py-12 max-w-7xl mx-auto px-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2A73DD]"></div>
              <p className="mt-2 text-gray-600">Loading posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
              {posts.map((p) => (
                <BlogPostCard key={p.id} post={p} readMoreLabel={readMoreLabel} />
              ))}
              {posts.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-12">
                  No articles found for this category.
                </div>
              )}
            </div>
          )}
          <div className='flex justify-center items-center mt-12'>
            <ActionButtons
                        buttons={[
                          {
                            text: t('latest.loadMore', { default: 'Load More' }),
                            href: '',
                            variant: 'primary',
                            size: 'lg',
                            className:
                            'group px-8 py-4 border-2 border-blue text-blue-600 rounded-full  text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer',
                          },
                        ]}
                        align="center"
                        gap="md"
                      />
          </div>
        </div>   
      </div>
    </section>
  );
}