import React from "react";
import FeatureCard from "./FeatureCard";

/**
 * FeatureCardsSection Component
 * 
 * Renders a grid section of FeatureCard components with consistent spacing and layout.
 * 
 * @param {Array} items - Array of feature card data objects
 * @param {string} cardSize - Default card size for all cards
 * @param {string} gap - Grid gap classes
 */
export default function FeatureCardsSection({
  items = [],
  cardSize = "md", // Default card size
  gap = "gap-8",   // Default grid gap
}) {
  // TODO: Fix undefined descFont variable (line 23)
  // TODO: Make grid responsive breakpoints configurable
  // TODO: Add loading states for when items are being fetched
  
  return (
    <section className="text-gray-700 text-[15px] leading-relaxed mb-8">
      <div className={`grid grid-cols-1 md:grid-cols-2 ${gap} mb-8`}>
        {items.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            bgColor={item.bgColor}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            badge={item.badge}
            badgeColor={item.badgeColor}
            cardSize={item.cardSize || cardSize}
            // FIXME: descFont is undefined - should use item.descFont or provide default
            descFont={item.descFont || "md"}
            titleFont={item.titleFont || "md"}
          />
        ))}
      </div>
    </section>
  );
}
