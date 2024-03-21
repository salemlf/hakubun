import { Collection } from "../types/Collection";
import { pagingApi } from "./ApiConfig";

export type PagedData = {
  data: unknown[];
  total: number;
};

export const PagingAPI = {
  iterateOverPages: async function (
    url: string,
    data: Collection[]
  ): Promise<Collection[]> {
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

  combinePages: (pageData: Collection[]): PagedData => {
    const combined = {
      data: [] as unknown[],
      total: pageData[0].total_count,
    };

    pageData.forEach((page) => {
      combined.data.push(...page.data);
    });

    return combined;
  },
};
