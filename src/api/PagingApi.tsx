import { pagingApi } from "./ApiConfig";
import { defineCancelApiObject } from "./ApiCancellation";

export const PagingAPI = {
  iterateOverPages: async function (
    url: any,
    data: any[],
    cancel = false
  ): Promise<any> {
    if (!url) {
      return data;
    }

    const response = await pagingApi.request({
      url: url,
      method: "GET",
      signal: cancel
        ? (cancelApiObject as any)[
            this.iterateOverPages.name
          ].handleRequestCancellation().signal
        : undefined,
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

const cancelApiObject = defineCancelApiObject(PagingAPI);
