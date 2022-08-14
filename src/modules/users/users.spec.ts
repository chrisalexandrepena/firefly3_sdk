import nock from "nock";
import { createUser, getUser, listUsers } from "./users";
import testUsers from "../../modules/users/__fixtures__/testUsers";
import endpoints from "../../shared/configs/endpoints";
import Config from "../../shared/types/config.types";
import { isUserBlueprint, UserBlueprint } from "./users.types";

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

  it("should query users", async () => {
    fireflyScope.get(endpoints.users.list()).reply(200, { data: testUsers });
    const users = await listUsers(undefined, config);
    expect(users.length).toEqual(1);
    expect(users).toEqual(expect.arrayContaining(testUsers));
  });

  it(`should query the test user with id ${testUsers[0].id}`, async () => {
    const [testUser] = testUsers;
    fireflyScope
      .get(endpoints.users.get(testUser.id))
      .reply(200, { data: testUser });
    const user = await getUser(testUser.id, config);
    expect(user).toEqual(testUser);
  });

  it(`should post a new user`, async () => {
    const userToCreate: UserBlueprint = {
      email: "test@email.com",
    };
    fireflyScope.post(endpoints.users.create()).reply(function (uri, body) {
      const success = isUserBlueprint(body);
      return [success ? 200 : 422, { data: testUsers[0] }];
    });
    let errors = undefined;
    try {
      await createUser(userToCreate, config);
    } catch (e) {
      errors = e;
    } finally {
      expect(errors).not.toBeDefined();
    }
  });
});
