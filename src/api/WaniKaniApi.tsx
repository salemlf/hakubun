import { api, baseUrl } from "./ApiConfig";
import { defineCancelApiObject } from "./ApiCancellation";
import { PagingAPI } from "./PagingApi";
import { AxiosResponse } from "axios";
import { Subject } from "../types/Subject";

export const WaniKaniAPI = {
  pages: Array(),
  subjects: [],

  getReviews: async function () {
    const response = await api.request({
      url: "assignments?immediately_available_for_review",
      method: "GET",
    });

    console.log("response.data: ", response.data);
    return response.data;
  },
  getLessons: async function () {
    const response: AxiosResponse = await api.request({
      url: "assignments?immediately_available_for_lessons",
      method: "GET",
    });

    return response.data;
  },

  getSubjectsByLevel: async function (level: number) {
    let url = `${baseUrl}subjects?levels=${level}`;

    let subjects = await PagingAPI.iterateOverPages(url, []);
    let combined = PagingAPI.combinePages(subjects);

    return combined;
  },
};

// const cancelApiObject = defineCancelApiObject(WaniKaniAPI);
