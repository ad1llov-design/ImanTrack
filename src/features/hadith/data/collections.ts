export interface HadithCollection {
  id: string;
  name: string;
  author: string;
  description: string;
  count: number;
}

export const HADITH_COLLECTIONS: HadithCollection[] = [
  {
    id: "bukhari",
    name: "Сахих аль-Бухари",
    author: "Имам Бухари",
    description: "Один из шести основных суннитских сборников хадисов. Один из самых достоверных источников.",
    count: 50,
  },
  {
    id: "muslim",
    name: "Сахих Муслим",
    author: "Имам Муслим",
    description: "Второй по достоверности сборник хадисов после Сахиха аль-Бухари.",
    count: 50,
  },
  {
    id: "nawawi",
    name: "40 хадисов ан-Навави",
    author: "Имам Ан-Навави",
    description: "Сборник из сорока двух важнейших хадисов, охватывающих основы Ислама.",
    count: 42,
  },
  {
    id: "tirmidhi",
    name: "Сунан ат-Тирмизи",
    author: "Имам Ат-Тирмизи",
    description: "Один из шести канонических сборников хадисов. Содержит хадисы по вопросам фикха и нравственности.",
    count: 50,
  },
];
