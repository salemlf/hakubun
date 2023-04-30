import { api, baseUrl } from "./ApiConfig";
import { PagingAPI } from "./PagingApi";
import { AxiosResponse } from "axios";

export const WaniKaniAPI = {
  pages: Array(),
  subjects: [],

  getReviews: async function () {
    const response = await api.request({
      url: "assignments?immediately_available_for_review",
      method: "GET",
    });

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

  getRadicalSubjectsByLevel: async function (level: number) {
    let url = `${baseUrl}subjects?levels=${level}&types=radical`;

    let radicals = await PagingAPI.iterateOverPages(url, []);
    let combined = PagingAPI.combinePages(radicals);

    return combined;
  },

  getKanjiSubjectsByLevel: async function (level: number) {
    let url = `${baseUrl}subjects?levels=${level}&types=kanji`;

    let kanji = await PagingAPI.iterateOverPages(url, []);
    let combined = PagingAPI.combinePages(kanji);

    return combined;
  },

  getRadicalAssignmentsByLvl: async function (level: number) {
    let url = `${baseUrl}assignments?levels=${level}&types=radical`;

    let radicals = await PagingAPI.iterateOverPages(url, []);
    let radicalsOnLvl = PagingAPI.combinePages(radicals);

    return radicalsOnLvl;
  },

  getKanjiAssignmentsByLvl: async function (level: number) {
    let url = `${baseUrl}assignments?levels=${level}&types=kanji`;

    let kanji = await PagingAPI.iterateOverPages(url, []);
    let kanjiOnLvl = PagingAPI.combinePages(kanji);

    console.log("kanjiOnLvl: ", kanjiOnLvl);
    return kanjiOnLvl;
  },
};
