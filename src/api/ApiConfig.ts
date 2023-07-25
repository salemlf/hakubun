import axios from "axios";

export const baseUrl = "https://api.wanikani.com/v2/";

export const api = axios.create({
  baseURL: baseUrl,
});

export const pagingApi = axios.create();

const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  if (error.code === "ERR_CANCELED") {
    // *testing
    console.log("API canceled");
    // *testing
    return Promise.resolve();
  }

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

pagingApi.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
