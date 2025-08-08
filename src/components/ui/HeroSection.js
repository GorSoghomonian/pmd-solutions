import Image from 'next/image';
import ActionButtons from '../../components/ui/ActionButtons';

export default function HeroSection({
  title,
  description,
  backgroundImage,
  backgroundColor = 'bg-blue-600',
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
        'group px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-[#2A73DD] transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2',
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {buttons.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-6">
            <ActionButtons buttons={buttons} />
          </div>
        )}

        {showScrollIndicator && scrollLabel && (
          <div className="mt-10 flex flex-col items-center">
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