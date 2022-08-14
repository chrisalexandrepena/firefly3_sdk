import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import { JSONSchema } from "json-schema-to-ts";

export function validateSchemaInstance<T>(instance: unknown, schema: JSONSchema): { isValid: true; errors: ErrorObject[]; instance: T };
export function validateSchemaInstance(instance: unknown, schema: JSONSchema): { isValid: false; errors: ErrorObject[] };
export function validateSchemaInstance<T>(instance: unknown, schema: JSONSchema): { isValid: boolean; errors: ErrorObject[]; instance?: T } {
    const ajv = new Ajv({
        allErrors: true,
        verbose: true,
        allowDate: true,
        removeAdditional: false,
        useDefaults: "empty",
    });
    addFormats(ajv);
    const valid = ajv.compile<T>(schema);

    const isValid = valid(instance);
    const errors = valid.errors;

    return isValid
        ? { isValid, errors: errors ?? [], instance: instance }
        : {
              isValid,
              errors: errors ?? [],
              instance: undefined,
          };
}
