export interface HadithCollection {
  id: string;
  count: number;
  translations: {
    [key: string]: {
      name: string;
      author: string;
      description: string;
    };
  };
}

export const HADITH_COLLECTIONS: HadithCollection[] = [
  {
    id: "bukhari",
    count: 50,
    translations: {
      ru: { name: "Сахих аль-Бухари", author: "Имам Бухари", description: "Один из шести основных суннитских сборников хадисов. Один из самых достоверных источников." },
      en: { name: "Sahih al-Bukhari", author: "Imam Bukhari", description: "One of the six major Sunni hadith collections. One of the most authentic sources." },
      uz: { name: "Sahihi Imom Buxoriy", author: "Imom Buxoriy", description: "Oltita asosiy sunniy hadis to'plamlaridan biri. Eng ishonchli manbalardan biri." },
      ky: { name: "Сахих аль-Бухари", author: "Имам Бухари", description: "Алты негизги сүннөт хадис жыйнактарынын бири. Эң ишенимдүү булактардын бири." }
    }
  },
  {
    id: "muslim",
    count: 50,
    translations: {
      ru: { name: "Сахих Муслим", author: "Имам Муслим", description: "Второй по достоверности сборник хадисов после Сахиха аль-Бухари." },
      en: { name: "Sahih Muslim", author: "Imam Muslim", description: "The second most authentic hadith collection after Sahih al-Bukhari." },
      uz: { name: "Sahihi Imom Muslim", author: "Imom Muslim", description: "Sahihi Imom Buxoriydan keyingi ikkinchi eng ishonchli hadis to'plami." },
      ky: { name: "Сахих Муслим", author: "Имам Муслим", description: "Сахих аль-Бухариден кийинки экинчи ишенимдүү хадис жыйнагы." }
    }
  },
  {
    id: "nawawi",
    count: 42,
    translations: {
      ru: { name: "40 хадисов ан-Навави", author: "Имам Ан-Навави", description: "Сборник из сорока двух важнейших хадисов, охватывающих основы Ислама." },
      en: { name: "40 Hadith an-Nawawi", author: "Imam an-Nawawi", description: "A collection of forty-two most important hadiths covering the foundations of Islam." },
      uz: { name: "Imom Navaviyning 40 hadisi", author: "Imom Navaviy", description: "Islom asoslarini qamrab oluvchi qirq ikkita eng muhim hadislar to'plami." },
      ky: { name: "Имам Ан-Нававинин 40 хадиси", author: "Имам Ан-Навави", description: "Исламдын негиздерин камтыган кырк эки эң маанилүү хадистердин жыйнагы." }
    }
  },
  {
    id: "tirmidhi",
    count: 50,
    translations: {
      ru: { name: "Сунан ат-Тирмизи", author: "Имам Ат-Тирмизи", description: "Один из шести канонических сборников хадисов. Содержит хадисы по вопросам фикха и нравственности." },
      en: { name: "Sunan at-Tirmidhi", author: "Imam at-Tirmidhi", description: "One of the six canonical hadith collections. Contains hadiths on fiqh and morality." },
      uz: { name: "Sunani Imom Termiziy", author: "Imom Termiziy", description: "Oltita qonuniy hadis to'plamlaridan biri. Fiqh va axloqqa oid hadislarni o'z ichiga oladi." },
      ky: { name: "Сунан ат-Тирмизи", author: "Имам Ат-Тирмизи", description: "Алты канондук хадис жыйнактарынын бири. Фикх жана адеп-ахлак маселелери боюнча хадистерди камтыйт." }
    }
  },
];
