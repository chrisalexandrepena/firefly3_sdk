import { FromSchema } from "json-schema-to-ts";
import { validateSchemaInstance } from "../../shared/utils/utils.ajv";

const UserSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    type: { const: "users" },
    id: { type: "string" },
    attributes: {
      type: "object",
      properties: {
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
        email: { type: "string", format: "email" },
        blocked: { type: "boolean" },
        blocked_code: { type: "string", nullable: true },
        role: { type: "string", nullable: true },
      },
      additionalProperties: false,
      required: ["email"],
    },
    links: {
      type: "object",
      properties: {
        0: {
          type: "object",
          properties: {
            rel: { type: "string" },
            uri: { type: "string" },
          },
          additionalProperties: false,
          required: [],
        },
        self: { type: "string", format: "uri" },
      },
    },
  },
} as const;

export type User = FromSchema<typeof UserSchema>;

export type UserBlueprint = {
  email: string;
  blocked?: boolean;
  blocked_code?: string | null;
  role?: string | null;
};

export function isUser(e: any): e is User {
  const { isValid } = validateSchemaInstance<User>(e, UserSchema);
  return isValid;
}

export function areUsers(e: any[]): e is User[] {
  const { isValid, errors } = validateSchemaInstance<User[]>(e, {
    type: "array",
    items: UserSchema,
  } as const);
  return isValid;
}
