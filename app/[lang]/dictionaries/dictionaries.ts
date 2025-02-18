import dicts from "./en.json";
import { locales } from "@/app/[lang]/dictionaries/languages";

type Language = (typeof locales)[number];
export type langsType = keyof typeof dictionaries;
export type DictsTypes = typeof dicts;

const dictionaries: Record<Language, () => Promise<Record<string, string>>> = locales.reduce(
  (acc, lang) => {
    acc[lang] = () =>
      import(`./${lang}.json`).then((module) => module.default);
    return acc;
  },
  {} as Record<Language, () => Promise<Record<string, string>>>
);

export const getDictionary = async (locale: langsType) => {
  const dicLocale = dictionaries[locale];
  if (!dicLocale) {
    throw new Error(`Dictionary for locale "${locale}" not found.`);
  }
  return await dicLocale();
};

