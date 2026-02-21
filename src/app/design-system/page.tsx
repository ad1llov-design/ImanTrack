/**
 * @page /design-system
 *
 * Демонстрационная страница всех UI компонентов.
 * Используйте эту страницу для визуальной проверки дизайн-системы.
 */

"use client";

import { useState } from "react";

import { Badge } from "@shared/components/ui/Badge";
import { Button } from "@shared/components/ui/Button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/components/ui/Card";
import { Container } from "@shared/components/ui/Container";
import { Counter } from "@shared/components/ui/Counter";
import { Footer } from "@shared/components/ui/Footer";
import { Input } from "@shared/components/ui/Input";
import { Navbar } from "@shared/components/ui/Navbar";
import { ProgressBar } from "@shared/components/ui/ProgressBar";
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonPrayerRow,
  SkeletonText,
} from "@shared/components/ui/Skeleton";
import { ThemeToggle } from "@shared/components/ui/ThemeToggle";

/* ── Section wrapper ────────────────────────────────────────────────── */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-20" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="mb-6">
        <h2 className="text-h2 text-neutral-900 dark:text-neutral-50">{title}</h2>
        <p className="mt-1 text-body-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
      {children}
      <div className="divider-islamic mt-12">
        <span>✦</span>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default function DesignSystemPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Navbar
        rightSlot={<ThemeToggle />}
      />

      <main className="min-h-screen bg-surface-light pt-20 dark:bg-surface-dark">
        {/* ── Hero ─────────────────────────────── */}
        <div className="bg-gradient-primary py-20">
          <Container>
            <p className="font-arabic text-3xl text-gold-300">بسم الله الرحمن الرحيم</p>
            <h1 className="mt-4 text-display text-white">
              ImanTrack <span className="text-gold-300">Design System</span>
            </h1>
            <p className="mt-3 max-w-2xl text-body text-primary-200">
              Полная дизайн-система с исламским стилем. Тёмно-зелёная палитра, золотые акценты,
              мобильная типографика, анимации и полная доступность.
            </p>
          </Container>
        </div>

        <Container paddingY="lg">
          <div className="space-y-16">

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* COLOR PALETTE */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Цветовая палитра"
              description="Основной: тёмно-зелёный (цвет Ислама) · Акцент: золотистый · Тёплые нейтральные"
            >
              {/* Primary */}
              <div className="mb-6">
                <h3 className="mb-3 text-h4 text-neutral-700 dark:text-neutral-300">Primary (Зелёный)</h3>
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                    <div key={shade} className="text-center">
                      <div
                        className={`h-14 w-14 rounded-xl bg-primary-${shade} shadow-soft transition-transform hover:scale-110`}
                      />
                      <span className="mt-1 block text-caption text-neutral-500">{shade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gold */}
              <div className="mb-6">
                <h3 className="mb-3 text-h4 text-neutral-700 dark:text-neutral-300">Gold (Золотой)</h3>
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                    <div key={shade} className="text-center">
                      <div
                        className={`h-14 w-14 rounded-xl bg-gold-${shade} shadow-soft transition-transform hover:scale-110`}
                      />
                      <span className="mt-1 block text-caption text-neutral-500">{shade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semantic */}
              <div>
                <h3 className="mb-3 text-h4 text-neutral-700 dark:text-neutral-300">Семантические</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-success-light px-4 py-2 dark:bg-success-dark">
                    <span className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-body-sm font-medium">Success</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-warning-light px-4 py-2 dark:bg-warning-dark">
                    <span className="h-3 w-3 rounded-full bg-warning" />
                    <span className="text-body-sm font-medium">Warning</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-danger-light px-4 py-2 dark:bg-danger-dark">
                    <span className="h-3 w-3 rounded-full bg-danger" />
                    <span className="text-body-sm font-medium">Danger</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-info-light px-4 py-2 dark:bg-info-dark">
                    <span className="h-3 w-3 rounded-full bg-info" />
                    <span className="text-body-sm font-medium">Info</span>
                  </div>
                </div>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* TYPOGRAPHY */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Типографика"
              description="Mobile-first размеры. Inter для латиницы, Amiri для арабского."
            >
              <div className="space-y-4">
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Display (3rem)</span>
                  <p className="text-display text-neutral-900 dark:text-neutral-50">السلام عليكم — Мир вам</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Display SM (2.25rem)</span>
                  <p className="text-display-sm text-neutral-900 dark:text-neutral-50">Духовный рост</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">H1 (1.875rem)</span>
                  <h1>Трекер намазов</h1>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">H2 (1.5rem)</span>
                  <h2>Сегодняшний прогресс</h2>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">H3 (1.25rem)</span>
                  <h3>Привычки</h3>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Body (1rem)</span>
                  <p>Основной текст для описаний и контента. Чистый и читаемый.</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Body SM (0.875rem)</span>
                  <p className="text-body-sm text-neutral-600 dark:text-neutral-400">Мелкий текст для подписей и вспомогательной информации.</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Overline (0.6875rem)</span>
                  <p className="text-overline uppercase tracking-wider text-neutral-500">Категория · Надпись</p>
                </div>
                <div className="rounded-2xl border border-neutral-100 p-6 dark:border-neutral-800">
                  <span className="text-caption text-neutral-400">Arabic (Amiri)</span>
                  <p className="font-arabic text-2xl text-gold-600 dark:text-gold-400">بسم الله الرحمن الرحيم</p>
                </div>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* BUTTONS */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Кнопки"
              description="5 вариантов × 5 размеров + загрузка, иконки, fullWidth"
            >
              {/* Variants */}
              <div className="mb-8">
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">Варианты</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="gold">Gold</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">Размеры</h3>
                <div className="flex flex-wrap items-end gap-3">
                  <Button size="xs">XS</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">X-Large</Button>
                </div>
              </div>

              {/* States */}
              <div className="mb-8">
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">Состояния</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 2000);
                    }}
                  >
                    Нажми для загрузки
                  </Button>
                  <Button isLoading>Загрузка...</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>

              {/* Icons */}
              <div className="mb-8">
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">С иконками</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button leftIcon={<span>🕌</span>}>Намаз</Button>
                  <Button variant="gold" leftIcon={<span>📖</span>}>Коран</Button>
                  <Button variant="secondary" rightIcon={<span>→</span>}>Далее</Button>
                </div>
              </div>

              {/* Full width */}
              <div>
                <h3 className="mb-4 text-h4 text-neutral-700 dark:text-neutral-300">Полная ширина</h3>
                <div className="max-w-md space-y-3">
                  <Button fullWidth>Начать путь</Button>
                  <Button variant="secondary" fullWidth>Войти</Button>
                </div>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* CARDS */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Карточки"
              description="4 варианта: default, outlined, elevated, glass. Опциональный hover-эффект."
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card variant="default" interactive>
                  <CardHeader>
                    <CardTitle>Default</CardTitle>
                  </CardHeader>
                  <CardDescription>Стандартная карточка с тенью и бордером.</CardDescription>
                  <CardFooter>
                    <Button size="sm">Подробнее</Button>
                  </CardFooter>
                </Card>

                <Card variant="outlined" interactive>
                  <CardHeader>
                    <CardTitle>Outlined</CardTitle>
                  </CardHeader>
                  <CardDescription>Только бордер, без заливки и тени.</CardDescription>
                  <CardFooter>
                    <Button size="sm" variant="secondary">Открыть</Button>
                  </CardFooter>
                </Card>

                <Card variant="elevated" interactive>
                  <CardHeader>
                    <CardTitle>Elevated</CardTitle>
                  </CardHeader>
                  <CardDescription>Усиленная тень для выделения.</CardDescription>
                  <CardFooter>
                    <Button size="sm" variant="gold">Золотой</Button>
                  </CardFooter>
                </Card>

                <Card variant="glass" interactive padding="md">
                  <CardHeader>
                    <CardTitle>Glass</CardTitle>
                  </CardHeader>
                  <CardDescription>Glassmorphism для оверлеев.</CardDescription>
                  <CardFooter>
                    <Button size="sm" variant="ghost">Закрыть</Button>
                  </CardFooter>
                </Card>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* INPUTS */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Поля ввода"
              description="С label, подсказкой, ошибкой, иконками. Анимированный фокус."
            >
              <div className="grid max-w-lg gap-5">
                <Input label="Имя" placeholder="Введите ваше имя" hint="Как к вам обращаться" />
                <Input label="Email" type="email" placeholder="your@email.com" leftIcon={<span>✉</span>} />
                <Input label="Пароль" type="password" placeholder="••••••••" error="Минимум 8 символов" />
                <Input placeholder="Без label" />
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* BADGES */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Бейджи"
              description="Статусы, теги и категории. 6 цветов × 3 размера + точка и иконка."
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Выполнен</Badge>
                  <Badge variant="warning">В ожидании</Badge>
                  <Badge variant="danger">Пропущен</Badge>
                  <Badge variant="info">Информация</Badge>
                  <Badge variant="gold">Премиум</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" dot>Онлайн</Badge>
                  <Badge variant="warning" dot>Оффлайн</Badge>
                  <Badge variant="danger" dot>Ошибка</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="sm">SM</Badge>
                  <Badge size="md">MD</Badge>
                  <Badge size="lg">LG</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" icon={<span>🕌</span>}>Ибадат</Badge>
                  <Badge variant="warning" icon={<span>📖</span>}>Коран</Badge>
                  <Badge variant="info" icon={<span>📿</span>}>Зикр</Badge>
                </div>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* PROGRESS BARS */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Прогресс-бар"
              description="Анимация при scroll, 4 варианта цвета, shimmer на LG."
            >
              <div className="max-w-lg space-y-6">
                <ProgressBar value={80} label="Намазы за сегодня" showValue variant="primary" size="md" />
                <ProgressBar value={45} label="Чтение Корана" showValue variant="gold" size="md" />
                <ProgressBar value={20} label="Цель не достигнута" showValue variant="danger" size="md" />
                <ProgressBar value={95} label="Общий прогресс" showValue variant="gradient" size="lg" />
                <div className="mt-4">
                  <p className="mb-2 text-body-sm text-neutral-500">Размеры:</p>
                  <div className="space-y-3">
                    <ProgressBar value={60} size="sm" />
                    <ProgressBar value={60} size="md" />
                    <ProgressBar value={60} size="lg" />
                  </div>
                </div>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* COUNTERS */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Счётчики"
              description="Анимированный подсчёт от 0. Запускается при scroll. easeOutExpo."
            >
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <Card variant="default" padding="lg">
                  <Counter
                    value={1247}
                    label="Намазов"
                    arabicLabel="صلوات"
                    color="primary"
                    size="lg"
                  />
                </Card>
                <Card variant="default" padding="lg">
                  <Counter
                    value={42}
                    label="Дней стрика"
                    arabicLabel="أيام"
                    suffix=" дн"
                    color="gold"
                    size="lg"
                  />
                </Card>
                <Card variant="default" padding="lg">
                  <Counter
                    value={89}
                    label="Прогресс"
                    suffix="%"
                    color="primary"
                    size="lg"
                  />
                </Card>
                <Card variant="default" padding="lg">
                  <Counter
                    value={7}
                    label="Привычек"
                    arabicLabel="عادات"
                    color="neutral"
                    size="lg"
                  />
                </Card>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* SKELETON LOADERS */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Скелетоны"
              description="Заглушки для загрузки: карточка, текст, аватар, строка намаза."
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card Skeleton */}
                <div>
                  <p className="mb-3 text-body-sm font-medium text-neutral-500">SkeletonCard</p>
                  <SkeletonCard />
                </div>

                {/* Text + Avatar */}
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-body-sm font-medium text-neutral-500">SkeletonText (4 lines)</p>
                    <SkeletonText lines={4} />
                  </div>
                  <div>
                    <p className="mb-3 text-body-sm font-medium text-neutral-500">SkeletonAvatar</p>
                    <div className="flex gap-3">
                      <SkeletonAvatar size={32} />
                      <SkeletonAvatar size={40} />
                      <SkeletonAvatar size={48} />
                      <SkeletonAvatar size={56} />
                    </div>
                  </div>
                </div>

                {/* Prayer rows */}
                <div>
                  <p className="mb-3 text-body-sm font-medium text-neutral-500">SkeletonPrayerRow</p>
                  <div className="space-y-3">
                    <SkeletonPrayerRow />
                    <SkeletonPrayerRow />
                    <SkeletonPrayerRow />
                  </div>
                </div>
              </div>

              {/* Raw shapes */}
              <div className="mt-8">
                <p className="mb-3 text-body-sm font-medium text-neutral-500">Базовые формы</p>
                <div className="flex flex-wrap gap-4">
                  <Skeleton variant="rectangular" width={120} height={80} />
                  <Skeleton variant="circular" width={60} height={60} />
                  <Skeleton variant="text" width={200} height={16} />
                </div>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* THEME TOGGLE */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Тема"
              description="Переключение light/dark с анимацией иконок. Сохраняется в localStorage."
            >
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <span className="text-body-sm text-neutral-500">← Нажмите для переключения</span>
              </div>
            </Section>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* CONTAINER */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <Section
              title="Container"
              description="3 размера: narrow (max-w-3xl), default (max-w-7xl), wide (max-w-8xl)."
            >
              <div className="space-y-4">
                <Container size="narrow" className="rounded-xl border-2 border-dashed border-primary-300 p-4 dark:border-primary-700">
                  <p className="text-center text-body-sm text-primary-600">Narrow (max-w-3xl)</p>
                </Container>
                <div className="rounded-xl border-2 border-dashed border-gold-300 p-4 dark:border-gold-700">
                  <p className="text-center text-body-sm text-gold-600">Default (max-w-7xl) — текущий</p>
                </div>
              </div>
            </Section>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
