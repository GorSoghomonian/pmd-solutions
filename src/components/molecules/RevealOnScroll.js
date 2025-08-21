'use client';
import { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({
  children,
  threshold = 0.25,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  className = '',
}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current || (revealed && once)) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) obs.disconnect();
        }
      },
      { threshold, root: null, rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [revealed, once, threshold, rootMargin]);

  return (
    <div ref={ref} data-revealed={revealed} className={`reveal-scope ${className}`}>
      {children}
    </div>
  );
}