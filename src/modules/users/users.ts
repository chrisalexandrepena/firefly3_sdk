import { areUsers, isUser, User, UserBlueprint } from "./users.types";
import configIsValid from "../../shared/utils/configIsValid";
import {
  InvalidApiResponse,
  InvalidConfig,
} from "../../shared/errors/commonErrors";
import Config from "../../shared/types/config.types";
import {
  AvailableMethods,
  callFireflyApi,
} from "../../shared/utils/callFireflyApi";
import endpoints from "../../shared/configs/endpoints";

export async function listUsers(
  options: { page?: string } | undefined,
  config: Config
): Promise<User[]> {
  if (!configIsValid(config)) throw new InvalidConfig();
  const users = await callFireflyApi<User[]>(
    AvailableMethods.GET,
    endpoints.users.list(),
    undefined,
    options,
    config
  );
  if (areUsers(users)) return users;
  else throw new InvalidApiResponse("Firefly api return unknown User[] format");
}

export async function getUser(userId: string, config: Config): Promise<User> {
  if (!configIsValid(config)) throw new InvalidConfig();
  const user = await callFireflyApi<User>(
    AvailableMethods.GET,
    endpoints.users.get(userId),
    undefined,
    undefined,
    config
  );
  if (isUser(user)) return user;
  else throw new InvalidApiResponse("Firefly api return unknown User format");
}

export async function createUser(
  user: UserBlueprint,
  config: Config
): Promise<User> {
  if (!configIsValid(config)) throw new InvalidConfig();
  const createdUser = await callFireflyApi<User>(
    AvailableMethods.POST,
    endpoints.users.create(),
    user,
    undefined,
    config
  );
  if (isUser(createdUser)) return createdUser;
  else throw new InvalidApiResponse("Firefly api return unknown User format");
}

export async function updateUser(
  userId: string,
  user: UserBlueprint,
  config: Config
): Promise<User> {
  if (!configIsValid(config)) throw new InvalidConfig();
  const updatedUser = await callFireflyApi<User>(
    AvailableMethods.PUT,
    endpoints.users.update(userId),
    user,
    undefined,
    config
  );
  if (isUser(updatedUser)) return updatedUser;
  else throw new InvalidApiResponse("Firefly api return unknown User format");
}

export async function deleteUser(
  userId: string,
  config: Config
): Promise<void> {
  if (!configIsValid(config)) throw new InvalidConfig();
  await callFireflyApi<User>(
    AvailableMethods.DELETE,
    endpoints.users.delete(userId),
    undefined,
    undefined,
    config
  );
}
