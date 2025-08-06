import React from "react";
import FeatureCard from "./FeatureCard";

export default function FeatureCardsSection({
  items = [],
  cardSize = "md", // дефолтный размер
  gap = "gap-8",   // дефолтный gap
}) {
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
            descFont={item.descFont || descFont}
          />
        ))}
      </div>
    </section>
  );
}
