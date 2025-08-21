import React from 'react';

export default function IconInfoCard({
  icon,
  title,
  description,
  iconBg = 'bg-blue-50',
  iconColor = 'text-blue-600',
  className = '',
  size = 'md', // md | lg
  animate = true,
  delay = 0,
}) {
  const paddings = size === 'lg' ? 'p-8 md:p-10' : 'p-6 md:p-8';

  return (
    <div
      className={`h-full rounded-2xl bg-white shadow-md ring-1 ring-slate-100 hover:shadow-lg transition-shadow ${paddings} ${animate ? 'opacity-0 animate-fade-in-up' : ''} ${className}`}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div className="flex flex-col items-center text-center ">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg} ${iconColor}`}
          aria-hidden="true"
        >
          {icon}
        </div>

        <h3 className="mt-5 text-lg md:text-xl font-semibold text-slate-900">
          {title}
        </h3>

        {description ? (
          <p className="mt-3 text-slate-500 leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}