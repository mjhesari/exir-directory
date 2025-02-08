"use server";
import { FilterState } from "@/redux/features/filters/filter-slice";
// import { errorHandler } from "./errorHandler";
import { RequestBody } from "@/app/api/directory/route";
import { headers } from "next/headers";
import { ReactionType } from "@/types/dataTypes";
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
    return res;
  } catch (error) {
    console.error("Error fetching in sitemap:", error);
    return { data: { Data: {} } };
  }
};

/* -------------------------------------------------------------------------- */
/*                                   PostApi                                  */
/* -------------------------------------------------------------------------- */
export const getAllPost = async () => {
  const hostname = headers().get("x-forwarded-host");
  const url =`http://${hostname}/api/post`;
  try {
    const posts = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!posts.ok) {
      throw new Error("Failed to fetch Languages");
    }
    const data = await posts.json();
    return data;
  } catch {
    return null;
  }
};

/* -------------------------------------------------------------------------- */
/*                                fetchComments                               */
/* -------------------------------------------------------------------------- */
export async function fetchComments(targetId: string, pageIndex = 0, pageSize = 10, parentId?: string) {
  const params = new URLSearchParams({
    targetId,
    pageIndex: pageIndex.toString(),
    pageSize: pageSize.toString(),
    ...(parentId && { parentId }),
  });

  const response = await fetch(`${process.env.BASE_URL_COMMENT}/comment?${params}`, {
    headers: {
      Authorization: `Bearer ${process.env.COMMENT_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  return response.json();
}

export async function createComment(data: {
  targetId: string;
  fullUrl?: string;
  parentId?: string;
  pendingContent?: string;
  filesUrl?: string[];
}) {
  const response = await fetch(`${process.env.BASE_URL_COMMENT}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COMMENT_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create comment');
  }

  return response.json();
}

export async function getComment(id: string) {
  const response = await fetch(`${process.env.BASE_URL_COMMENT}/comment/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.COMMENT_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comment');
  }

  return response.json();
}

export async function fetchReactions(commentId: string) {
  const response = await fetch(`${process.env.BASE_URL_COMMENT}/reaction/${commentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.COMMENT_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reactions');
  }

  return response.json();
}

export async function createOrUpdateReaction(data: {
  commentId: string;
  type?: ReactionType;
  rate?: number;
}) {
  const response = await fetch(`${process.env.BASE_URL_COMMENT}/reaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COMMENT_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create/update reaction');
  }

  return response.json();
}