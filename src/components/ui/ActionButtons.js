import React from "react";

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
  // TODO: Consider adding onClick handlers in addition to href for more flexibility
  // TODO: Add proper button/link semantics (use button for actions, Link for navigation)
  
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {buttons.map((btn, idx) => (
        // NOTE: Using <a> tag for all buttons - consider Link component for internal navigation
        <a
          key={idx}
          href={btn.href}
          className={btn.className}
        >
          <span>{btn.text}</span>
          {/* Optional icon support */}
          {btn.icon && <span className="text-lg ml-2">{btn.icon}</span>}
        </a>
      ))}
    </div>
  );
}