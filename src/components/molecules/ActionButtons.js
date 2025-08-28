import React from "react";
import Link from "next/link";

/**
 * ActionButtons Component
 * 
 * Renders a flexible group of action buttons with consistent styling.
 * Useful for CTAs, navigation, and form actions.
 * 
 * @param {Array} buttons - Array of button objects with href, text, className, and optional icon
 * @param {string} className - Additional CSS classes for the container
 */
export default function ActionButtons({
  buttons = [],
  className = "",
}) {
  // TODO: Add proper TypeScript interfaces for better type safety
  
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {buttons.map((btn, idx) => {
        const {className, text, icon, onClick, href} = btn 
        const isInternal = href && href.startsWith("/");

        if(onClick) {
          return (
            <button
            className={className}
            onClick={onClick}
            key={idx}
            type="button"
            >
              <span>{text}</span>
              {/* Optional icon support */}
              {icon && <span className="text-lg ml-2">{icon}</span>}
            </button>
          )
        }

        if (isInternal) {
          return (
            <Link key={idx} href={href} className={className}>
              <span>{text}</span> 
              {/* Optional icon support */}
              {icon && <span className="text-lg ml-2">{icon}</span>}
            </Link>
          );
        }
        return (
          <a
            key={idx}
            href={href}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{text}</span>
            {/* Optional icon support */}
            {icon && <span className="text-lg ml-2">{icon}</span>}
          </a>
        );
      })
      }
    </div>
  );
}