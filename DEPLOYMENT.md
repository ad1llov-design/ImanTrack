# 🚀 Инструкция по деплою (Production Build)

## 1. Vercel (Рекомендуемый способ)

Vercel — самая быстрая платформа для Next.js.

1. Загрузите код в GitHub репозиторий.
2. Подключите репозиторий в [Vercel Dashboard](https://vercel.com/new).
3. Добавьте переменные окружения (Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Нажмите **Deploy**. Vercel автоматически настроит CI/CD.

## 2. Render.com (Docker)

Если вы предпочитаете Docker или Blueprint:

1. Создайте файл `render.yaml` (уже есть в проекте).
2. В Render выберите **Blueprint**.
3. Подключите репозиторий. Render сам развернет Веб-сервис по инструкции из `Dockerfile`.
4. Не забудьте указать `output: "standalone"` в `next.config.js` (уже настроено).

## 3. GitHub Actions (CI)

В проекте настроен файл `.github/workflows/ci.yml`. Он автоматически проверяет:
- ✅ Типы (TypeScript)
- ✅ Линтинг (ESLint)
- ✅ Успешность сборки (Next Build)
- ✅ Сборку Docker-образа (только в ветке main)

Все секреты (`NEXT_PUBLIC_*`) должны быть добавлены в **Settings -> Secrets and variables -> Actions** в вашем GitHub репозитории.

## ⚙️ Финальный Checklist перед релизом

1. [ ] Проверьте, что в Supabase настроены **CORS** для домена вашего приложения.
2. [ ] Настройте **Email Templates** в Supabase Auth для вашего бренда.
3. [ ] Проверьте Lighthouse в Vercel/Render после деплоя (вкладка PWA).
4. [ ] Убедитесь, что `NEXT_PUBLIC_APP_URL` совпадает с доменом сайта.

---
Разработано с ❤️ командой SIRAT.
