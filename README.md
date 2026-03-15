# SIRAT — Трекер духовного роста

<div align="center">
  <h3>بسم الله الرحمن الرحيم</h3>
  <p><em>Во имя Аллаха, Милостивого, Милосердного</em></p>
  <br/>
  <p>Приложение для отслеживания духовного роста мусульман: намазы, суры, привычки, зикр.</p>
</div>

---

## 📋 Содержание

- [Стек технологий](#стек-технологий)
- [Архитектура проекта](#архитектура-проекта)
- [Установка и запуск](#установка-и-запуск)
- [Переменные окружения](#переменные-окружения)
- [Git стратегия](#git-стратегия)
- [Docker](#docker)
- [Deployment](#deployment)
- [Команды разработки](#команды-разработки)

---

## 🛠 Стек технологий

| Категория | Технология | Версия |
|---|---|---|
| Framework | Next.js App Router | 14.x |
| Language | TypeScript (strict) | 5.x |
| Styling | TailwindCSS | 3.x |
| Database | Supabase (PostgreSQL) | 2.x |
| State | Zustand | 4.x |
| Data Fetching | TanStack Query | 5.x |
| Forms | React Hook Form + Zod | 7.x / 3.x |
| PWA | next-pwa | 5.x |
| Icons | Lucide React | latest |
| Animation | Framer Motion | 11.x |
| Charts | Recharts | 2.x |
| Testing | Jest + Testing Library | 29.x |
| Containerization | Docker | multi-stage |
| Deployment | Vercel + Render | — |

---

## 🏗 Архитектура проекта

Проект следует принципам **Feature-Sliced Design (FSD)**:

```
sirat/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (SEO, fonts, providers)
│   │   ├── page.tsx            # Главная страница
│   │   ├── dashboard/          # Защищённые страницы
│   │   │   └── page.tsx
│   │   ├── auth/               # Авторизация
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── api/                # Route Handlers
│   │       └── health/route.ts
│   │
│   ├── features/               # Фичи (бизнес-логика UI)
│   │   ├── auth/               # Авторизация
│   │   │   ├── store/          # Zustand store
│   │   │   ├── hooks/          # useAuth, useSession
│   │   │   └── components/     # LoginForm, RegisterForm
│   │   ├── prayer-tracker/     # Трекер намазов
│   │   │   ├── hooks/
│   │   │   └── components/
│   │   ├── habit-tracker/      # Привычки
│   │   └── quran-reader/       # Коран
│   │
│   ├── entities/               # Доменные модели
│   │   ├── user/
│   │   │   └── model/user.ts   # User type + mapper
│   │   ├── prayer/
│   │   │   └── model/prayer.ts # Prayer type + constants
│   │   └── habit/
│   │       └── model/habit.ts
│   │
│   ├── services/               # Внешние API / data layer
│   │   ├── prayer/
│   │   │   └── prayerTimesService.ts  # Aladhan API
│   │   └── supabase/
│   │       ├── prayerRepository.ts
│   │       └── habitRepository.ts
│   │
│   ├── shared/                 # Переиспользуемый код
│   │   ├── components/
│   │   │   └── ui/             # Button, Card, Input, ...
│   │   ├── types/
│   │   │   ├── index.ts        # Global types
│   │   │   └── supabase.ts     # DB schema types
│   │   └── lib/
│   │       └── utils.ts        # cn(), formatDate(), ...
│   │
│   ├── lib/                    # Инфраструктура
│   │   ├── supabase/
│   │   │   ├── client.ts       # Browser client
│   │   │   ├── server.ts       # Server + Admin client
│   │   │   └── middleware.ts   # Session refresh
│   │   ├── query/
│   │   │   └── provider.tsx    # React Query provider
│   │   └── env.ts              # Type-safe env vars
│   │
│   ├── styles/
│   │   └── globals.css         # Design tokens + components
│   │
│   └── middleware.ts           # Route protection
│
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── icons/                  # PWA icons (72–512px)
│   └── patterns/               # Исламские SVG паттерны
│
├── supabase/
│   └── migrations/             # SQL миграции БД
│
├── .agent/workflows/           # Автоматизированные workflows
├── Dockerfile                  # Multi-stage production build
├── docker-compose.yml
├── next.config.js
├── tailwind.config.js
├── tsconfig.json               # strict mode
├── .eslintrc.json
├── .prettierrc
└── .env.example
```

### Принципы слоёв

| Слой | Назначение | Может импортировать |
|---|---|---|
| `app` | Страницы и роутинг | features, entities, shared, lib |
| `features` | Бизнес-логика + UI фич | entities, shared, services, lib |
| `entities` | Доменные модели | shared |
| `services` | Внешние сервисы и репозитории | shared, lib |
| `shared` | Переиспользуемые компоненты и утилиты | — |
| `lib` | Инфраструктура (Supabase, Query) | — |

> ⚠️ **Запрещено**: импортировать вышестоящие слои из нижестоящих (нарушение FSD)

---

## 🚀 Установка и запуск

### Требования

- Node.js **20+**
- npm **10+**
- Аккаунт [Supabase](https://supabase.com)

### 1. Клонирование

```bash
git clone <repo-url>
cd sirat
git checkout feature/initial-architecture
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка окружения

```bash
# Скопировать шаблон
cp .env.example .env.local
```

Заполнить `.env.local` (см. раздел [Переменные окружения](#переменные-окружения))

### 4. Запуск в режиме разработки

```bash
npm run dev
```

Приложение доступно на [http://localhost:3000](http://localhost:3000)

---

## 🔑 Переменные окружения

| Переменная | Описание | Обязательна |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL вашего Supabase проекта | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/Public ключ Supabase | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role ключ (только сервер!) | ✅ |
| `AUTH_SECRET` | Секрет для подписи токенов (min 32 символа) | ✅ |
| `NEXT_PUBLIC_APP_URL` | URL приложения | ✅ |
| `NEXT_PUBLIC_PRAYER_API_URL` | URL API времён намазов | ❌ |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Включить аналитику | ❌ |
| `NEXT_PUBLIC_MAINTENANCE_MODE` | Режим обслуживания | ❌ |

Получить ключи Supabase: **app.supabase.com → Settings → API**

---

## 🌿 Git стратегия

### Ветки

```
main            ← производственная (protected, только через PR)
develop         ← интеграционная ветка
feature/*       ← новые фичи
fix/*           ← исправления багов
hotfix/*        ← срочные исправления в prod
```

### Текущая ветка

```bash
git checkout feature/initial-architecture
```

### Конвенция коммитов (Conventional Commits)

```
feat(auth): добавить форму входа
fix(prayer): исправить расчёт времени фаджр
chore(deps): обновить next до 14.2.5
docs(readme): добавить инструкцию по деплою
refactor(ui): переработать компонент Card
test(prayer): добавить тесты prayerTimesService
```

### Pull Request — инструкция

1. **Убедитесь, что ветка актуальна:**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. **Проверьте линтинг и типы:**
   ```bash
   npm run lint
   npm run type-check
   npm run format:check
   ```

3. **Запустите тесты:**
   ```bash
   npm test
   ```

4. **Создайте PR на GitHub:**
   - Base: `develop`
   - Compare: `feature/initial-architecture`
   - Заголовок: `feat: initial project architecture`
   - Используйте шаблон PR (`.github/PULL_REQUEST_TEMPLATE.md`)

5. **Чеклист PR:**
   - [ ] Код прошёл линтинг (`npm run lint`)
   - [ ] Типы верны (`npm run type-check`)
   - [ ] Тесты проходят (`npm test`)
   - [ ] Нет чувствительных данных в коде
   - [ ] `.env.example` обновлён при добавлении переменных
   - [ ] README обновлён при изменении архитектуры

---

## 🐳 Docker

### Сборка и запуск

```bash
# Сборка образа
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=your_url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -t sirat:latest .

# Запуск через Docker Compose
docker-compose up -d

# Проверка здоровья
curl http://localhost:3000/api/health
```

---

## 🗺 Дорожная карта (Roadmap)

### ✅ Выполнено (Текущий релиз - MVP v1.0)
- **Базовая архитектура**: Feature-Sliced Design (FSD), Next.js App Router, TailwindCSS.
- **PWA Интеграция**: Установка приложения на iOS/Android, offline-кэширование (`next-pwa`).
- **Смена ребрендинга**: Переименование приложения в **SIRAT**.
- **Мультиязычность (i18n)**: Глубокая поддержка русского, английского, узбекского (латиница) и кыргызского языков.
- **Модуль "Азкары"**: Интерактивные счетчики, круговой прогресс-бар, автоматический перевод. Собственное хранилище в `localStorage` (работает offline).
- **Модуль "Хадисы"**: База данных достоверных хадисов (Навави, Бухари, Муслим, Тирмизи), карточки хадисов с автоподбором "Хадис дня".
- **Модуль "Коран"**: Двухуровневый режим чтения, API AlQuran Cloud, автоматическая транслитерация кириллицы в латиницу для узбекского языка.
- **Модуль "Сунна"**: Трекинг повседневных суннатов с сохранением прогресса.

### ⏳ В процессе
- **Аутентификация & Синхронизация**: Интеграция Supabase Auth и сохранение пользовательского прогресса в облако (для cross-device).
- **Продвинутая статистика**: Вывод графиков и аналитики (Recharts) по прочитанным зикрам и прочитанным страницам Корана.
- **Умный AI-Ассистент**: Контекстные ответы на базовые вопросы по Исламу на основе достоверных источников.

### 📅 В планах (Backlog)
- **Система достижений (Ачивки)**: Геймификация заработанных наград за цепочки дней (streaks) и выполнение целей зикров.
- **Трекер намазов**: Более точный калькулятор (Aladhan API), Push-уведомления перед началом времени намаза.
- **Социальные фичи**: Возможность делиться ежедневным прогрессом в Stories (Instagram/Telegram).
- **Тёмная тема (Dark Mode)**: Полноценный тюнинг всех цветовых палитр под ночной режим чтения.

---

## ☁️ Deployment

### Vercel (рекомендовано)

1. Подключить репозиторий на [vercel.com](https://vercel.com)
2. Framework Preset: **Next.js**
3. Добавить переменные окружения в Vercel Dashboard
4. Деплой автоматический при push в `main`

### Render (альтернатива)

1. Создать **Web Service** на [render.com](https://render.com)
2. Build Command: `npm run build`
3. Start Command: `npm start`
4. Добавить все переменные окружения
5. Health Check Path: `/api/health`

---

## 💻 Команды разработки

```bash
npm run dev              # Запуск в dev режиме
npm run build            # Production сборка
npm run start            # Запуск production сервера
npm run lint             # Проверка ESLint
npm run lint:fix         # Автоисправление ESLint
npm run format           # Форматирование Prettier
npm run format:check     # Проверка форматирования
npm run type-check       # Проверка TypeScript
npm run test             # Запуск тестов
npm run test:watch       # Тесты в watch режиме
npm run test:coverage    # Тесты с покрытием
npm run db:generate      # Генерация типов из Supabase
```

---

## 🎨 Дизайн-система

### Цветовая палитра (Исламский стиль)

| Token | Цвет | Описание |
|---|---|---|
| `primary-500` | `#369970` | Основной зелёный |
| `secondary-500` | `#da843a` | Акцентный янтарный |
| `neutral-*` | Тёплые серые | Текст и фоны |
| `surface-light` | `#fdfcf8` | Фон (светлая тема) |
| `surface-dark` | `#0f1a14` | Фон (тёмная тема) |

### CSS классы компонентов

```css
.btn-primary    /* Основная кнопка */
.btn-secondary  /* Вторичная кнопка */
.btn-ghost      /* Прозрачная кнопка */
.card           /* Карточка */
.input          /* Поле ввода */
.badge-green    /* Статус-бейдж */
.skeleton       /* Загрузочный скелетон */
```

---

<div align="center">
  <p>Сделано с ❤️ и بسم الله</p>
  <p><sub>SIRAT — помогаем мусульманам расти духовно каждый день</sub></p>
</div>
