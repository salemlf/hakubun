import { Collection } from "../types/Collection";
import { pagingApi } from "./ApiConfig";

export type PagedData<T> = {
  data: T[];
  total: number;
};

export const PagingAPI = {
  iterateOverPages: async function <T>(
    url: string,
    data: Collection<T>[]
  ): Promise<Collection<T>[]> {
    if (!url) {
      return data;
    }

    const response = await pagingApi.request({
      url: url,
      method: "GET",
    });

    data = data.concat(response.data);
    const nextPgURL = response.data.pages.next_url;

    return this.iterateOverPages(nextPgURL, data);
  },

  combinePages: <T>(pageData: Collection<T>[]): PagedData<T> => {
    const combined = {
      data: [] as T[],
      total: pageData[0].total_count,
    };

    pageData.forEach((page) => {
      combined.data.push(...page.data);
    });

    return combined;
  },
};
