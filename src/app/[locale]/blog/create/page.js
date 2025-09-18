import { getTranslations } from "next-intl/server";
import CreateBlogForm from "./CreateBlogForm";

export default async function CreateBlogPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('create.title', { default: 'Create New Blog Post' })}
          </h1>
          
          <CreateBlogForm locale={locale} />
        </div>
      </div>
    </main>
  );
}
