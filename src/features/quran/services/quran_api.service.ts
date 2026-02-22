const BASE_URL = "https://api.quran.com/api/v4";

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
  text_indopak: string;
}

export async function getSurahList(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/chapters?language=ru`);
  const data = await res.json();
  return data.chapters;
}

export async function getSurahVerses(chapterId: number): Promise<Verse[]> {
  const res = await fetch(`${BASE_URL}/quran/verses/uthmani?chapter_number=${chapterId}`);
  const data = await res.json();
  return data.verses;
}
