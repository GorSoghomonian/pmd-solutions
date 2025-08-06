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
  descFont = "md",
  titleFont = "md", // добавь сюда
}) {
  const sizeStyles = {
    sm: "w-[260px] min-h-[90px] p-2",
    md: "w-[260px] min-h-[110px] p-6",
    lg: "w-[380px] min-h-[140px] p-8",
    xl: "w-[440px] min-h-[170px] p-10"
  };
  const titleFontStyles = {
    sm: "text-[14px]",
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
      className={`flex gap-4 rounded-xl shadow-md ${sizeStyles[cardSize]} items-start`}
      style={{ background: bgColor }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className={`w-10 h-10 ${iconBg} ${iconColor} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="flex flex-col items-start w-full">
        <h4 className={`${titleFontStyles[titleFont]} font-semibold text-gray-900 text-left mb-1 flex items-center gap-2`}>
          {title}
        </h4>
        <p className={`${descFontStyles[descFont]} text-gray-700 text-left leading-snug break-words w-full`}>
          {description}
        </p>
        {badge && (
          <span className={`px-2 mt-3 rounded-full text-xs font-medium ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}