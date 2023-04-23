import { api } from "./ApiConfig";
import { defineCancelApiObject } from "./ApiCancellation";

// TODO: make sure to account for paging
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
    let url = `subjects?levels=${level}`;

    // *testing
    console.log("🚀 ~ file: WaniKaniApi.tsx:39 ~ url:", url);
    // *testing

    // TODO: delete below once paging is set up correctly
    const response = await api.request({
      url: url,
      method: "GET",
      signal: cancel
        ? (cancelApiObject as any)[
            this.getLessons.name
          ].handleRequestCancellation().signal
        : undefined,
    });

    return response.data;

    // TODO: uncomment below
    // WaniKaniAPI.iterateOverPages(url, 1, level);
    // let subjects = WaniKaniAPI.combinePages();

    // return subjects;
  },

  iterateOverPages: async function (
    url: string,
    pgNum: number,
    level = undefined,
    cancel = false
  ) {
    // removing first part of URL to account for recursive calls
    if (!level) {
      url = url.replace("https://api.wanikani.com/v2/", "");
    }

    const response = await api.request({
      url: url,
      method: "GET",
      signal: cancel
        ? (cancelApiObject as any)[
            this.getLessons.name
          ].handleRequestCancellation().signal
        : undefined,
    });

    // TODO: make sure pushing page data correctly
    WaniKaniAPI.pages.push(response.data);
    let nextPgURL = response.data.pages.next_url;

    // TODO: remove first part of URL (otherwise base URL will be shown twice)
    if (nextPgURL) {
      WaniKaniAPI.iterateOverPages(nextPgURL, pgNum + 1);
    }

    return response.data;
  },

  // TODO: actually finish
  combinePages: () => {
    // for page in pages:
    // for entry in page["data"]:
    //     combined.append(entry)

    return WaniKaniAPI.subjects;
  },
};

const cancelApiObject = defineCancelApiObject(WaniKaniAPI);
