import bukhariData from "./bukhari.json";
import muslimData from "./muslim.json";
import tirmidhiData from "./tirmidhi.json";
import nawawiData from "./nawawi.json";

export interface HadithItem {
  id: number;
  arabic: string;
  translation: string;
  reference: string;
}

export const HADITHS_DATA: Record<string, HadithItem[]> = {
  bukhari: bukhariData as HadithItem[],
  muslim: muslimData as HadithItem[],
  tirmidhi: tirmidhiData as HadithItem[],
  nawawi: nawawiData as HadithItem[],
};
