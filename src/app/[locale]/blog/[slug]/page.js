import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import HeroSection from "../../../../components/molecules/HeroSection";
import ErrorBoundary from "../../../../components/common/ErrorBoundary";
import Image from "next/image";
import BlogPostCard from "../../../../components/molecules/BlogPostCard";
import BlogFooter from "../../../../components/organsim/BlogFooter";

export default async function Page(props) {
  let slug;
  try {
    const params = await props.params;
    slug = params?.slug;
  } catch {
    slug = undefined;
  }

  if (!slug) {
    notFound();
  }

  const t = await getTranslations('blog');

  return (
    <main>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <h1 className="text-4xl font-bold text-center py-20">
            {t('post.title', { slug })}
          </h1>
          <div className="container mx-auto px-4">
            <p className="text-lg text-gray-600 text-center">
              {t('post.content')}
            </p>
          </div>
        </div>
        <BlogFooter />
      </ErrorBoundary>
    </main>
  );
}
