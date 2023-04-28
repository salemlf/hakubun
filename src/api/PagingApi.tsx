import { pagingApi } from "./ApiConfig";

export const PagingAPI = {
  iterateOverPages: async function (url: any, data: any[]): Promise<any> {
    if (!url) {
      return data;
    }

    const response = await pagingApi.request({
      url: url,
      method: "GET",
    });

    data = data.concat(response.data);
    let nextPgURL = response.data.pages.next_url;

    return this.iterateOverPages(nextPgURL, data);
  },

  combinePages: (pageData: any[]) => {
    let combined = {
      data: Array(),
      total: pageData[0].total_count,
    };

    pageData.forEach((page) => {
      combined.data.push(...page.data);
    });

    return combined;
  },
};
