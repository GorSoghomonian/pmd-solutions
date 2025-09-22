import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getBlogPost, getBlogData, getBlogTags } from '../../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import SafeHtmlContent from '../../../../components/common/SafeHtmlContent';
import HeroSection from "../../../../components/molecules/HeroSection";

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
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  
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
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  
  console.log(`🔧 [BlogPostPage] Loading post with slug: ${slug}, locale: ${locale}`);
  
  // Получаем данные поста
  const { post, error } = await getBlogPost(slug, locale);
  
  const tags = post?.id ? await getBlogTags(post.id) : [];
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
      {/* <div className="max-w-4xl mx-auto px-6 py-18">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-[#2A73DD] hover:text-[#1f5ec0] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div> */}

      {/* Основной контент */}
      <article className="mx-auto ">
        {/* Заголовок поста */}
        <HeroSection
          title={
            <>
              <div className="text-sm flex gap-6">
                {post.categoryLabel && (
                  <div className="border-0 w-28 h-8 rounded-full text-center bg-blue-500 flex justify-center items-center">
                    {post.categoryLabel}
                  </div>
                )}
                {post.date && (
                  <div className="flex justify-center items-center text-grey-300 gap-2">
                    <i className="ri-calendar-2-line text-grey-300" /> {formatDate(post.date)}
                  </div>
                )}
                {post.author && (
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5">👤</span>
                    <span>{post.author}</span>
                  </div>
                )}
              </div>
              <span className="block text-4xl max-w-4xl mx-auto md:text-6xl lg:text-6xl font-bold mt-4 md:mt-6 text-left">
                {post.title}
              </span>
            </>
          }
          description={
            post.excerpt && (
              <span className="block text-xl md:text-lg mt-2 text-blue-100 text-left max-w-4xl mx-auto">
                {post.excerpt}
              </span>
            )
          }
          backgroundColor="bg-black"
          minHeight="md:min-h-[500px] min-h-[500px]"
          className="pb-12 md:pb-0"
        />

        {/* Главное изображение */}
        <article  className='max-w-4xl mx-auto'>

        {post?.image && (
          <div className="mb-8 rounded-xl overflow-hidden mt-12">
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
          <>
            <style>{`
              .ql-align-center { text-align: center; }
              .ql-align-right { text-align: right; }
              .ql-align-left { text-align: left; }
            `}</style>
            <SafeHtmlContent
              html={post.content}
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-[#2A73DD] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:text-gray-700 prose-ol:text-gray-700
                prose-blockquote:border-l-[#2A73DD] prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100"
            />
          </>
        )}

        {/* Сообщение об ошибке, если данные получены из fallback */}
        {error && (
          <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-800 text-sm">
              ⚠️ This content is displayed from cached data due to API unavailability.
            </p>
          </div>
        )}

        <div className='border-t pt-8 mt-12 border-gray-200'>
          <h2 className="text-xl font-semibold pt-4 p-4 md:p-0">Tags</h2>
          {tags?.length > 0 ? (
            <div className="flex items-center flex-wrap gap-3 pb-12 py-2 md:p-0 md:gap-3 md:py-8 ml-4 md:ml-0">
              {tags.map((tag, index) => (
                <div key={index} className="px-3 py-1 bg-blue-100 text-[#2A73DD] rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-300">
                  {typeof tag === 'string' ? tag : tag.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 italic px-4 py-2">No tags yet</div>
          )}
        </div>
      </article>

      {/* Связанные посты или призыв к действию */}
      <div className="bg-gray-100 py-12 mt-12">
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
        </article>
    </main>
  );
}
