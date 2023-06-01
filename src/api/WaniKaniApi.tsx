import { api, baseUrl } from "./ApiConfig";
import { PagingAPI } from "./PagingApi";
import { AxiosResponse } from "axios";

import { SrsLevelName } from "../types/MiscTypes";

import { getSrsLvlBySrsName } from "../services/MiscService";

export const WaniKaniAPI = {
  pages: Array(),
  subjects: [],

  getUser: async function () {
    let url = `${baseUrl}user`;

    const response: AxiosResponse = await api.request({
      url: url,
      method: "GET",
    });

    console.log("🚀 ~ file: WaniKaniApi.tsx:23 ~ response:", response);
    return response.data;
  },

  getReviews: async function () {
    let url = `${baseUrl}assignments?immediately_available_for_review`;

    let reviews = await PagingAPI.iterateOverPages(url, []);
    let reviewsCombined = PagingAPI.combinePages(reviews);

    return reviewsCombined;
  },
  getNumReviews: async function () {
    let url = `${baseUrl}assignments?immediately_available_for_review`;

    const response: AxiosResponse = await api.request({
      url: url,
      method: "GET",
    });

    let numReviews = response.data.total_count;
    return numReviews;
  },

  getLessons: async function () {
    let url = `${baseUrl}assignments?immediately_available_for_lessons`;

    let lessons = await PagingAPI.iterateOverPages(url, []);
    let lessonsCombined = PagingAPI.combinePages(lessons);

    return lessonsCombined;
  },

  getNumLessons: async function () {
    let url = `${baseUrl}assignments?immediately_available_for_lessons`;

    const response: AxiosResponse = await api.request({
      url: url,
      method: "GET",
    });

    let numLessons = response.data.total_count;
    return numLessons;
  },

  getSubjectsByLevel: async function (level: number) {
    let url = `${baseUrl}subjects?levels=${level}`;

    let subjects = await PagingAPI.iterateOverPages(url, []);
    let subjectsCombined = PagingAPI.combinePages(subjects);

    return subjectsCombined;
  },

  getRadicalSubjectsByLevel: async function (level: number) {
    let url = `${baseUrl}subjects?levels=${level}&types=radical`;

    let radicals = await PagingAPI.iterateOverPages(url, []);
    let radicalsCombined = PagingAPI.combinePages(radicals);

    return radicalsCombined;
  },

  getKanjiSubjectsByLevel: async function (level: number) {
    let url = `${baseUrl}subjects?levels=${level}&types=kanji`;

    let kanji = await PagingAPI.iterateOverPages(url, []);
    let kanjiCombined = PagingAPI.combinePages(kanji);
    console.log(
      "🚀 ~ file: WaniKaniApi.tsx:89 ~ getKanjiSubjectsByLevel:",
      kanjiCombined
    );

    return kanjiCombined;
  },

  getSubjectByID: async function (id: number) {
    console.log("🚀 ~ file: WaniKaniApi.tsx:58 ~ id:", id);

    let url = `${baseUrl}subjects/${id}`;

    const response: AxiosResponse = await api.request({
      url: url,
      method: "GET",
    });

    return response.data;
  },

  getSubjectsBySubjIDs: async function (ids: number[]) {
    console.log(
      "🚀 ~ file: WaniKaniApi.tsx:111 ~ getSubjectsBySubjIDs ~ ids:",
      ids
    );

    let url = `${baseUrl}subjects?ids=${ids}`;

    const response: AxiosResponse = await api.request({
      url: url,
      method: "GET",
    });

    return response.data;
  },

  getAssignmentsBySubjIDs: async function (id: number[]) {
    let url = `${baseUrl}assignments?subject_ids=${id}`;

    const response: AxiosResponse = await api.request({
      url: url,
      method: "GET",
    });

    return response.data;
  },

  getRadicalAssignmentsByLvl: async function (level: number) {
    let url = `${baseUrl}assignments?levels=${level}&subject_types=radical`;

    let radicals = await PagingAPI.iterateOverPages(url, []);
    let radicalsCombined = PagingAPI.combinePages(radicals);

    return radicalsCombined;
  },

  getKanjiAssignmentsByLvl: async function (level: number) {
    let url = `${baseUrl}assignments?levels=${level}&subject_types=kanji`;

    let kanji = await PagingAPI.iterateOverPages(url, []);
    let kanjiCombined = PagingAPI.combinePages(kanji);
    console.log(
      "🚀 ~ file: WaniKaniApi.tsx:135 ~ getKanjiAssignmentsByLvl:",
      kanjiCombined
    );

    return kanjiCombined;
  },

  getAssignmentsByStage: async function (srsLvl: SrsLevelName) {
    let lvlRange = getSrsLvlBySrsName(srsLvl);
    let url = `${baseUrl}assignments?srs_stages=${lvlRange}&started=true`;

    let assignments = await PagingAPI.iterateOverPages(url, []);
    let assignmentsCombined = PagingAPI.combinePages(assignments);

    return assignmentsCombined;
  },
};
