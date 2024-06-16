import { AxiosResponse } from "axios";
import { jotobaApi } from "./ApiConfig";

export const JotobaApi = {
  postWordSearch: async function (japaneseWord: string) {
    const wordSearchBody = {
      query: japaneseWord,
      language: "English",
      no_english: false,
    };

    const response: AxiosResponse = await jotobaApi.request({
      url: "search/words",
      method: "POST",
      data: wordSearchBody,
    });

    return response.data;
  },
};
