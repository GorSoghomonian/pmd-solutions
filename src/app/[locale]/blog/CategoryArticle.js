"use client";

import { useTranslations, useMessages } from 'next-intl';
import { useMemo, useState } from 'react';
import BlogPostCard from '../../../components/molecules/BlogPostCard';
import ActionButtons from '../../../components/molecules/ActionButtons';

export default function CategoryArticle() {
  const tHome = useTranslations('home');
  const messages = useMessages();

  const rootBlog = messages?.blog && typeof messages.blog === 'object' ? messages.blog : null;
  const homeBlog = tHome.raw('blog');
  const blog = rootBlog || homeBlog || {};

  const categories = Array.isArray(blog.categories) ? blog.categories : [];
  const latest = blog.latest || {};
  const items = Array.isArray(latest.items) ? latest.items : [];

  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = useMemo(() => {
    if (selectedCat === 'all') return items;
    return items.filter((item) => item.categoryKey === selectedCat);
  }, [selectedCat, items]);

  const posts = filtered.map((item) => ({
    id: item.slug || item.id,
    href: item.href || `/blog/${item.slug}`,
    image: item.image || '/placeholder-blog.jpg',
    category: item.categoryLabel || item.categoryKey,
    date: item.date || '',
    readTime: item.readTime || item.read || '',
    title: item.title || '',
    excerpt: item.excerpt || item.description || '',
  }));

  const readMoreLabel = latest.readMore || blog.readMore || 'Read More';

  return (
    <section className="py-20">
      <div>
        <div className='pb-8 bg-gradient-to-br from-blue-50 to-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out'>
          <div className='max-w-7xl mx-auto px-6'> 
            <div className='text-center mb-10 pt-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4 transition-all duration-1000 opacity-100 translate-y-0'>
                {tHome('blog.browse.title')}
              </h2>
              <p className='text-lg text-gray-600 transition-all duration-1000 delay-300 opacity-100 translate-y-0'>
                {tHome('blog.browse.subtitle')}
              </p>
            </div>
            <div className="flex  flex-wrap justify-center gap-4 pb-12">
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
                {tHome('blog.latest.title')}
              </h2>
              <p className='text-lg text-gray-600 transition-all duration-1000 delay-300 opacity-100 translate-y-0'>
                {tHome('blog.latest.countLabel')}
              </p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
            {posts.map((p) => (
              <BlogPostCard key={p.id} post={p} readMoreLabel={readMoreLabel} />
            ))}
            {posts.length === 0 && (
              <div className="col-span-full text-center text-gray-500">No articles available.</div>
            )}
          </div>
          <div className='flex justify-center items-center mt-12'>
            <ActionButtons
                        buttons={[
                          {
                            text: `${latest.loadMore}`,
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