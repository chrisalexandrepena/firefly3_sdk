import { User } from "../users.types";

export default [
  {
    type: "users",
    id: "2",
    attributes: {
      created_at: "2018-09-17T12:46:47+01:00",
      updated_at: "2018-09-17T12:46:47+01:00",
      email: "james@firefly-iii.org",
      blocked: false,
      blocked_code: "email_changed",
      role: "owner",
    },
    links: {
      "0": {
        rel: "self",
        uri: "/OBJECTS/1",
      },
      self: "https://demo.firefly-iii.org/api/v1/OBJECTS/1",
    },
  },
] as User[];
