import Image from 'next/image';
/**
 * FeatureCard Component
 * 
 * A reusable card component for displaying features with icon, title, description, and optional badge.
 * Supports multiple size variants and customizable styling.
 * 
 * @param {string|ReactElement} icon - Icon to display (emoji string or React element)
 * @param {string} title - Card title
 * @param {string} description - Card description text
 * @param {string} bgColor - Background color (hex value)
 * @param {string} iconBg - Icon background classes
 * @param {string} iconColor - Icon text color classes
 * @param {string} badge - Optional badge text
 * @param {string} badgeColor - Badge styling classes
 * @param {string} cardSize - Size variant (sm, md, lg, xl)
 * @param {string} descFont - Description font size variant
 * @param {string} titleFont - Title font size variant
 */
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
  titleFont = "md",
  reverse = false,
}) {
  // Size configuration object - could be moved to a theme config file
  const sizeStyles = {
    sm: "w-[260px] min-h-[90px] p-2",
    md: "w-[260px] min-h-[110px] p-6",
    lg: "w-[380px] min-h-[140px] p-8",
    xl: "w-[440px] min-h-[170px] p-10"
  };
  
  // Typography configuration - consider using Tailwind's built-in text sizing
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
      className={`flex gap-4 rounded-xl shadow-md ${sizeStyles[cardSize]} items-start w-full ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
      style={{ background: bgColor }}
    
    >
      {/* {image container} */}
      <div  className={`md:hidden `}>
        <Image
          alt="Automation"
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
          width={240}
          height={150}
          priority
          className="w-full object-cover rounded-2xl shadow-2xl"
                  />
      </div>
      {/* Icon container */}
      {/* <div className="sm:flex flex-col items-center justify-center hidden md-block">
        <div className={`w-10 h-10 ${iconBg} ${iconColor}  rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div> */}
      
      {/* Content container */}
      <div className="flex flex-col items-start w-full ">
        <div className={`block md:hidden ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className='flex items-center '>
          <div className={`w-8 h-8 ${iconBg} ${iconColor}  rounded-full flex items-center justify-center`}>
            {icon}
          </div>
          <h4 className={`${titleFontStyles[titleFont]} font-semibold text-gray-900 text-left  flex items-center ml-2`}>
            {title}
          </h4>
          </div>
          <p className={`${descFontStyles[descFont]} text-gray-700 text-left leading-snug break-words w-full py-2`}>
          {description}
          </p>
        </div>

          <div className={"hidden md:block"}>
            <div className='flex'>

            <div className="sm:flex hidden md-block">
              <div className={`w-10 h-10 ${iconBg} ${iconColor}  rounded-full flex items-center justify-center`}>
                {icon}
              </div>
          </div>
      <div className='ml-6'>

          <h4 className={`${titleFontStyles[titleFont]} font-semibold text-gray-900 text-left mb-1 flex items-center gap-2`}>
              {title}
            </h4>
          <p className={`${descFontStyles[descFont]} text-gray-700 text-left leading-snug break-words w-full`}>
            {description}
          </p>
      </div>
            </div>
        </div>
        {/* Optional badge */}
        {badge && (
          <span className={`px-2 mt-3 rounded-full text-xs font-medium ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}