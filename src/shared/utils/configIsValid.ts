import Config from "../types/config.types";

export default function (config: Config): boolean {
  const accessTokenIsDefined = config.accessToken !== undefined;
  const baseUrlIsDefined = config.baseUrl !== undefined;

  return accessTokenIsDefined && baseUrlIsDefined;
}
