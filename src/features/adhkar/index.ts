// features/adhkar — barrel export

// Components
export { CategoryCard } from "./components/CategoryCard";
export { DhikrCounter } from "./components/DhikrCounter";
export { DhikrCategoryView } from "./components/DhikrCategoryView";

// Hooks
export { useAdhkar } from "./hooks/useAdhkar";

// Store
export { useAdhkarStore } from "./store/adhkarStore";

// Data
export {
  ADHKAR_CATEGORIES,
  ADHKAR_LIST,
  MOTIVATION_MESSAGES,
  getDhikrsByCategory,
  getCategoryInfo,
  getTotalCountForCategory,
  getMotivationMessage,
} from "./data/adhkar.data";

// Services
export {
  saveProgressLocal,
  loadProgressLocal,
  syncProgressToServer,
  loadProgressFromServer,
} from "./services/adhkar.persistence";

// Types
export type {
  AdhkarCategory,
  CategoryInfo,
  Dhikr,
  DhikrProgress,
  CategoryProgress,
  MotivationMessage,
  AdhkarState,
} from "./types/adhkar.types";
