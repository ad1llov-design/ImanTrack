export interface Story {
  id: string;
  titleAr: string;
  titleTranslations: {
    ru: string;
    en: string;
    uz: string;
    ky: string;
  };
  arabic: string;
  transliterations: {
    ru: string;
    en: string;
    uz: string;
    ky: string;
  };
  translations: {
    ru: string;
    en: string;
    uz: string;
    ky: string;
  };
  moralTranslations: {
    ru: string;
    en: string;
    uz: string;
    ky: string;
  };
  source: string;
  sourceKey: string;
}

export interface StoriesState {
  currentStoryId: string | null;
  favoriteStoryIds: string[];
}
