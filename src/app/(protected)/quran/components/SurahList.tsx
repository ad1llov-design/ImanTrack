"use client"

import { surahStartPage } from "../data/surahStartPage"

const SURAH_NAMES: Record<number, string> = {
  1: "Аль-Фатиха", 2: "Аль-Бакара", 3: "Али 'Имран", 4: "Ан-Ниса",
  5: "Аль-Маида", 6: "Аль-Ан'ам", 7: "Аль-А'раф", 8: "Аль-Анфаль",
  9: "Ат-Тауба", 10: "Йунус", 11: "Худ", 12: "Йусуф",
  13: "Ар-Ра'д", 14: "Ибрахим", 15: "Аль-Хиджр", 16: "Ан-Нахль",
  17: "Аль-Исра", 18: "Аль-Кахф", 19: "Марьям", 20: "Та Ха",
  21: "Аль-Анбия", 22: "Аль-Хаджж", 23: "Аль-Му'минун", 24: "Ан-Нур",
  25: "Аль-Фуркан", 26: "Аш-Шу'ара", 27: "Ан-Намль", 28: "Аль-Касас",
  29: "Аль-Анкабут", 30: "Ар-Рум", 31: "Лукман", 32: "Ас-Саджда",
  33: "Аль-Ахзаб", 34: "Саба", 35: "Фатыр", 36: "Йа Син",
  37: "Ас-Саффат", 38: "Сад", 39: "Аз-Зумар", 40: "Гафир",
  41: "Фуссилят", 42: "Аш-Шура", 43: "Аз-Зухруф", 44: "Ад-Духан",
  45: "Аль-Джасия", 46: "Аль-Ахкаф", 47: "Мухаммад", 48: "Аль-Фатх",
  49: "Аль-Худжурат", 50: "Каф", 51: "Аз-Зарият", 52: "Ат-Тур",
  53: "Ан-Наджм", 54: "Аль-Камар", 55: "Ар-Рахман", 56: "Аль-Ваки'а",
  57: "Аль-Хадид", 58: "Аль-Муджадиля", 59: "Аль-Хашр", 60: "Аль-Мумтахана",
  61: "Ас-Сафф", 62: "Аль-Джуму'а", 63: "Аль-Мунафикун", 64: "Ат-Тагабун",
  65: "Ат-Таляк", 66: "Ат-Тахрим", 67: "Аль-Мульк", 68: "Аль-Калям",
  69: "Аль-Хакка", 70: "Аль-Ма'аридж", 71: "Нух", 72: "Аль-Джинн",
  73: "Аль-Муззаммиль", 74: "Аль-Муддассир", 75: "Аль-Кияма", 76: "Аль-Инсан",
  77: "Аль-Мурсалят", 78: "Ан-Наба", 79: "Ан-Нази'ат", 80: "'Абаса",
  81: "Ат-Таквир", 82: "Аль-Инфитар", 83: "Аль-Мутаффифин", 84: "Аль-Иншикак",
  85: "Аль-Бурудж", 86: "Ат-Тарик", 87: "Аль-А'ля", 88: "Аль-Гашия",
  89: "Аль-Фаджр", 90: "Аль-Баляд", 91: "Аш-Шамс", 92: "Аль-Лейл",
  93: "Ад-Духа", 94: "Аш-Шарх", 95: "Ат-Тин", 96: "Аль-'Аляк",
  97: "Аль-Кадр", 98: "Аль-Баййина", 99: "Аз-Зальзаля", 100: "Аль-'Адият",
  101: "Аль-Кари'а", 102: "Ат-Такасур", 103: "Аль-'Аср", 104: "Аль-Хумаза",
  105: "Аль-Филь", 106: "Курайш", 107: "Аль-Ма'ун", 108: "Аль-Каусар",
  109: "Аль-Кафирун", 110: "Ан-Наср", 111: "Аль-Масад", 112: "Аль-Ихляс",
  113: "Аль-Фаляк", 114: "Ан-Нас"
};

export default function SurahList({ onSelect }: { onSelect: (s: number) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
      {Object.keys(surahStartPage).map((numStr) => {
        const num = Number(numStr);
        return (
          <button
            key={num}
            onClick={() => onSelect(num)}
            className="flex items-center justify-between bg-surface-light dark:bg-surface-dark hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-border p-3.5 rounded-xl transition-all active:scale-95 text-neutral-900 dark:text-neutral-50 font-semibold group hover:border-primary-500 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold shrink-0 border border-transparent group-hover:border-primary-200 dark:group-hover:border-primary-800 transition-colors">
                {num}
              </span>
              <span className="text-sm font-bold opacity-90 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-left line-clamp-1">
                {SURAH_NAMES[num]}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider whitespace-nowrap ml-2">
              Стр {surahStartPage[num]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

