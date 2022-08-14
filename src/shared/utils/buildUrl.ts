import { URL } from "url";

export default function (
  baseUrl: string,
  path: string,
  params?: { [key: string]: string }
): string {
  const url = new URL(path, baseUrl);
  if (params !== undefined) {
    url.search = Object.entries(params)
      .map((e) => e.join("="))
      .join("&");
  }
  return url.href;
}
