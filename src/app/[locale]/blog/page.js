import { getTranslations } from "next-intl/server";
import HeroSection from "../../../components/molecules/HeroSection"
import FeatureArticle from "./FeatureArticle";
import CategoryArticle from "./CategoryArticle";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { getBlogData } from "../../../lib/api";

export default async function BlogPage({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home' });

    // Получаем данные блога из API
    const blogApiData = await getBlogData(locale);

  return (
    <main>
      <ErrorBoundary> 
        <HeroSection 
          title={
            <>
              <span className="block text-5xl mt-6 md:mt-27 md:text-4xl lg:text-6xl font-bold items-center">
                {t("blog.hero.title")}
              </span>
            </>
          }
          description={
            <span className="block text-xl md:text-2xl text-blue-100 whitespace-pre-line">
              {t("blog.hero.subtitle")}
            </span>
          }
          backgroundImage=""
          backgroundColor="bg-[#002A93]"
          overlayOpacity={15}
          showScrollIndicator={true}
          minHeight="700px"
          className="flex items-center justify-center pb-10 text-white h-110 md:h-95"
        />

        <FeatureArticle locale={locale} blogData={blogApiData} />
        <CategoryArticle locale={locale} blogData={blogApiData} />
      </ErrorBoundary>
    </main>
  )
}
