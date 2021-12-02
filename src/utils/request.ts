import axios from "axios";
import { getHeaders } from "./helpers";
import { API_URL, API_KEY } from "../config";

const defaultHeader = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

export const request = (type: string) => {
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */

  const defaultOptions: any = {
    headers: {
      ...defaultHeader,
      ...getHeaders(type),
    },
  };

  const axiosApi = axios.create({
    baseURL: API_URL,
    ...defaultOptions,
  });

  // error will be showed in catch block instead of appeared in then
  axiosApi.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Handle logout when the token is wrong

      const errorResponse =
        error && error.response
          ? error.response
          : { data: { status: "SOMETHING_WENT_WRONG" } };
      return Promise.reject(errorResponse);
    }
  );

  return axiosApi;
};

export default request;
