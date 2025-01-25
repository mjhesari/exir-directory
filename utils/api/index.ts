import { FilterState } from "@/redux/features/filters/filter-slice";
import { errorHandler } from "./errorHandler";

export const getDirectoryData = async (
  filters?: Partial<FilterState>,
  pageSize?: number,
  pageIndex?: number
  ) => {
    try {
      const body = JSON.stringify({
        filters: filters ?? {},
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? 25,
      });
      const response = await fetch(`/api/directory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ExchangeData in index:", error);
    return { data: { Data: {} } };
  }
};
export const filterConvertor = (filters: FilterState) => {
  const {
    selectedCategories,
    switchIsSelectedMargin,
    switchIsSelectedMarket,
    selectedCountries,
    selectedPayments,
    selectedCurrencies,
    searchName,
    selectedProvinces,
    selectedCities,
  } = filters;

  type BodyType = {
    tags?: string[];
    country?: string | null;
    attributes?: { key: string; value: boolean | string[] }[];
    name?: { [key: string]: string };
    region?: string;
    city?: string;
  };

  const body: BodyType = {};
  selectedCategories.length && (body.tags = selectedCategories);
  process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba"
    ? (body.country = "Iran")
    : selectedCountries.length && (body.country = selectedCountries);
    process?.env?.NEXT_PUBLIC_DIRECTORY === "dubai"
    ? (body.city = "dubia")
    : selectedCities.length && (body.city = selectedCities);
    process?.env?.NEXT_PUBLIC_DIRECTORY === "iranarabic"
    ? (body.country = "Iran")
    : selectedCountries.length && (body.country = selectedCountries);
  searchName && (body.name = searchName);
  selectedCities && (body.city = selectedCities);
  selectedProvinces && (body.region = selectedProvinces);
  switchIsSelectedMargin &&
    (body.attributes = [{ key: switchIsSelectedMargin, value: true }]);
  switchIsSelectedMarket &&
    (body.attributes = [
      ...(body?.attributes ?? []),
      { key: switchIsSelectedMarket, value: false },
    ]);
  selectedPayments.length &&
    (body.attributes = [...(body?.attributes ?? []),{ key: "bcc4a9db-c980-4b08-ac37-0054a1885dcb", value: selectedPayments },
    ]);
  selectedCurrencies.length &&
    (body.attributes = [
      ...(body?.attributes ?? []),
      {
        key: "d735db00-99ce-4bac-90dd-c0219baec715",
        value: selectedCurrencies,
      },
    ]);
  return Object.keys(body).length ? body : false;
};

/* -------------------------------------------------------------------------- */
/*                                LanguageFetch                                */
/* -------------------------------------------------------------------------- */
export const getAllLanguage = async () => {
  const url = process.env.NEXT_PUBLIC_COUNTRY_BASE_URL + "api/language";
  try {
    const countries = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    });
    if (!countries.ok) {
      throw new Error("Failed to fetch Languages");
    }
    const data = await countries.json();
    return data;
  } catch {
    return null;
  }
};
//* Convert filter object to verify body 
type UnknownObj = Record<string, string | string[] | { [key: string]: string }>; 
export const filterObjectConverter = (filters: UnknownObj) => { 
  return Object.entries(filters??{}).reduce((acc: UnknownObj, key) => { 
    if (key?.[1]?.length || Object.values(key?.[1] || key?.[1]).length) { 
      acc[key?.[0]] = key?.[1]; 
    } 
    return acc; 
  }, {}); 
};
