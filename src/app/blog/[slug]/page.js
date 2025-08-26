import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import HeroSection from "../../../components/molecules/HeroSection";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default async function Page(props) {
  const params = await props.params;
  const { slug } = params;

  const tHome = await getTranslations("home");
  const blog = tHome.raw("blog") || {};
  const items = Array.isArray(blog?.latest?.items) ? blog.latest.items : [];

  const post = items.find((p) => p.slug === slug);

  if (!post) return notFound();

  const image = post.image || "/placeholder-blog.svg";

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
                    <i className="ri-calendar-2-line text-grey-300" />{" "}
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

          <div className="max-w-4xl mx-auto py-6 border-blue-100 w-max h-max items-center rounded-2xl bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg mt-16">
            <h2 className="text-2xl font-bold text-black px-6 pt-4">
              {post.details.overviewHeading}
            </h2>
            <p className="px-6 py-3 text-lg text-gray-700 leading-relaxed">
              {post.details.overview}
            </p>
          </div>

          <div>
            <div className="max-w-4xl mx-auto py-6">{post.details.intro}</div>
            <div className="flex justify-center">
              {post.details.heroImageCaption}
            </div>
          </div>

          <div className="max-w-4xl mx-auto py-6 flex justify-center flex-col gap-10">
            {post.details.sections.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-2xl font-semibold mb-3">
                  {section.heading}
                </h3>
                <p className="text-gray-700 mb-4">{section.body}</p>

                {section.keyComponentsHeading && (
                  <p className="font-medium text-gray-800 mb-2">
                    {section.keyComponentsHeading}
                  </p>
                )}

                {section.keyComponents && (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                    {section.keyComponents.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.quote && section.quote.text && (
                  <div className="border-l-4 border-blue-400 pl-4 py-8   italic text-gray-600 bg-blue-50 p-3 rounded">
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
          </div>
        </div>
      </ErrorBoundary>
    </section>
  );
}
