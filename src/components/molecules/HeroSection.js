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
  overlayOpacity = 40,          
  primaryButton,
  secondaryButton,
  showScrollIndicator = true,
  showToolkit = false,
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

      <div className="relative z-10 w-full px-6">
        {showToolkit ? (
          <div className="relative z-10 max-w-7xl mx-auto text-left py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="transition-all duration-1000 opacity-100 translate-y-0">
                  <div className="inline-flex items-center px-4 py-2 bg-[#2A73DD]/20 rounded-full text-[#2A73DD] text-sm font-medium mb-6 border border-[#2A73DD]/30">
                    <i className="ri-tools-line mr-2 w-4 h-4 flex items-center justify-center" aria-hidden />
                    <span>Interactive Business Tools</span>
                  </div>

                  {title && (
                    <h1 className={`text-5xl lg:text-7xl font-bold text-white leading-tight`}>{title.split('Before')[0]}<span className="block text-[#2A73DD]">Before You</span>Implement</h1>
                  )}
                </div>

                {description && (
                  <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl transition-all duration-1000 delay-300 opacity-100 translate-y-0">{description}</p>
                )}

                <div className="space-y-4 transition-all duration-1000 delay-500 opacity-100 translate-y-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#2A73DD] rounded-full flex items-center justify-center"><i className="ri-check-line text-white text-sm" aria-hidden /></div>
                    <span className="text-gray-300">No downloads - use instantly in browser</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#2A73DD] rounded-full flex items-center justify-center"><i className="ri-check-line text-white text-sm" aria-hidden /></div>
                    <span className="text-gray-300">Test safely without affecting live data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#2A73DD] rounded-full flex items-center justify-center"><i className="ri-check-line text-white text-sm" aria-hidden /></div>
                    <span className="text-gray-300">Get instant results and recommendations</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-700 opacity-100 translate-y-0">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-[#2A73DD] text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30 whitespace-nowrap cursor-pointer" href="#toolkits">Try Tools Now<i className="ri-arrow-down-line ml-2" aria-hidden /></a>
                  <a className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-[#030000] transition-all duration-300 whitespace-nowrap cursor-pointer" href="/preview/aab1672d-f0d6-4c25-b00f-5b7b28aad040/3947815/contact">Request Custom Tool<i className="ri-arrow-right-line ml-2" aria-hidden /></a>
                </div>

                <div className="flex items-center space-x-8 pt-8 transition-all duration-1000 delay-900 opacity-100 translate-y-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">25,000+</div>
                    <div className="text-sm text-gray-400">Tool Uses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">16</div>
                    <div className="text-sm text-gray-400">Interactive Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">Free</div>
                    <div className="text-sm text-gray-400">No Registration</div>
                  </div>
                </div>
              </div>

              <div className="relative transition-all duration-1000 delay-1000 opacity-100 translate-x-0">
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Popular Tools</h3>
                      <span className="text-green-400 text-sm">Live</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <i className="ri-flow-chart text-[#2A73DD] w-5 h-5 flex items-center justify-center" aria-hidden />
                        <div>
                          <div className="text-white text-sm font-medium">Deal Flow Simulator</div>
                          <div className="text-gray-400 text-xs">1,247 users</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <i className="ri-code-s-slash-line text-[#2A73DD] w-5 h-5 flex items-center justify-center" aria-hidden />
                        <div>
                          <div className="text-white text-sm font-medium">API Endpoint Tester</div>
                          <div className="text-gray-400 text-xs">3,421 users</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <i className="ri-user-unfollow-line text-[#2A73DD] w-5 h-5 flex items-center justify-center" aria-hidden />
                        <div>
                          <div className="text-white text-sm font-medium">Contact Deduplicator</div>
                          <div className="text-gray-400 text-xs">892 users</div>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-[#2A73DD] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 cursor-pointer whitespace-nowrap">Try All Tools</button>
                  </div>

                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#2A73DD]/20 rounded-full flex items-center justify-center animate-bounce"><i className="ri-tools-line text-[#2A73DD] text-xl w-6 h-6 flex items-center justify-center" aria-hidden /></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse"><i className="ri-check-line text-green-400 w-5 h-5 flex items-center justify-center" aria-hidden /></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}