'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMessages } from 'next-intl';
import { useEffect, useState } from 'react';
import ActionButtons from '../../../components/molecules/ActionButtons';
import BlogPostCard from '../../../components/molecules/BlogPostCard';
import { getBlogData } from '../../../lib/api';

export default function BlogSection({ locale = 'en' } = {}) {
  const messages = useMessages();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback данные из messages
  const rawBlog = messages?.blog;
  const blogObj = (rawBlog && typeof rawBlog === 'object' && !Array.isArray(rawBlog) ? rawBlog : messages?.home?.blog) || {};
  const latest = blogObj?.latest || {};

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const result = await getBlogData(locale, { limit: 3 });
        
        if (result.items && result.items.length > 0) {
          setBlogPosts(result.items);
        } else {
          // Fallback к данным из messages
          const fallbackPosts = Array.isArray(latest.items) ? latest.items.slice(0, 3) : [];
          setBlogPosts(fallbackPosts);
        }
        
        if (result.error) {
          setError(result.error);
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
        // Используем fallback данные
        const fallbackPosts = Array.isArray(latest.items) ? latest.items.slice(0, 3) : [];
        setBlogPosts(fallbackPosts);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [locale]);

  const titlePrefix = latest.titlePrefix || blogObj.titlePrefix || 'Latest from Our';
  const titleAccent = latest.titleAccent || blogObj.titleAccent || 'Blog';
  const subtitle = latest.subtitle || blogObj.subtitle || 'Expert insights and practical guides';
  const ctaHref = latest.ctaHref || blogObj.ctaHref || '/blog';
  const ctaLabel = latest.ctaLabel || blogObj.ctaLabel || 'Visit Our Blog';
  const readMoreLabel = latest.readMore || blogObj.readMore || 'Read More';

  if (loading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 bg-slate-50 `}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {titlePrefix} <span className="text-[#2A73DD]">{titleAccent}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          {error && (
            <p className="mt-2 text-sm text-orange-600">
              Using cached content (API: {error})
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id || post.slug} post={post} readMoreLabel={readMoreLabel} />
          ))}
          {blogPosts.length === 0 && (
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