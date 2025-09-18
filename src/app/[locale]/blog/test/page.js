// Тестовая страница для проверки API
import { getBlogData, getBlogPost } from '../../../../lib/api';

export default async function TestBlog({ params }) {
  const { locale } = params;
  
  console.log('=== TEST PAGE ===');
  
  // Тестируем получение списка блогов
  const blogData = await getBlogData(locale);
  console.log('Blog data:', blogData);
  
  // Тестируем получение первого поста
  if (blogData.items?.length > 0) {
    const firstPost = blogData.items[0];
    console.log('First post:', firstPost);
    
    const { post, error } = await getBlogPost(firstPost.slug, locale);
    console.log('Single post result:', { post, error });
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog API Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Blog Data</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(blogData, null, 2)}
        </pre>
      </div>
      
      {blogData.items?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
          <div className="grid gap-4">
            {blogData.items.slice(0, 3).map((post) => (
              <div key={post.id} className="border p-4 rounded">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                <p className="text-sm text-gray-600">Href: {post.href}</p>
                <a 
                  href={post.href} 
                  className="text-blue-600 hover:underline"
                >
                  Open post →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
