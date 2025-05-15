//* LocalBusiness Data Types
export interface SiteData {
  id: string;
  publicId: string;
  slug: string;
  name: {
    [key: string]: string;
  };
  slogan: {
    [key: string]: string;
  };
  businessModel: string;
  DEFAULT_LANGuage: string;
  description: {
    [key: string]: string;
  };
  type: string[];
  industry: string[];
  tags: string[];
  address: string;
  borough: string;
  zip: string;
  city: string;
  region: string;
  country: string;
  phone: Phone[];
  mail: Mail[];
  workTime: WorkTime;
  logo: Logo[];
  media: Media[];
  color: Color[];
  links: Link[];
  foundingLocation: string;
  foundingDate: string;
  employeeCount: string;
  image: string;
  parentId: string | null;
  relatedBusinessId: string[];
  attributes: string[];
  claimed: boolean;
  status: string;
  date: string;
  version: string;
  authorId: string;
  geo: string;
}

interface Phone {
  title: string;
  value: string;
}

interface Mail {
  title: string;
  value: string;
}

interface WorkTime {
  friday: WorkTimeSlot[];
  monday: WorkTimeSlot[];
  sunday: WorkTimeSlot[];
  tuesday: WorkTimeSlot[];
  saturday: WorkTimeSlot[];
  thursday: WorkTimeSlot[];
  wednesday: WorkTimeSlot[];
}

interface WorkTimeSlot {
  open: Time;
  close: Time;
}

interface Time {
  hour: number;
  minute: number;
}

interface Logo {
  url: string;
  type: string;
}

interface Media {
  src: string;
  type: string;
  title: string;
  private: boolean;
  position: string;
}

interface Color {
  hex: string;
  type: string;
}

interface Link {
  url: string;
  type: string;
  title: string;
}

interface SiteConfig {
  id: string;
  users: string[];
  domain: string;
  lang: string;
  dir: string;
  type: string;
  theme: string;
  color: string;
  tag: string[];
  headScript: string;
  bodyScript: string;
  specificData: SpecificData;
  multiLang: boolean;
  claimed: boolean;
  status: string;
  icon: string;
  date: string;
  version: string;
  authorId: string;
  title: string;
  description: string;
  siteName: string;
  image: string;
  video: string | null;
  audio: string | null;
  locale: string;
  authorName: string;
  googleVerification: string;
  yahooVerification: string | null;
  bingVerification: string | null;
  yandexVerification: string | null;
}

interface SpecificData {
  pardis: {
    description: {
      en: string;
    };
  };
  businessId: string;
}

export interface LocalBusinessTypes {
  siteData: SiteData;
  siteConfig: SiteConfig;
}

export interface Business {
  id: string;
  publicId: string;
  slug: string;
  name: {
    ar?: string;
    en?: string;
    fa: string;
  };
  slogan?: {
    en?: string;
    fa?: string;
  };
  defaultlanguage?: string;
  description?: {
    en?: string;
    fa: string;
  };
  type?: { [key: string]: string }[];
  industry?: { [key: string]: string }[];
  tags?: { [key: string]: string }[];
  image?: string | null | undefined;
  address?: string | null;
  borough?: string | null;
  zip?: string | null;
  city?: string | number | null;
  region?: string | number | null;
  geo?: string | null;
  country: string;
  employeeCount?: string | null;
  foundingLocation?: string | null;
  foundingDate?: string | number | null;
  parentId?: string | null;
  relatedBusinessId?: string[] | null;
  claimed: boolean;
  status: string;
  date: string;
  version: string | number;
  authorId: string;
  phone?: {
    title: string;
    value: string;
  }[];
  mail?: {
    title: string;
    value: string;
  }[];
  workTime?: {
    [key: string]: {
      open: {
        hour: number;
        minute: number;
      };
      close: {
        hour: number;
        minute: number;
      };
    }[];
  };
  logo?:
    | {
        url: string;
        type: string;
      }[]
    | null;
  media?:
    | {
        src: string;
        type: string;
        title: string;
        private: boolean;
        position?: string;
      }[]
    | null;
  color?:
    | {
        hex: string;
        type: string;
      }[]
    | null;
  links?: {
    url: string;
    type: string;
    title?: {
      ar?: string;
      en?: string;
      fa?: string;
    };
  }[];
  attributes?: {
    key: string;
    value: string | boolean | string[];
  }[];
}

export interface DataStructure {
  data: Business[];
  details: {
    count: number;
  };
}
export type DayOfWeekType =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface CountryType {
  id: number;
  tr: { [key: string]: string };
  code: string;
  iso: string;
  lang: { [key: string]: string }[] | null;
}
export interface ProvinceType {
  id: number;
  contryId: number;
  tr: { [key: string]: string };
}
export interface CityType {
  id: number;
  contryId: number;
  provinceId: number;
  tr: { [key: string]: string };
}
export type LanguagesTypes =
  | {
      id: number;
      name: string;
      dir: string;
      code: string;
      nativeName: string;
    }[]
  | null
  | undefined;

export interface DataGetterProps {
  exchangeData: DataStructure | null;
  lang: Response | null;
}

export type BodyType = {
  tags?: string[];
  country?: string | null;
  attributes?: { key: string; value: boolean | string[] }[];
  name?: { [key: string]: string };
  region?: string;
  city?: string;
};
