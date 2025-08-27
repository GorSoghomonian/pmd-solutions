import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import HeroSection from "../../../components/molecules/HeroSection";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Image from "next/image";
import BlogPostCard from "../../../components/molecules/BlogPostCard";
import BlogFooter from "../../../components/organsim/BlogFooter";

export default async function Page(props) {
  const params = await props.params;
  const { slug } = params;

  const tHome = await getTranslations("home");
  const blog = tHome.raw("blog") || {};
  const items = Array.isArray(blog?.latest?.items) ? blog.latest.items : [];

  const post = items.find((p) => p.slug === slug);

  if (!post) return notFound();

  const image = post.image || "/placeholder-blog.svg";
  const recommendedPosts = items
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      id: p.slug,
      href: p.href || `/blog/${p.slug}`,
      // fixed undefined variable categoryKey
      category: p.categoryLabel || p.categoryKey || '',
      date: p.date || '',
      readTime: p.readTime || p.read || '',
      image: p.image || "/placeholder-blog.svg",
      title: p.title || '',
    }));

  const readMoreLabel = blog?.latest?.readMore || "Read More";

  // Flags for conditional rendering
  const hasBestPractices = !!(
    post.details?.bestPracticesHeading ||
    post.details?.bestPracticesIntro ||
    (post.details?.bestPractices && post.details.bestPractices.length > 0)
  );
  const hasTags = !!(
    post.details?.tagsHeading ||
    (post.details?.tags && post.details.tags.length > 0)
  );
  const author = post.details?.author;
  const hasAuthor = !!(author && (author.name || author.longBio));
  const hasRelated = !!(
    post.details?.relatedHeading ||
    (recommendedPosts && recommendedPosts.length > 0)
  );

  return (
    <section>
      <ErrorBoundary>
        <div>
          <HeroSection
            title={
              <>
                <div className="text-sm flex gap-6 ">
                  <div className="border-0 w-28 h-8 rounded-full text-center bg-blue-500 flex justify-center items-center">
                    {post.categoryLabel}
                  </div>
                  <div className="flex justify-center items-center text-grey-300 gap-2">
                    <i className="ri-calendar-2-line text-grey-300" />{' '}
                    {post.date}
                  </div>
                  <div className="flex justify-center items-center text-grey-300 gap-2">
                    <i className="ri-time-line text-white" /> {post.readTime}
                  </div>
                </div>

                <span className="block text-4xl max-w-4xl mx-auto md:text-6xl lg:text-6xl font-bold mt-4 md:mt-6 text-left">
                  {post.title}
                </span>
              </>
            }
            description={
              <span className="block text-xl md:text-lg mt-2 text-blue-100 text-left max-w-4xl mx-auto">
                {post.excerpt}
              </span>
            }
            backgroundColor="bg-black"
            minHeight="md:min-h-[600px] min-h-[500px]"
            className="pb-12 md:pb-0"
          />

          <div className="max-w-4xl mx-auto py-6 flex justify-center flex-col gap-10">
            {post.details?.sections?.length > 0 && post.details.sections.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow">
                {section.heading && (
                  <h3 className="text-2xl font-semibold mb-3">{section.heading}</h3>
                )}
                {section.body && (
                  <p className="text-gray-700 mb-4">{section.body}</p>
                )}

                {section.keyComponentsHeading && (
                  <p className="font-medium text-gray-800 mb-2">
                    {section.keyComponentsHeading}
                  </p>
                )}

                {section.keyComponents?.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                    {section.keyComponents.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.quote?.text && (
                  <div className="border-l-4 border-blue-400 pl-4 py-8 italic text-gray-600 bg-blue-50 p-3 rounded">
                    “{section.quote.text}”
                    {section.quote.cite && (
                      <div className="mt-2 text-sm font-medium text-gray-500 text-right">
                        — {section.quote.cite}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {hasBestPractices && (
              <div className="rounded-xl shadow p-6">
                {post.details?.bestPracticesHeading && (
                  <h2 className="text-2xl font-semibold">
                    {post.details.bestPracticesHeading}
                  </h2>
                )}

                {post.details?.bestPracticesIntro && (
                  <h3 className="py-4">{post.details.bestPracticesIntro}</h3>
                )}

                {post.details?.bestPractices?.length > 0 && (
                  <ul className="list-disc list-inside space-y-2  text-gray-600">
                    {post.details.bestPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {hasTags && (
              <div>
                {post.details.tagsHeading && (
                  <h2 className="text-xl font-semibold pt-4 p-4 md:p-0">
                    {post.details.tagsHeading}
                  </h2>
                )}
                {post.details?.tags?.length > 0 && (
                  <div className="flex items-center flex-wrap gap-3 pb-12 py-2 md:p-0 md:gap-3 md:py-8 ml-4 md:ml-0">
                    {post.details.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-[#2A73DD] rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-300"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {hasAuthor && (
            <div className="bg-blue-50 py-16">
              <div className="max-w-4xl py-12 mx-auto flex items-center gap-6 shadow-lg rounded-2xl p-6 bg-white">
                {author?.name && (
                  <div className="flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={author.name}
                      width={90}
                      height={120}
                      className="rounded-full"
                    />
                    <p className="mt-2 text-sm font-medium text-gray-800 text-center">
                      {author.name}
                    </p>
                  </div>
                )}
                <div className="flex flex-col">
                  {post.details.aboutAuthorHeading && (
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {post.details.aboutAuthorHeading}
                    </h2>
                  )}
                  {author?.longBio && (
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {author.longBio}
                    </p>
                  )}
                  {post.details?.socials?.length > 0 && (
                    <div className="flex gap-4 text-blue-600">
                      {post.details.socials.map((icon, index) => (
                        <a key={index} href="#" aria-label={icon}>
                          <i className={`fa-brands ${icon} text-xl`}></i>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {hasRelated && (
            <div className="max-w-4xl md:max-w-7xl mx-auto py-6 pt-14 flex justify-center flex-col gap-10">
              {post.details.relatedHeading && (
                <div className="flex justify-center flex-col text-center text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  <h2>{post.details.relatedHeading}</h2>
                </div>
              )}
              {recommendedPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recommendedPosts.map((p) => (
                    <BlogPostCard key={p.id} post={p} readMoreLabel={readMoreLabel} />
                  ))}
                </div>
              )}
            </div>
          )}

          <BlogFooter />
        </div>
      </ErrorBoundary>
    </section>
  );
}
