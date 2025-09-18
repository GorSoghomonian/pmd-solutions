'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function CreateBlogForm({ locale }) {
  const t = useTranslations('blog');
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    image: null,
    carouselImages: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleCarouselImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      carouselImages: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      
      // Добавляем текстовые поля
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('language', locale);
      
      // Добавляем главное изображение
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      // Добавляем изображения карусели
      formData.carouselImages.forEach((file, index) => {
        formDataToSend.append(`carouselImages`, file);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/blogs`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`Failed to create blog post: ${response.status}`);
      }

      const result = await response.json();
      setSuccess('Blog post created successfully!');
      
      // Перенаправляем на страницу созданного поста через 2 секунды
      setTimeout(() => {
        router.push(`/${locale}/blog/blog-${result.id}`);
      }, 2000);

    } catch (err) {
      console.error('Error creating blog post:', err);
      setError(err.message || 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Заголовок */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          {t('create.form.title', { default: 'Title' })} *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={t('create.form.titlePlaceholder', { default: 'Enter blog title...' })}
        />
      </div>

      {/* Подзаголовок */}
      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
          {t('create.form.subtitle', { default: 'Subtitle' })}
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={t('create.form.subtitlePlaceholder', { default: 'Enter subtitle...' })}
        />
      </div>

      {/* Категория */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          {t('create.form.category', { default: 'Category' })}
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{t('create.form.selectCategory', { default: 'Select category...' })}</option>
          <option value="tech">Technology</option>
          <option value="business">Business</option>
          <option value="automation">Automation</option>
          <option value="analytics">Analytics</option>
        </select>
      </div>

      {/* Контент */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          {t('create.form.content', { default: 'Content' })} *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          required
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={t('create.form.contentPlaceholder', { default: 'Write your blog content here... (HTML supported)' })}
        />
        <p className="mt-1 text-sm text-gray-500">
          {t('create.form.contentHint', { default: 'You can use HTML tags for formatting' })}
        </p>
      </div>

      {/* Главное изображение */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          {t('create.form.mainImage', { default: 'Main Image' })}
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Изображения карусели */}
      <div>
        <label htmlFor="carouselImages" className="block text-sm font-medium text-gray-700 mb-2">
          {t('create.form.carouselImages', { default: 'Carousel Images' })}
        </label>
        <input
          type="file"
          id="carouselImages"
          name="carouselImages"
          onChange={handleCarouselImagesChange}
          accept="image/*"
          multiple
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          {t('create.form.carouselHint', { default: 'Select multiple images for carousel (optional)' })}
        </p>
      </div>

      {/* Сообщения об ошибках и успехе */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {success}
        </div>
      )}

      {/* Кнопки */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? t('create.form.creating', { default: 'Creating...' }) : t('create.form.create', { default: 'Create Blog Post' })}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {t('create.form.cancel', { default: 'Cancel' })}
        </button>
      </div>
    </form>
  );
}
