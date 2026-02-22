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
  text_uthmani: string;
  translation?: string;
}

export async function getSurahList(): Promise<Surah[]> {
  try {
    const res = await fetch(`${BASE_URL}/surah`);
    const data = await res.json();
    return data.data.map((s: any) => ({
      id: s.number,
      name_simple: s.englishName, // Using transliteration e.g. Al-Fatihah
      name_arabic: s.name,
      verses_count: s.numberOfAyahs,
      translated_name: { name: s.englishNameTranslation }
    }));
  } catch (error) {
    console.error("Failed to fetch surahs:", error);
    return [];
  }
}

export async function getSurahVerses(chapterId: number): Promise<Verse[]> {
  try {
    const res = await fetch(`${BASE_URL}/surah/${chapterId}/editions/quran-uthmani,ru.kuliev`);
    const data = await res.json();
    
    // data.data[0] is quran-uthmani, data.data[1] is ru.kuliev
    if (!data.data || data.data.length < 2) return [];

    const arabicAyahs = data.data[0].ayahs;
    const russianAyahs = data.data[1].ayahs;

    return arabicAyahs.map((ayah: any, index: number) => ({
      id: ayah.numberInSurah,
      verse_key: `${chapterId}:${ayah.numberInSurah}`,
      text_uthmani: ayah.text,
      translation: russianAyahs[index]?.text || ""
    }));
  } catch (error) {
    console.error("Failed to fetch verses:", error);
    return [];
  }
}
