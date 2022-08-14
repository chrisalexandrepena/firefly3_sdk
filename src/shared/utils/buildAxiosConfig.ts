import { AxiosRequestConfig } from "axios";
import Config from "../types/config.types";

export default function (config: Config): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
    },
  };
}
