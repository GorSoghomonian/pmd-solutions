import { getTranslations } from "next-intl/server";
import ActionButtons from "../molecules/ActionButtons";




export default async function BlogFooter() {

  const tHome = await getTranslations("home");
  const blog = tHome.raw("blog") || {};
  const items = Array.isArray(blog?.latest?.items) ? blog.latest.items : [];

  if (items.length === 0) return null; 

  
  const cta = items.find(p => p?.details?.cta)?.details?.cta;

  if (!cta) return null; 

  const primary = cta.primaryButton || {}; 
  const secondary = cta.secondaryButton || {}; 

  return (
    <footer className="bg-[#002A93] py-16 mt-20">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        {cta.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {cta.heading}
          </h2>
        )}
        {cta.text && (
          <p className="text-blue-100 max-w-2xl leading-relaxed text-xl mx-auto">
            {cta.text}
          </p>
        )}
        <ActionButtons
          buttons={[
            primary.label && {
              text: primary.label,
              href: primary.href || '/contact',
              className: 'bg-white text-[#002A93] font-semibold px-6 py-3 rounded-full shadow hover:shadow-md transition transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer'
            },
            secondary.label && {
              text: secondary.label,
              href: secondary.href || '#',
              className: 'bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer'
            }
          ].filter(Boolean)}
          className="justify-center"
        />
      </div>
    </footer>
  );
}