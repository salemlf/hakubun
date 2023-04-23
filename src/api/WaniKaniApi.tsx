import { api, baseUrl } from "./ApiConfig";
import { defineCancelApiObject } from "./ApiCancellation";
import { PagingAPI } from "./PagingApi";

export const WaniKaniAPI = {
  pages: Array(),
  subjects: [],

  getReviews: async function (cancel = false) {
    const response = await api.request({
      url: "assignments?immediately_available_for_review",
      method: "GET",
      signal: cancel
        ? (cancelApiObject as any)[
            this.getReviews.name
          ].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },
  getLessons: async function (cancel = false) {
    const response = await api.request({
      url: "assignments?immediately_available_for_lessons",
      method: "GET",
      signal: cancel
        ? (cancelApiObject as any)[
            this.getLessons.name
          ].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;
  },

  getSubjectsByLevel: async function (level: any, cancel = false) {
    let url = `${baseUrl}subjects?levels=${level}`;

    let subjects = await PagingAPI.iterateOverPages(url, []);
    let combined = PagingAPI.combinePages(subjects);

    return combined;
  },
};

const cancelApiObject = defineCancelApiObject(WaniKaniAPI);
