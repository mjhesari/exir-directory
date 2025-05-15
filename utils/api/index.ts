"use server";
import { FilterState } from "@/redux/features/filters/filter-slice";
// import { errorHandler } from "./errorHandler";
import { RequestBody } from "@/app/api/directory/route";
import { headers } from "next/headers";
export const getDirectoryData = async (
  filters?: Partial<FilterState["dynamicFilters"]>,
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
// export const filterConvertor = (filters: FilterState) => {
//   const { dynamicFilters, name } = filters;

/* -------------------------------------------------------------------------- */
/*                                LanguageFetch                                */
/* -------------------------------------------------------------------------- */
export const getAllLanguage = async () => {
  const hostname = headers().get("x-forwarded-host");
  const url =`http://${hostname}/api/language`;
  try {
    const countries = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
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

/* -------------------------------------------------------------------------- */
/*                            get data for sitemap                            */
/* -------------------------------------------------------------------------- */
export const getDataSitemap = async () => {
  try {
    let defaultSet: RequestBody = {};
   
     if (process?.env?.NEXT_PUBLIC_DIRECTORY === "dubai") {
      defaultSet = {};
    } 
     else if (process?.env?.NEXT_PUBLIC_DIRECTORY === "exchange") {
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
    return res;
  } catch (error) {
    console.error("Error fetching in sitemap:", error);
    return { data: { Data: {} } };
  }
};