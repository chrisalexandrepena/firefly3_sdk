import { AxiosResponse } from "axios";
import axios from "axios";
import Config from "../types/config.types";
import buildUrl from "./buildUrl";
import buildAxiosConfig from "./buildAxiosConfig";

export enum AvailableMethods {
  "GET",
  "POST",
  "PUT",
  "DELETE",
}

export async function callFireflyApi<T>(
  method: AvailableMethods.POST | AvailableMethods.PUT,
  endpoint: string,
  body: any,
  config: Config
): Promise<T>;
export async function callFireflyApi<T>(
  method: AvailableMethods.GET | AvailableMethods.DELETE,
  endpoint: string,
  body: undefined,
  config: Config
): Promise<T>;
export async function callFireflyApi<T>(
  method: AvailableMethods,
  endpoint: string,
  body: any | undefined,
  config: Config
): Promise<T> {
  const uri = buildUrl(config.baseUrl, endpoint);
  const axiosConfig =
    body === undefined
      ? buildAxiosConfig(config)
      : { ...buildAxiosConfig(config), ...{ data: body } };
  let axiosResult: AxiosResponse<{ data: T }>;
  switch (method) {
    case AvailableMethods.GET:
      axiosResult = await axios.get<{ data: T }>(uri, axiosConfig);
      break;
    case AvailableMethods.PUT:
      axiosResult = await axios.put<{ data: T }>(uri, axiosConfig);
      break;
    case AvailableMethods.POST:
      axiosResult = await axios.post<{ data: T }>(uri, axiosConfig);
      break;
    case AvailableMethods.DELETE:
      axiosResult = await axios.delete<{ data: T }>(uri, axiosConfig);
      break;
  }
  return axiosResult.data.data;
}
