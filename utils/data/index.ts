// Public imports
import { langsType } from "@/app/[lang]/dictionaries/dictionaries";
// Import types
import { Business, DayOfWeekType } from "@/types/dataTypes";
//* Days of the week
export const dayOfWeek: DayOfWeekType[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
//*LocalBusiness schema
export const generateLocalBusinessSchema = async (
  data: Business,
  lang: langsType
  ) => {
  const openingHoursSpecification = Object.keys(data?.workTime||{}).map(weekDay => {
    const open = data?.workTime?.[weekDay as keyof typeof data.workTime]?.[0]?.open;
    const close = data?.workTime?.[weekDay as keyof typeof data.workTime]?.[0]?.close;
    return ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: weekDay ?? "",
      opens: `${open?.hour??0}:${String(open?.minute??0).padStart(2, '0')}:00`,
      closes: `${close?.hour??0}:${String(close?.minute??0).padStart(2, '0')}:00`,
    });
  } ) ??""

  const commonData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    url: `https://${data?.links?.find(link => link.type === "website")?.url}`,
    logo: data?.logo?.[0]?.url ?? "",
    sameAs: data?.links?.map((link) => link?.url) ?? "",
    geo: {
      "@type": "GeoCoordinates",
      latitude: data?.geo?.split(",")[0] || "",
      longitude: data?.geo?.split(",")[1] || "",
    },
    foundingLocation: data?.foundingLocation ?? "",
    foundingDate: data?.foundingDate ?? "",
    numberOfEmployees: data?.employeeCount ?? "",
    image: data?.image ?? "",
  };

  const languageSpecificData = {
    name:data?.name?.["en" as keyof typeof data.name]??'Local Business',
    description:
    data?.description?.['en' as keyof typeof data.description] ?? "Business Description",
    slogan: data?.slogan?.['en' as keyof typeof data.slogan] ?? "Business Slogan",
    address: {
      "@type": "PostalAddress",
      streetAddress: data?.address ?? "address",
      addressLocality: data.city || "city name",
      postalCode: data?.zip ?? "zipcode",
      addressRegion: data.region || "region name",
      addressCountry: data.country || "country name",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: data?.phone?.map((phone) => phone?.value ?? "") ?? "",
      contactType: "Customer Service" ,
    //   areaServed Ask
      areaServed: data?.region ?? "areaServed",
      availableLanguage: lang || "en",
      // email: data?.mail?.map((mail) => mail?.value)?? "",
    },
    openingHoursSpecification :openingHoursSpecification ?? "",
  };

  return { ...commonData, ...languageSpecificData };
};
