import { getDataFromLocalStorage } from "@/lib/utils";
import { ApiResponse, create } from "apisauce";
import { AxiosRequestConfig } from "axios";

export const BASE_URL = "https://server.proposal-generator.abdullahis.live";
// export const BASE_URL = "http://localhost:8080";

const instance = create({
  baseURL: BASE_URL,
});

interface Request {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: object | FormData;
  params?: object;
  convertKeys?: boolean;
  withAuthToken?: boolean;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

export async function request({
  url,
  method = "GET",
  data,
  withAuthToken,
}: Request) {
  const options: AxiosRequestConfig = {
    method,
    url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.data = data;
  }

  if (withAuthToken) {
    const token = getDataFromLocalStorage().token;
    if (token) {
      options.headers!.Authorization = "Bearer " + token;
    }
  }

  const fetchResponse: ApiResponse<any> = await instance.any(options);
  if (fetchResponse.problem) {
    console.log("api error =>", fetchResponse.data);
    return Promise.reject(fetchResponse.data);
  }
  return fetchResponse.data;
}
