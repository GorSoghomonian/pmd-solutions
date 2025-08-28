import Image from 'next/image';
import ActionButtons from '../../components/molecules/ActionButtons';

export default function HeroSection({
  title,
  decoLine,
  description,
  additional,
  backgroundImage,
  backgroundColor = 'bg-blue-600',
  textColor = 'text-white',
  overlayOpacity = 40,          // 0–100
  primaryButton,
  secondaryButton,
  showScrollIndicator = true,
  scrollLabel,
  className = '',
  minHeight = 'min-h-screen', 
}) {
  const buttons = [
    primaryButton && {
      text: primaryButton.text,
      href: primaryButton.href ?? '#',
      icon: primaryButton.icon,
      className:
        primaryButton.className ??
        'group relative px-8 py-4 bg-white text-[#2A73DD] rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer',
    },
    secondaryButton && {
      text: secondaryButton.text,
      href: secondaryButton.href ?? '#',
      icon: secondaryButton.icon,
      className:
        secondaryButton.className ??
        'group px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-[#2A73DD] transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer',
    },
  ].filter(Boolean);

  return (
    <section
      className={`relative ${minHeight} flex flex-col items-center justify-center text-center overflow-hidden ${backgroundColor} ${className}`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={backgroundImage}
            alt={title || 'Hero background'}
            fill
            priority
            className="object-cover"
            style={{ opacity: overlayOpacity / 100 }}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {title && (
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 mt-32 md:mt-0 leading-tight ${textColor} opacity-0 animate-fade-in-up animate-delay-0`}>
            {title}
          </h1>
        )}
        {decoLine && (
          <div className="mb-2 md:mt-1 flex justify-center opacity-0 animate-fade-in-up animate-delay-100">
						<span className="h-1 w-24 bg-[#002A93] rounded-full" />
					</div>
        )}
        {description && (
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animate-delay-150 ${textColor}`}>
            {description}
          </p>
        )}
        {additional && (
          <div className={`mt-4 text-lg max-w-3xl leading-relaxed opacity-0 animate-fade-in-up animate-delay-200 ${textColor}`}>
            {additional}
          </div>
        )}

        {buttons.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 text-center items-center justify-center mt-6 opacity-0 animate-fade-in-up animate-delay-300">
            <ActionButtons buttons={buttons} />
          </div>
        )}

        {showScrollIndicator && scrollLabel && (
          <div className="mt-10 flex flex-col items-center opacity-0 animate-fade-in-up animate-delay-500">
            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-2xl">⌄</span>
            </div>
            <span className="animate-bounce text-white">{scrollLabel}</span>
          </div>
        )}
      </div>
    </section>
  );
}