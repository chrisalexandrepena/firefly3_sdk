import Config from "../types/config.types";
import { getUser, listUsers } from "../../modules/users/users";
import nock from "nock";
import endpoints from "../configs/endpoints";
import testUsers from "./__fixtures__/testUsers";

describe("Unit tests for users endoints", () => {
  const baseConfig: Config = {
    accessToken: "AccessToken",
    baseUrl: "https://www.firefly.com",
  };
  let config: Config;
  let fireflyScope: nock.Scope;

  beforeEach(() => {
    config = { ...baseConfig };
    nock.cleanAll();
    fireflyScope = nock(config.baseUrl);
  });

  it("should query users and receive the Firefly access token", async () => {
    let receivedToken: string | undefined = undefined;
    fireflyScope.get(endpoints.users.list()).reply(function () {
      receivedToken = this.req.headers.authorization;
      return [200, { data: testUsers }];
    });
    const users = await listUsers(config);
    expect(users.length).toEqual(1);
    expect(receivedToken).toEqual(`Bearer ${config.accessToken}`);
  });
});
