"use server"
import { FilterState } from "@/redux/features/filters/filter-slice";
import { errorHandler } from "./errorHandler";
import { RequestBody } from "@/app/api/directory/route";
import { headers } from "next/headers";
export const getDirectoryData = async (
  filters?: Partial<FilterState>,
  pageSize?: number,
  pageIndex?: number
) => {
  try {
    const hostname = headers().get("x-forwarded-host");
    const body = JSON.stringify({
      filters: filters ?? {},
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? 25,
    });
    const response = await fetch(`http://${hostname}/api/directory`, {
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
  process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba" && (body.country = "Iran")
  process?.env?.NEXT_PUBLIC_DIRECTORY === "dubai" && (body.city = "dubai")
  process?.env?.NEXT_PUBLIC_DIRECTORY === "iranarabic" && (body.country = "Iran")
  selectedCategories?.length && (body.tags = selectedCategories);
  selectedCountries?.length && (body.country = selectedCountries);
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
  selectedPayments?.length &&
    (body.attributes = [
      ...(body?.attributes ?? []),
      { key: "bcc4a9db-c980-4b08-ac37-0054a1885dcb", value: selectedPayments },
    ]);
  selectedCurrencies?.length &&
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
  return Object.entries(filters ?? {}).reduce((acc: UnknownObj, key) => {
    if (key?.[1]?.length || Object.values(key?.[1] || key?.[1]).length) {
      acc[key?.[0]] = key?.[1];
    }
    return acc;
  }, {});
};

/* -------------------------------------------------------------------------- */
/*                            get data for sitemap                            */
/* -------------------------------------------------------------------------- */
export const getDataSitemap = async () => {
  try {
    let defaultSet: RequestBody = {};
    if (process?.env?.NEXT_PUBLIC_DIRECTORY === "iranarabic") {
      defaultSet = {};
    } else if (process?.env?.NEXT_PUBLIC_DIRECTORY === "dubai") {
      defaultSet = {};
    } else if (process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba") {
      defaultSet = {
        industry: ["c259aa45-0a0f-49ac-be33-eade1392e136"],
      };
    } else if (process?.env?.NEXT_PUBLIC_DIRECTORY === "exchange") {
      defaultSet = {
        industry: ["0615cf73-9438-4801-9b8d-cc5cdce2da6b"],
      };
    }
    const body = JSON.stringify(defaultSet);
    const count = await fetch(
      `${process.env.BASE_URL}api/business/filter?pageIndex=0&pageSize=15`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        body,
      }
    );
    const resCount = await count.json();
    const data = await fetch(
      `${process.env.BASE_URL}api/business/filter?&pageIndex=0&pageSize=${
        resCount?.details?.count ?? "25"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        body,
      }
    );
    const res = await data.json();
    console.log('res: ', res);
    return res;
  } catch (error) {
    console.error("Error fetching in sitemap:", error);
    return { data: { Data: {} } };
  }
};
