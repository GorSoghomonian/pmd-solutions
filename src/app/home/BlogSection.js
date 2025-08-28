'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMessages } from 'next-intl';
import ActionButtons from '../../components/molecules/ActionButtons';
import BlogPostCard from '../../components/molecules/BlogPostCard';

export default function BlogSection({} = {}) {
  const messages = useMessages();


  const rawBlog = messages?.blog;
  const blogObj =
    (rawBlog && typeof rawBlog === 'object' && !Array.isArray(rawBlog) ? rawBlog : messages?.home?.blog) || {};

  const latest = blogObj?.latest || {};
  const categories = Array.isArray(blogObj?.categories) ? blogObj.categories : [];

  const categoriesMap = new Map(
    categories.map((c) => [c.key, c.label || c.name || c.title || c.key])
  );

  const titlePrefix = latest.titlePrefix || blogObj.titlePrefix || 'Latest from Our';
  const titleAccent = latest.titleAccent || blogObj.titleAccent || 'Blog';
  const subtitle =
    latest.subtitle || blogObj.subtitle ||
    'Expert insights, practical guides, and industry trends to help you stay ahead in business automation and digital transformation';

  const ctaHref = latest.ctaHref || blogObj.ctaHref || '/blog';
  const ctaLabel = latest.ctaLabel || blogObj.ctaLabel || 'Visit Our Blog';
  const readMoreLabel = latest.readMore || blogObj.readMore || 'Read More';

  
  const posts = Array.isArray(latest.items)
    ? latest.items.map((item) => {
        const slug = item.slug || item.id || '';
        const categoryKey = item.categoryKey || item.category || '';
        return {
          id: slug,
          href: item.href || `/blog/${slug}`,
          image: item.image || '/placeholder-blog.jpg',
          category: categoriesMap.get(categoryKey) || item.categoryLabel || categoryKey || '',
          date: item.date || '',
          readTime: item.readTime || item.read || '',
          title: item.title || '',
          excerpt: item.excerpt || item.description || '',
        };
      })
    : [];

  const firstThree = posts.slice(0, 3);

  return (
    <section className={`py-20 bg-slate-50 `}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {titlePrefix} <span className="text-[#2A73DD]">{titleAccent}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {firstThree.map((p) => (
            <BlogPostCard key={p.id} post={p} readMoreLabel={readMoreLabel} />
          ))}
          {firstThree.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No articles available.</div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <ActionButtons
            buttons={[
              {
                text: `${ctaLabel} →`,
                href: ctaHref,
                variant: 'primary',
                size: 'lg',
                className:
                  'bg-[#2A73DD] hover:bg-[#1f5ec0] text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl text-lg md:text-xl font-semibold transition-all duration-200 ease-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A73DD]/40',
              },
            ]}
            align="center"
            gap="md"
          />
        </div>
      </div>
    </section>
  );
}