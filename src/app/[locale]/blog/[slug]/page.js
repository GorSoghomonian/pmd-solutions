import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getBlogPost, getBlogData } from '../../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

// Генерируем статические параметры для всех постов
export async function generateStaticParams({ params }) {
  const { locale } = params;
  
  try {
    console.log(`🔧 [generateStaticParams] Generating params for locale: ${locale}`);
    const blogData = await getBlogData(locale);
    console.log(`📊 [generateStaticParams] Got ${blogData.items?.length || 0} posts`);
    
    const slugs = blogData.items.map((post) => {
      const slug = post.slug || `blog-${post.id}`;
      console.log(`🔗 [generateStaticParams] Generated slug: ${slug}`);
      return { slug };
    });
    
    return slugs;
  } catch (error) {
    console.error(`❌ [generateStaticParams] Error:`, error);
    return [];
  }
}

// Генерируем метаданные для SEO
export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  
  try {
    const { post } = await getBlogPost(slug, locale);
    
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: post.title,
      description: post.excerpt || post.subtitle,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.subtitle,
        images: post.image ? [{ url: post.image }] : [],
        type: 'article',
        publishedTime: post.date,
        authors: post.author ? [post.author] : [],
      },
    };
  } catch {
    return {
      title: 'Blog Post',
    };
  }
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = params;
  
  console.log(`🔧 [BlogPostPage] Loading post with slug: ${slug}, locale: ${locale}`);
  
  // Получаем данные поста
  const { post, error } = await getBlogPost(slug, locale);
  
  console.log(`📊 [BlogPostPage] Post result:`, { post: !!post, error: !!error });
  
  // Если пост не найден, показываем 404
  if (!post && !error) {
    console.log(`❌ [BlogPostPage] Post not found, redirecting to 404`);
    notFound();
  }

  // Получаем переводы
  const t = await getTranslations({ locale, namespace: 'blog' });

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Если есть ошибка и нет поста, показываем ошибку
  if (error && !post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The requested blog post could not be found.
          </p>
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center px-6 py-3 bg-[#2A73DD] text-white rounded-lg hover:bg-[#1f5ec0] transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Хлебные крошки и навигация */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-[#2A73DD]">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[#2A73DD]">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-xs">
              {post?.title || 'Loading...'}
            </span>
          </nav>
        </div>
      </div>

      {/* Кнопка "Назад" */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-[#2A73DD] hover:text-[#1f5ec0] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Основной контент */}
      <article className="max-w-4xl mx-auto px-6 pb-20">
        {/* Заголовок поста */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post?.title || 'Loading...'}
          </h1>
          
          {/* Метаинформация */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            {post?.author && (
              <div className="flex items-center">
                <span className="w-5 h-5 mr-2">👤</span>
                <span>{post.author}</span>
              </div>
            )}
            
            {post?.date && (
              <div className="flex items-center">
                <span className="w-5 h-5 mr-2">📅</span>
                <span>{formatDate(post.date)}</span>
              </div>
            )}
            
            {post?.readTime && (
              <div className="flex items-center">
                <span className="w-5 h-5 mr-2">🕒</span>
                <span>{post.readTime}</span>
              </div>
            )}
          </div>

          {/* Подзаголовок */}
          {post?.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Главное изображение */}
        {post?.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title || 'Blog post image'}
              width={800}
              height={400}
              className="w-full h-[400px] object-cover"
              priority
            />
          </div>
        )}

        {/* Карусель изображений */}
        {post?.carouselImages && post.carouselImages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Gallery</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {post.carouselImages.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={250}
                    className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Контент поста */}
        {post?.content && (
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-[#2A73DD] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-ul:text-gray-700 prose-ol:text-gray-700
              prose-blockquote:border-l-[#2A73DD] prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* Сообщение об ошибке, если данные получены из fallback */}
        {error && (
          <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-800 text-sm">
              ⚠️ This content is displayed from cached data due to API unavailability.
            </p>
          </div>
        )}
      </article>

      {/* Связанные посты или призыв к действию */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Explore More Articles
          </h3>
          <p className="text-gray-600 mb-8">
            Discover more insights and expert guidance in our blog.
          </p>
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center px-8 py-4 bg-[#2A73DD] text-white rounded-lg hover:bg-[#1f5ec0] transition-colors font-semibold"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
