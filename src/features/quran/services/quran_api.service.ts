const BASE_URL = "https://api.alquran.cloud/v1";
import type { LanguageCode } from "@shared/i18n/LanguageContext";

const cyrillicToLatinMap: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e',
  'ё': 'yo', 'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
  'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
  'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'x', 'ц': 'ts',
  'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '\'', 'ы': 'y', 'ь': '',
  'э': 'e', 'ю': 'yu', 'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E',
  'Ё': 'Yo', 'Ж': 'J', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K',
  'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
  'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'X', 'Ц': 'Ts',
  'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '\'', 'Ы': 'Y', 'Ь': '',
  'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
  'ғ': 'g\'', 'Ғ': 'G\'', 'қ': 'q', 'Қ': 'Q', 'ҳ': 'h', 'Ҳ': 'H',
  'ў': 'o\'', 'Ў': 'O\''
};

function transliterateUzbek(text: string): string {
  if (!text) return text;
  return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
}

export interface Surah {
  id: number;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
  translated_name: {
    name: string;
  };
}

export interface Verse {
  id: number;
  verse_key: string;
  text_arabic: string; // Renamed from text_uthmani to be generic
  translation?: string;
}

export type QuranScriptType = "quran-uthmani" | "quran-simple" | "quran-indopak";

export async function getSurahList(): Promise<Surah[]> {
  try {
    const res = await fetch(`${BASE_URL}/surah`);
    if (!res.ok) throw new Error("Failed to fetch surah list");
    const data = await res.json();
    return data.data.map((s: any) => ({
      id: s.number,
      name_simple: s.englishName, 
      name_arabic: s.name,
      verses_count: s.numberOfAyahs,
      translated_name: { name: s.englishNameTranslation }
    }));
  } catch (error) {
    console.error("Failed to fetch surahs:", error);
    return [];
  }
}

export async function getSurahVerses(chapterId: number, scriptType: QuranScriptType = "quran-uthmani", lang: LanguageCode = "ru"): Promise<Verse[]> {
  const ALQURAN_CLOUD_LANG_MAP: Record<LanguageCode, string> = { ru: "ru.kuliev", en: "en.sahih", uz: "uz.sodik", ky: "ru.kuliev" };
  const QURAN_COM_LANG_MAP: Record<LanguageCode, number> = { ru: 79, en: 20, uz: 55, ky: 79 };

  try {
    const res = await fetch(`${BASE_URL}/surah/${chapterId}/editions/${scriptType},${ALQURAN_CLOUD_LANG_MAP[lang]}`);
    if (!res.ok) throw new Error("Failed to fetch verses");
    const data = await res.json();
    
    if (!data.data || data.data.length < 2) return [];

    const arabicAyahs = data.data[0].ayahs;
    const russianAyahs = data.data[1].ayahs;

    return arabicAyahs.map((ayah: any, index: number) => {
      let translationText = russianAyahs[index]?.text || "";
      if (lang === "uz" && /[А-Яа-яЁёҚқҒғҲҳЎў]/.test(translationText)) {
        translationText = transliterateUzbek(translationText);
      }
      return {
        id: ayah.numberInSurah,
        verse_key: `${chapterId}:${ayah.numberInSurah}`,
        text_arabic: ayah.text,
        translation: translationText
      };
    });
  } catch (error) {
    console.error(`Failed to fetch verses for surah ${chapterId} with script ${scriptType}:`, error);
    // Fallback to basic API if alquran.cloud fails (rare, but good for stability)
    try {
      if (scriptType === "quran-uthmani") {
        const fallbackRes = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterId}`);
        const fallbackData = await fallbackRes.json();
        const translationRes = await fetch(`https://api.quran.com/api/v4/quran/translations/${QURAN_COM_LANG_MAP[lang]}?chapter_number=${chapterId}`);
        const translationData = await translationRes.json();
        
        const verses = fallbackData.verses || [];
        const translations = translationData.translations || [];
        
        return verses.map((v: any, i: number) => {
          let translationText = translations[i]?.text || "";
          if (lang === "uz" && /[А-Яа-яЁёҚқҒғҲҳЎў]/.test(translationText)) {
            translationText = transliterateUzbek(translationText);
          }
          return {
            id: i + 1,
            verse_key: v.verse_key,
            text_arabic: v.text_uthmani,
            translation: translationText
          };
        });
      }
    } catch (fallbackError) {
      console.error("Fallback API also failed:", fallbackError);
    }
    return [];
  }
}
