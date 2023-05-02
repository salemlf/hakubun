import { api, baseUrl } from "./ApiConfig";
import { PagingAPI } from "./PagingApi";
import { AxiosResponse } from "axios";

export const WaniKaniAPI = {
  pages: Array(),
  subjects: [],

  getReviews: async function () {
    let url = `${baseUrl}assignments?immediately_available_for_review`;

    let reviews = await PagingAPI.iterateOverPages(url, []);
    let reviewsCombined = PagingAPI.combinePages(reviews);

    return reviewsCombined;
  },
  getLessons: async function () {
    let url = `${baseUrl}assignments?immediately_available_for_lessons`;

    let lessons = await PagingAPI.iterateOverPages(url, []);
    let lessonsCombined = PagingAPI.combinePages(lessons);

    return lessonsCombined;
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

    return kanjiCombined;
  },

  getRadicalAssignmentsByLvl: async function (level: number) {
    let url = `${baseUrl}assignments?levels=${level}&types=radical`;

    let radicals = await PagingAPI.iterateOverPages(url, []);
    let radicalsCombined = PagingAPI.combinePages(radicals);

    return radicalsCombined;
  },

  getKanjiAssignmentsByLvl: async function (level: number) {
    let url = `${baseUrl}assignments?levels=${level}&types=kanji`;

    let kanji = await PagingAPI.iterateOverPages(url, []);
    let kanjiCombined = PagingAPI.combinePages(kanji);

    return kanjiCombined;
  },
};
