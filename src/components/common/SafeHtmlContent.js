"use client";
import { useEffect, useRef } from 'react';

export default function SafeHtmlContent({ html, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const links = ref.current.querySelectorAll('a[href]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
        link.classList.add('prose-a:text-[#2A73DD]', 'prose-a:no-underline', 'hover:prose-a:underline');
      });
    }
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
