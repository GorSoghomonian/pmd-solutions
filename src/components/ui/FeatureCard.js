export default function FeatureCard({
  icon,
  title,
  description,
  bgColor = "#f7f9fa",
  iconBg = "bg-blue-600",
  iconColor = "text-white",
  badge,
  badgeColor = "bg-blue-100 text-blue-700",
  cardSize = "md",
  descFont = "md" // добавлено значение по умолчанию
}) {
  // Размеры карточки и шрифтов
  const sizeStyles = {
    sm: "w-[260px] min-h-[90px] p-2",
    md: "w-[260px] min-h-[110px] p-6",
    lg: "w-[380px] min-h-[140px] p-8",
    xl: "w-[440px] min-h-[170px] p-10"
  };
  const titleFont = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl"
  };
  const descFontStyles = {
    sm: "text-[12px]",
    md: "text-[15px]",
    lg: "text-[16px]",
    xl: "text-[17px]"
  };

  return (
    <div
      className={`flex items-start gap-4 rounded-xl shadow-md ${sizeStyles[cardSize]}`}
      style={{ background: bgColor }}
    >
      <div className={`w-12 h-12 ${iconBg} ${iconColor} rounded-full flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div className="flex flex-col items-start w-full">
        <h4 className={`${titleFont[cardSize]} font-semibold text-gray-900 text-left mb-1 flex items-center gap-2`}>
          {title}
          {badge && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
              {badge}
            </span>
          )}
        </h4>
        <p className={`${descFontStyles[descFont]} text-gray-700 text-left leading-snug break-words w-full`}>
          {description}
        </p>
      </div>
    </div>
  );
}
