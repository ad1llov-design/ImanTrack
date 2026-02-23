"use client";

import { cn } from "@shared/lib/utils";

const SUNNAH_DATA = [
  {
    id: "miswak",
    category: "Утренние Сунны",
    title: "Мисвак",
    description: "Использование мисвака при пробуждении и перед намазом. Одна из самых любимых Сунн Пророка ﷺ.",
    source: "Мисвак очищает рот и вызывает довольство Господа.",
    reference: "Ан-Насаи",
  },
  {
    id: "morning_dua",
    category: "Утренние Сунны",
    title: "Утренний дуа",
    description: "Чтение дуа при пробуждении: «Альхамдулиллахи ллязи ахъяна баъда ма аматана ва иляйхи ннушур».",
    source: "Хвала Аллаху, Который оживил нас после того, как умертвил нас, и к Нему — воскресение.",
    reference: "Аль-Бухари",
  },
  {
    id: "fajr_sunnah",
    category: "Утренние Сунны",
    title: "Два ракаата Фаджр",
    description: "Два ракаата добровольной молитвы перед обязательным Фаджром. Пророк ﷺ никогда не оставлял их.",
    source: "Два ракаата перед Фаджром лучше, чем мир и всё, что в нём.",
    reference: "Муслим",
  },
  {
    id: "rawatib",
    category: "Сунны Намаза",
    title: "Раватиб",
    description: "12 ракаатов суннан-раватиб: 2 перед Фаджром, 4 перед и 2 после Зухра, 2 после Магриба, 2 после Иша.",
    source: "Кто выполняет 12 ракаатов добровольной молитвы в день, тому Аллах построит дом в Раю.",
    reference: "Муслим",
  },
  {
    id: "mosque",
    category: "Сунны Намаза",
    title: "Идти в мечеть",
    description: "Идти в мечеть пешком для совершения джамаат-намаза. Каждый шаг вознаграждается.",
    source: "Каждый шаг в мечеть стирает один грех и поднимает на одну степень.",
    reference: "Муслим",
  },
  {
    id: "post_prayer_dhikr",
    category: "Сунны Намаза",
    title: "Зикр после намаза",
    description: "СубханАллах 33, Альхамдулиллях 33, Аллаху Акбар 34 — после каждого обязательного намаза.",
    source: "Кто славит Аллаха после каждого намаза 33 раза, восхваляет 33 раза и возвеличивает 34 раза — тому прощаются грехи, даже если они подобны пене морской.",
    reference: "Муслим",
  },
  {
    id: "wudu_sleep",
    category: "Сунны Перед Сном",
    title: "Вуду перед сном",
    description: "Совершить омовение (вуду) перед тем, как лечь спать. Ангел остаётся рядом со спящим.",
    source: "Когда ты ложишься спать, соверши вуду как для намаза.",
    reference: "Аль-Бухари",
  },
  {
    id: "ayat_kursi",
    category: "Сунны Перед Сном",
    title: "Аят аль-Курси",
    description: "Чтение Аят аль-Курси (сура 2, аят 255) перед сном для защиты на всю ночь.",
    source: "Кто читает Аят аль-Курси перед сном, того охраняет ангел от шайтана до утра.",
    reference: "Аль-Бухари",
  },
  {
    id: "right_side",
    category: "Сунны Перед Сном",
    title: "Сон на правом боку",
    description: "Ложиться на правый бок, подложив правую руку под щеку, и обратиться к Аллаху с дуа.",
    source: "Когда ложишься — ложись на правый бок и скажи: «О Аллах, я предался Тебе...»",
    reference: "Аль-Бухари",
  },
  {
    id: "smile",
    category: "Сунны Характера",
    title: "Улыбка",
    description: "Дарить улыбку брату по вере — это тоже садака (милостыня). Одна из самых лёгких форм благого дела.",
    source: "Твоя улыбка в лицо брату — садака.",
    reference: "Ат-Тирмизи",
  },
  {
    id: "patience",
    category: "Сунны Характера",
    title: "Сабр (терпение)",
    description: "Проявлять терпение при трудностях и невзгодах. Верующий вознаграждается за терпение в любой ситуации.",
    source: "Как удивительно положение верующего! Всё для него — благо. Если его постигнет радость — он благодарит, и это благо; если постигнет беда — он терпит, и это тоже благо.",
    reference: "Муслим",
  },
  {
    id: "kindness",
    category: "Сунны Характера",
    title: "Доброта к соседям",
    description: "Проявлять доброту и уважение к своим соседям. Ислам уделяет особое внимание правам соседей.",
    source: "Джибриль не переставал мне завещать хорошее отношение к соседу, пока я не подумал, что он сделает его наследником.",
    reference: "Аль-Бухари",
  },
];

/**
 * Sunnah Grid — clean card layout like hadith cards.
 * No emojis, no icons, no tracking, no database.
 */
export function SunnahGrid({ className }: { className?: string }) {
  const categories = [...new Set(SUNNAH_DATA.map((s) => s.category))];

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {categories.map((cat) => {
        const items = SUNNAH_DATA.filter((s) => s.category === cat);
        return (
          <div key={cat} className="space-y-4">
            <h2 className="text-sm font-bold tracking-wider text-muted uppercase px-1">
              {cat}
            </h2>
            <div className="space-y-4">
              {items.map((sunnah) => (
                <div
                  key={sunnah.id}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                >
                  <h3 className="text-base font-bold text-main mb-2">
                    {sunnah.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {sunnah.description}
                  </p>
                  <div className="bg-primary-50/50 dark:bg-primary-950/30 py-3 px-4 rounded-xl border border-primary-100/50 dark:border-primary-900/50 space-y-1.5">
                    <p className="text-xs text-primary-700 dark:text-primary-300 font-medium italic leading-relaxed">
                      {sunnah.source}
                    </p>
                    <p className="text-[10px] font-bold text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
                      {sunnah.reference}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
