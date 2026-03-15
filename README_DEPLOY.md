# 🚢 Инструкция по деплою SIRAT

Проект полностью подготовлен к деплою в Docker-контейнере, в том числе на платформу **Render**.

## 🏗️ Локальный запуск через Docker

1. Убедитесь, что у вас установлен Docker и Docker Compose.
2. Создайте файл `.env.production` на основе ваших ключей Supabase.
3. Запустите сборку и запуск:
   ```bash
   docker-compose up --build
   ```
4. Приложение будет доступно по адресу `http://localhost:3000`.

## 🚀 Деплой на Render.com

Render автоматически распознает наш `Dockerfile` и `render.yaml`.

### Вариант 1: Blueprint (рекомендуемый)
1. Загрузите код в GitHub.
2. В панели Render выберите **"Blueprints"**.
3. Подключите ваш репозиторий. Render использует `render.yaml` для настройки всех параметров.

### Вариант 2: Manual Web Service
1. Создайте новый **Web Service**.
2. Подключите репозиторий.
3. Выберите **Language: Docker**.
4. В разделе **Advanced**, добавьте следующие Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (URL вашего приложения на Render)
   - `SUPABASE_SERVICE_ROLE_KEY` (если требуется для серверных функций)
   - `AUTH_SECRET` (произвольная строка для безопасности)

## ⚙️ Особенности конфигурации

- **Standalone Mode**: Используется `output: 'standalone'` в `next.config.js` для минимизации размера образа (образ весит ~150-200MB вместо 1GB+).
- **Multi-stage Build**: Сборка проходит в три этапа (deps -> builder -> runner), что гарантирует отсутствие лишних файлов в финальном контейнере.
- **Security**: Приложение запускается от имени непривилегированного пользователя `nextjs` (non-root).

## 📊 Мониторинг
В `docker-compose.yml` настроен `healthcheck`. На Render можно настроить путь `/api/health` для проверки жизнеспособности сервиса.
