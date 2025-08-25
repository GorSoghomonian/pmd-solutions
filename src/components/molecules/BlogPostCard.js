'use client';

import Image from 'next/image';
import Link from 'next/link';
import ActionButtons from './ActionButtons';

// Универсальная карточка поста блога
export default function BlogPostCard({ post, readMoreLabel = 'Read More' }) {
  if (!post) return null;
  const {
    id,
    href = '#',
    image = '/placeholder-blog.svg', // updated fallback to existing SVG
    title = '',
    excerpt = '',
    category = '',
    date = '',
    readTime = '',
  } = post;

  return (
    <article
      key={id}
      className="bg-white rounded-3xl shadow-[0_6px_16px_rgba(0,0,0,0.06)] ring-1 ring-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
    >
      <Link href={href} className="block">
        <Image
          src={image}
          alt={title || 'Blog post'}
          width={640}
          height={360}
          className="h-56 w-full object-cover"
          unoptimized
        />
      </Link>

      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 text-center py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            {category}
          </span>
          <div className="flex items-center gap-4 text-gray-500 text-xs ml-5 text-center">
            <span className="inline-flex items-center gap-1">
              <i className="ri-calendar-2-line" /> {date}
            </span>
            <span className="inline-flex items-center gap-1">
              <i className="ri-time-line" /> {readTime}
            </span>
          </div>
        </div>

        <h3 className="mt-4 text-xl md:text-2xl font-bold text-gray-900">
          <Link href={href} className="hover:text-[#2A73DD] transition-colors">
            {title}
          </Link>
        </h3>

        <p className="mt-3 text-gray-600 text-sm md:text-base">{excerpt}</p>

        <div className="mt-5">
          <ActionButtons
            buttons={[
              {
                text: `${readMoreLabel} →`,
                href,
                variant: 'link',
                size: 'sm',
                className:
                  'text-[#2A73DD] hover:text-[#1f5ec0] inline-flex items-center gap-1 font-semibold transition-colors ',
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
