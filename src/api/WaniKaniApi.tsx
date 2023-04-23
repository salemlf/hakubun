import { api } from "./ApiConfig";
import { defineCancelApiObject } from "./ApiCancellation";

export const WaniKaniAPI = {
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
};

const cancelApiObject = defineCancelApiObject(WaniKaniAPI);
