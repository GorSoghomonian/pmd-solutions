# Blog API Integration - Next.js

## 🚀 Что было сделано

### 1. Интеграция API блогов
- ✅ Подключена работа с API `http://localhost:4000/api/blogs`
- ✅ Поддержка многоязычности (`?lang=ru` / `?lang=en`)
- ✅ Фильтрация по категориям (`?category=tech`)
- ✅ Пагинация (`?page=1&limit=10`)

### 2. Файловая структура
```
src/
├── app/[locale]/blog/
│   ├── page.js                 # Главная страница блога (без изменений!)
│   ├── FeatureArticle.js       # Обновлен для работы с API
│   ├── CategoryArticle.js      # Обновлен для фильтрации через API
│   ├── [slug]/
│   │   ├── page.js            # Страница отдельного поста (НОВЫЙ!)
│   │   └── not-found.js       # 404 страница для постов
│   └── create/
│       ├── page.js            # Страница создания поста
│       └── CreateBlogForm.js  # Форма создания поста
├── lib/api.js                 # API функции
└── components/
    └── molecules/BlogPostCard.js
```

### 3. API функции

#### `getBlogData(locale, filters)`
```javascript
// Получение списка блогов
const blogData = await getBlogData('ru', { 
  category: 'tech', 
  limit: 10, 
  page: 1 
});
```

#### `getBlogPost(slug, locale)`
```javascript
// Получение отдельного поста
const { post, error } = await getBlogPost('blog-44', 'ru');
```

#### `createBlogPost(formData)`
```javascript
// Создание нового поста
const { post, error } = await createBlogPost(formData);
```

### 4. Структура данных из API
```json
{
  "total": 19,
  "page": 1,
  "pageCount": 2,
  "blogs": [
    {
      "id": 44,
      "image": "/uploads/blogs/blog-xxx.jpg",
      "carousel_images": ["/uploads/carousel/carousel-xxx.jpg"],
      "created_at": "2025-09-17T09:51:37.391Z",
      "author": {
        "id": 16,
        "name": "Администратор",
        "email": "admin@pmd.local"
      },
      "contents": [
        {
          "language": { "code": "en" },
          "title": "Hello World",
          "subtitle": "Subtitle here",
          "content": "<h1>HTML content</h1>"
        }
      ]
    }
  ]
}
```

### 5. Нормализация данных
API данные автоматически преобразуются в удобный формат:

```javascript
// Из сложной структуры API
{
  id: 44,
  contents: [{ language: { code: "en" }, title: "Hello" }],
  image: "/uploads/blogs/blog-xxx.jpg"
}

// В простую структуру для UI
{
  id: 44,
  slug: "blog-44",
  title: "Hello",
  excerpt: "Subtitle here",
  image: "http://localhost:4000/uploads/blogs/blog-xxx.jpg",
  href: "/en/blog/blog-44"
}
```

## ⚙️ Настройка

### 1. Переменные окружения (.env.local)
```bash
# Для серверных запросов
HUBSPOT_BASE_URL=http://localhost:4000

# Для клиентских запросов  
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 2. Переводы добавлены в:
- `messages/en.json` - английские переводы
- `messages/ru.json` - русские переводы

## 🔄 Как это работает

### Серверная сторона (SSR)
1. `BlogPage` → `getBlogData(locale)` → API запрос → нормализация → передача в компоненты
2. SEO-friendly, быстрая загрузка первой страницы

### Клиентская сторона
1. `BlogSection` → `useEffect` → `getBlogData(locale, {limit: 3})` → обновление состояния
2. `CategoryArticle` → выбор категории → новый API запрос → фильтрованные данные

### Отдельные посты
1. URL: `/blog/blog-44` → `getBlogPost('blog-44', locale)` → рендер поста
2. Поддержка HTML контента, изображений, метаданных

### Fallback система
```
API запрос → Ошибка? → Статические данные из messages → Пустой массив
```

## 🎯 Маршруты

| URL | Описание |
|-----|----------|
| `/blog` | Главная страница блога |
| `/blog/blog-44` | Отдельный пост (ID 44) |
| `/blog/create` | Создание нового поста |
| `/ru/blog` | Русская версия блога |
| `/en/blog` | Английская версия блога |

## 🚀 Запуск

1. Убедитесь что ваш API работает на `http://localhost:4000`
2. Установите зависимости: `npm install`
3. Настройте `.env.local` (см. выше)
4. Запустите: `npm run dev`
5. Откройте: `http://localhost:3000/blog`

## ✅ Что работает

- ✅ Динамическая загрузка блогов из API
- ✅ Многоязычность (ru/en)
- ✅ Фильтрация по категориям
- ✅ Отдельные страницы постов
- ✅ Создание новых постов
- ✅ Graceful fallback при ошибках API
- ✅ SEO метаданные
- ✅ Адаптивный дизайн
- ✅ HTML контент в постах
- ✅ Поддержка изображений и карусели

## 🎨 Дизайн
- Все компоненты сохранили оригинальный дизайн
- Добавлены индикаторы загрузки
- Красивые страницы отдельных постов
- Responsive дизайн для всех экранов

---

**Готово к использованию!** 🎉
