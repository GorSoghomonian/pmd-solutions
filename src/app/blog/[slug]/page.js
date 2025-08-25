import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';


export default async function Page(props) {

  const params = await props.params;
  const { slug } = params;

  const tHome = await getTranslations('home');
  const blog = tHome.raw('blog') || {};
  const items = Array.isArray(blog?.latest?.items) ? blog.latest.items : [];

  const post = items.find(p => p.slug === slug);

  if (!post) return notFound();


  const image = post.image || '/placeholder-blog.svg';

  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1>{post.title}</h1>
      <p>{post.date} • {post.readTime} • {post.author}</p>
      {image && <img src={image} alt={post.title} />}
      <p>{post.excerpt}</p>
    </section>
  );
}


