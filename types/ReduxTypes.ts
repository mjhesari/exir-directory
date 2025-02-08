import { Business, LanguagesTypes } from "./dataTypes";


export type initialStateTypesLang = {
  lang: LanguagesTypes | null;
};

export interface DataState {
  data: Business[];
  details: {
    count: number;
  };
}
