import { FilterState } from "@/redux/features/filters/filter-slice";
import { errorHandler } from "./errorHandler";

export const getExchangeData = async (
  pageIndex = 0,
  pageSize = 25,
  filters?: FilterState
) => {
    const domain = process.env.NEXT_PUBLIC_URL
  try {
    const body = JSON.stringify({filters, pageIndex, pageSize});
    const response = await fetch(`${domain || ""}/api/directory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body
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
    city?:string
  };
  
  const body: BodyType = {};
  selectedCategories.length && (body.tags = selectedCategories);
  process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba"
  ? (body.country = "Iran")
  : selectedCountries.length && (body.country = selectedCountries);
  searchName && (body.name = searchName);
  selectedCities  && (body.city =selectedCities)
  selectedProvinces && (body.region = selectedProvinces);
  switchIsSelectedMargin &&
    (body.attributes = [{ key: switchIsSelectedMargin, value: true }]);
  switchIsSelectedMarket &&
    (body.attributes = [
      ...(body?.attributes ?? []),
      { key: switchIsSelectedMarket, value: false },
    ]);
  selectedPayments.length &&
    (body.attributes = [
      ...(body?.attributes ?? []),
      { key: "bcc4a9db-c980-4b08-ac37-0054a1885dcb", value: selectedPayments },
    ]);
  selectedCurrencies.length &&
    (body.attributes = [
      ...(body?.attributes ?? []),
      {
        key: "d735db00-99ce-4bac-90dd-c0219baec715",
        value: selectedCurrencies,
      },
    ]);
  return Object.keys(body).length ? body : false
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