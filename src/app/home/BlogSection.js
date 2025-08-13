'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMessages } from 'next-intl';
// Скорректируйте путь, если у вас другой
import ActionButtons from '../../components/ui/ActionButtons';

export default function BlogSection({ className = '' } = {}) {
  const messages = useMessages();
  const bm = messages?.home?.blog ?? {};

  const titlePrefix = bm.titlePrefix ?? 'Latest from Our';
  const titleAccent = bm.titleAccent ?? 'Blog';
  const subtitle =
    bm.subtitle ??
    'Expert insights, practical guides, and industry trends to help you stay ahead in business automation and digital transformation';

  // Посты берём только из messages (без локального дефолта)
  const posts = Array.isArray(bm.posts) ? bm.posts : [];

  const ctaHref = bm.ctaHref ?? '/blog';
  const ctaLabel = bm.ctaLabel ?? 'Visit Our Blog';
  const readMoreLabel = bm.readMore ?? 'Read More'; // <— безопасная метка

  return (
    <section className={`py-20 bg-slate-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {titlePrefix} <span className="text-[#2A73DD]">{titleAccent}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-3xl shadow-[0_6px_16px_rgba(0,0,0,0.06)] ring-1 ring-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
            >
              <Link href={p.href} className="block">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={640}
                  height={360}
                  className="h-56 w-full object-cover"
                  unoptimized
                />
              </Link>

              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 text-center py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-4 text-gray-500 text-xs ml-5 text-center">
                    <span className="inline-flex items-center gap-1">
                      <i className="ri-calendar-2-line" /> {p.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <i className="ri-time-line" /> {p.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 text-xl md:text-2xl font-bold text-gray-900">
                  <Link href={p.href} className="hover:text-[#2A73DD] transition-colors">
                    {p.title}
                  </Link>
                </h3>

                <p className="mt-3 text-gray-600 text-sm md:text-base">{p.excerpt}</p>

                <div className="mt-5">
                  <ActionButtons
                    buttons={[
                      {
                        text: `${readMoreLabel} →`,
                        href: p.href,
                        // оставляем "link", но добавляем стили на саму ссылку
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
          ))}
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