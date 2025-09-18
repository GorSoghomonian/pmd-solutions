// Тестовый скрипт для проверки API
const BASE_URL = 'http://localhost:4000';

async function testAPI() {
  console.log('🧪 Testing API endpoints...');
  
  try {
    // Тест 1: Получение списка блогов
    console.log('\n1. Testing /api/blogs endpoint...');
    const blogsResponse = await fetch(`${BASE_URL}/api/blogs?lang=en`);
    console.log(`Status: ${blogsResponse.status}`);
    
    if (blogsResponse.ok) {
      const blogs = await blogsResponse.json();
      console.log(`✅ Got ${blogs.blogs?.length || 0} blogs`);
      
      if (blogs.blogs?.length > 0) {
        const firstBlog = blogs.blogs[0];
        console.log(`First blog details:`);
        console.log(`  ID: ${firstBlog.id}`);
        console.log(`  Title: ${firstBlog.contents?.[0]?.title || 'No title'}`);
        console.log(`  Content length: ${firstBlog.contents?.[0]?.content?.length || 0} chars`);
        console.log(`  Has content: ${!!firstBlog.contents?.[0]?.content}`);
        
        // Проверяем контент первых нескольких постов
        console.log(`\n📝 Content check for first 3 posts:`);
        blogs.blogs.slice(0, 3).forEach((blog, index) => {
          const content = blog.contents?.[0];
          console.log(`Post ${index + 1} (ID: ${blog.id}):`);
          console.log(`  Title: ${content?.title || 'No title'}`);
          console.log(`  Subtitle: ${content?.subtitle || 'No subtitle'}`);
          console.log(`  Content: ${content?.content ? `${content.content.length} chars` : 'No content'}`);
          console.log(`  Slug would be: blog-${blog.id}`);
        });
      }
    } else {
      console.log(`❌ Failed to get blogs list`);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Запускаем тест если это основной модуль
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
