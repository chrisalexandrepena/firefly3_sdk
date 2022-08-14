import { URL } from "url";

export default function (baseUrl: string, path: string): string {
  const url = new URL(path, baseUrl);
  return url.href;
}
