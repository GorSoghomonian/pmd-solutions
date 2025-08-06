import React from "react";

export default function ActionButtons({
  buttons = [],
  className = "",
}) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {buttons.map((btn, idx) => (
        <a
          key={idx}
          href={btn.href}
          className={btn.className}
        >
          <span>{btn.text}</span>
          {btn.icon && <span className="text-lg ml-2">{btn.icon}</span>}
        </a>
      ))}
    </div>
  );
}