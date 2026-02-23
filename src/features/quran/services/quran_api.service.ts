const BASE_URL = "https://api.alquran.cloud/v1";

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

export async function getSurahVerses(chapterId: number, scriptType: QuranScriptType = "quran-uthmani"): Promise<Verse[]> {
  try {
    const res = await fetch(`${BASE_URL}/surah/${chapterId}/editions/${scriptType},ru.kuliev`);
    if (!res.ok) throw new Error("Failed to fetch verses");
    const data = await res.json();
    
    if (!data.data || data.data.length < 2) return [];

    const arabicAyahs = data.data[0].ayahs;
    const russianAyahs = data.data[1].ayahs;

    return arabicAyahs.map((ayah: any, index: number) => ({
      id: ayah.numberInSurah,
      verse_key: `${chapterId}:${ayah.numberInSurah}`,
      text_arabic: ayah.text,
      translation: russianAyahs[index]?.text || ""
    }));
  } catch (error) {
    console.error(`Failed to fetch verses for surah ${chapterId} with script ${scriptType}:`, error);
    // Fallback to basic API if alquran.cloud fails (rare, but good for stability)
    try {
      if (scriptType === "quran-uthmani") {
        const fallbackRes = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterId}`);
        const fallbackData = await fallbackRes.json();
        const translationRes = await fetch(`https://api.quran.com/api/v4/quran/translations/79?chapter_number=${chapterId}`); // 79 is Russian translations usually, or 45
        const translationData = await translationRes.json();
        
        const verses = fallbackData.verses || [];
        const translations = translationData.translations || [];
        
        return verses.map((v: any, i: number) => ({
          id: i + 1,
          verse_key: v.verse_key,
          text_arabic: v.text_uthmani,
          translation: translations[i]?.text || ""
        }));
      }
    } catch (fallbackError) {
      console.error("Fallback API also failed:", fallbackError);
    }
    return [];
  }
}
