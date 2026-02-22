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
    count: 7563,
  },
  {
    id: "muslim",
    name: "Сахих Муслим",
    author: "Имам Муслим",
    description: "Второй по достоверности сборник хадисов после Сахиха аль-Бухари.",
    count: 3033,
  },
  {
    id: "nawawi",
    name: "40 хадисов",
    author: "Имам Ан-Навави",
    description: "Сборник из сорока двух важнейших хадисов, охватывающих основы Ислама.",
    count: 42,
  }
];
