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
 * @param {string} gridCols - Tailwind grid column breakpoint classes (configurable)
 * @param {boolean} loading - When true, shows skeleton placeholders instead of items
 * @param {number} skeletonCount - Number of skeleton cards to display while loading
 */
export default function FeatureCardsSection({
  items = [],
  cardSize = "md", // Default card size
  gap = "gap-8",   // Default grid gap
  gridCols = "grid-cols-1 md:grid-cols-2",    // Configurable breakpoint columns
  loading = false,
  skeletonCount = 4,
}) {
  // descFont now safely handled via default in props mapping (was TODO)
  const renderSkeletons = () =>
    Array.from({ length: skeletonCount }).map((_, i) => (
      <div
        key={`skeleton-${i}`}
        className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm animate-pulse"
      >
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-lg bg-gray-200 mr-4" />
          <div className="flex-1">
            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    ));

  return (
    <section className="text-gray-700 text-[15px] leading-relaxed mb-8">
      <div className={`grid ${gridCols} ${gap} mb-8`}>
        {loading
          ? renderSkeletons()
          : items.map((item, index) => (
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
                descFont={item.descFont || "md"}       // Fixed undefined usage
                titleFont={item.titleFont || "md"}
              />
            ))}
      </div>
      {!loading && items.length === 0 && (
        <p className="text-sm text-gray-500">No features available.</p>
      )}
    </section>
  );
}
