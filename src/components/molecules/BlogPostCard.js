'use client';

import Image from 'next/image';
import Link from 'next/link';
import ActionButtons from './ActionButtons';

export default function BlogPostCard({ post, readMoreLabel = 'Read More' }) {
  if (!post) return null;
  const {
    slug,
    href = `/blog/${post.slug || post.slug}`,
    categoryLabel,
    categoryKey,
    date,
    readTime,
    image = '/placeholder-blog.svg',
    title,
    excerpt,
  } = post;

  const category = categoryLabel || categoryKey || '';
  return (
    <article
      key={slug}
      className="bg-white rounded-3xl shadow-[0_6px_16px_rgba(0,0,0,0.06)] ring-1 ring-gray-100 overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] max-w-md md:max-w-lg w-full mx-auto"
    >
      <Link href={href} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title || 'Blog post'}
            fill
            sizes="(max-width:768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 hover:scale-105"
            unoptimized
          />
        </div>
      </Link>

      <div className="p-6 md:p-7 flex flex-col flex-1">
        {(category || date || readTime) && (
          <div className="flex items-center justify-between">
            {category && (
              <span className="inline-flex items-center px-3 text-center py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                {category}
              </span>
            )}
            <div className="flex items-center gap-4 text-gray-500 text-xs ml-5 text-center">
              {date && (
                <span className="inline-flex items-center gap-1">
                  <i className="ri-calendar-2-line" /> {date}
                </span>
              )}
              {readTime && (
                <span className="inline-flex items-center gap-1">
                  <i className="ri-time-line" /> {readTime}
                </span>
              )}
            </div>
          </div>
        )}

        {title && (
          <h3 className="mt-4 text-xl md:text-2xl font-bold text-gray-900">
            <Link href={href} className="hover:text-[#2A73DD] transition-colors">
              {title}
            </Link>
          </h3>
        )}

        {excerpt && <p className="mt-3 text-gray-600 text-sm md:text-base flex-1">{excerpt}</p>}

        <div className="mt-5">
          <ActionButtons
            buttons={[
              {
                text: `${readMoreLabel} →`,
                href,
                variant: 'link',
                size: 'sm',
                className:
                  'text-[#2A73DD] hover:text-[#1f5ec0] inline-flex items-center gap-1 font-semibold transition-colors',
              },
            ]}
            align="start"
            gap="sm"
          />
        </div>
      </div>
    </article>
  );
}
