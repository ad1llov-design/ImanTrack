// features/hadith — barrel export

// Components
export { HadithCard } from "./components/HadithCard";
export { HadithWidget } from "./components/HadithWidget";
export { HadithPageContent } from "./components/HadithPageContent";

// Hooks
export { useHadith } from "./hooks/useHadith";

// Store
export { useHadithStore } from "./store/hadithStore";

// Services
export {
  getHadithOfTheDay,
  getRandomHadith,
  loadFavorites,
  saveFavorites,
  toggleFavoriteLocal,
  copyHadithText,
  shareHadith,
  formatHadithText,
  getFavoriteHadiths,
  syncFavoritesToServer,
  loadFavoritesFromServer,
} from "./services/hadith.service";

// Data
export {
  HADITH_COLLECTIONS,
  HADITH_LIST,
  getCollectionInfo,
  getHadithById,
} from "./data/hadith.collection";

// Types
export type {
  HadithCollection,
  CollectionInfo,
  Hadith,
  FavoriteHadith,
  HadithState,
} from "./types/hadith.types";
