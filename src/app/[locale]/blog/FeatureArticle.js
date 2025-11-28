import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ActionButtons from "../../../components/molecules/ActionButtons";

export default async function FeatureArticle({ locale, blogData }) {
  const t = await getTranslations({ locale, namespace: "home" });
  
  const featuredPost = blogData?.items?.[0];
  const fallbackFeatured = t.raw("blog.featured") || {};

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 pb-12 ">
        <div className="flex justify-center items-center flex-col text-center p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t("blog.featured.label")}
          </h2>
          <p className="p-6 text-lg text-gray-600">
            {t("blog.featured.subtitle")}
          </p>
        </div>
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="lg:flex">
            
            <div className="lg:w-1/2 relative">
              {(() => {
                const imageSrc = featuredPost?.image || fallbackFeatured?.image || "/placeholder-blog.svg";
                const imageAlt = featuredPost?.title || fallbackFeatured?.title || "Featured post";
                
                return (
                  <Image
                    src={imageSrc || "/placeholder-blog.svg"}
                    alt={imageAlt}
                    width={1500}
                    height={1800}
                    className="w-full h-full object-cover"
                  />
                );
              })()}
            </div>

            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
              <div className="text-gray-500 text-sm flex gap-4 mb-3">
                <span>{featuredPost?.date.slice(0, 10) || fallbackFeatured?.date}</span>
                <span>• {featuredPost?.author || fallbackFeatured?.author}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {featuredPost?.title || fallbackFeatured?.title || t("blog.featured.title")}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {featuredPost?.excerpt || fallbackFeatured?.summary || t("blog.featured.summary")}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(featuredPost?.tags || fallbackFeatured?.tags || t.raw("blog.featured.tags") || []).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                  >
                    {"#" + (typeof tag === "string" ? tag : tag.name)}
                  </span>
                ))}
              </div>
              <div>
                <ActionButtons 
                buttons = {[
                  { text: fallbackFeatured?.ctaLabel || t('blog.featured.ctaLabel'), 
                    href: featuredPost?.href || `/${locale}/blog/${featuredPost?.slug || `blog-${featuredPost?.id}`}` || `/${locale}${fallbackFeatured?.href || t('blog.featured.href')}`,
                    icon: '➜',
                    className: 'px-8 py-4 bg-[#2A73DD] text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg text-center whitespace-nowrap cursor-pointer',
                }]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
