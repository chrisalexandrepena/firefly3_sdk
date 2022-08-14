import { FromSchema } from "json-schema-to-ts";
import { validateSchemaInstance } from "../../shared/utils/utils.ajv";

const TransactionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    type: { const: "transactions" },
    id: { type: "string" },
    attributes: {
      type: "object",
      properties: {
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
        user: { type: "string" },
        group_title: { type: "string", nullable: true },
        transactions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              user: { type: "string" },
              transaction_journal_id: { type: "string" },
              type: { type: "string" },
              date: { type: "string", format: "date-time" },
              order: { type: "number", nullable: true },
              currency_id: { type: "string", nullable: true },
              currency_code: { type: "string", nullable: true },
              currency_symbol: { type: "string" },
              currency_name: { type: "string" },
              currency_decimal_places: { type: "number" },
              foreign_currency_id: { type: "string", nullable: true },
              foreign_currency_code: { type: "string", nullable: true },
              foreign_currency_symbol: { type: "string", nullable: true },
              foreign_currency_decimal_places: {
                type: "number",
                nullable: true,
              },
              amount: { type: "string" },
              foreign_amount: { type: "string", nullable: true },
              description: { type: "string" },
              source_id: { type: "string", nullable: true },
              source_name: { type: "string", nullable: true },
              source_iban: { type: "string", nullable: true },
              source_type: { type: "string" },
              destination_id: { type: "string", nullable: true },
              destination_name: { type: "string", nullable: true },
              destination_iban: { type: "string", nullable: true },
              destination_type: { type: "string" },
              budget_id: { type: "string", nullable: true },
              budget_name: { type: "string", nullable: true },
              category_id: { type: "string", nullable: true },
              category_name: { type: "string", nullable: true },
              bill_id: { type: "string", nullable: true },
              bill_name: { type: "string", nullable: true },
              reconciled: { type: "boolean" },
              notes: { type: "string", nullable: true },
              tags: {
                type: "array",
                items: { type: "string" },
                nullable: true,
              },
              internal_reference: { type: "string", nullable: true },
              external_id: { type: "string", nullable: true },
              external_url: { type: "string", nullable: true },
              original_source: { type: "string", nullable: true },
              recurrence_id: { type: "number", nullable: true },
              recurrence_total: { type: "number", nullable: true },
              recurrence_count: { type: "number", nullable: true },
              bunq_payment_id: { type: "string", nullable: true },
              import_hash_v2: { type: "string", nullable: true },
              sepa_cc: { type: "string", nullable: true },
              sepa_ct_op: { type: "string", nullable: true },
              sepa_ct_id: { type: "string", nullable: true },
              sepa_db: { type: "string", nullable: true },
              sepa_country: { type: "string", nullable: true },
              sepa_ep: { type: "string", nullable: true },
              sepa_ci: { type: "string", nullable: true },
              sepa_batch_id: { type: "string", nullable: true },
              interest_date: { type: "string", nullable: true },
              book_date: { type: "string", nullable: true },
              process_date: { type: "string", nullable: true },
              due_date: { type: "string", nullable: true },
              payment_date: { type: "string", nullable: true },
              invoice_date: { type: "string", nullable: true },
              latitude: { type: "number", nullable: true },
              longitude: { type: "number", nullable: true },
              zoom_level: { type: "number", nullable: true },
              has_attachments: { type: "boolean" },
            },
            additionalProperties: false,
            required: [
              "type",
              "date",
              "amount",
              "description",
              "source_id",
              "destination_id",
            ],
          },
        },
      },
      additionalProperties: false,
      required: ["transactions"],
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
  additionalProperties: false,
  required: ["type", "id", "attributes", "links"],
} as const;
export type Transaction = FromSchema<typeof TransactionSchema>;

const TransactionBlueprintSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    error_if_duplicate_hash: { type: "boolean" },
    apply_rules: { type: "boolean" },
    fire_webhooks: { type: "boolean" },
    group_title: { type: "string", nullable: false },
    transactions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: {
            enum: [
              "withdrawal",
              "deposit",
              "transfer",
              "reconciliation",
              "opening balance",
            ],
          },
          date: { type: "string" },
          amount: { type: "string" },
          description: { type: "string" },
          order: { type: "number", nullable: true },
          currency_id: { type: "string", nullable: true },
          currency_code: { type: "string", nullable: true },
          foreign_amount: { type: "string", nullable: true },
          foreign_currency_id: { type: "string", nullable: true },
          foreign_currency_code: { type: "string", nullable: true },
          budget_id: { type: "string", nullable: true },
          category_id: { type: "string", nullable: true },
          category_name: { type: "string", nullable: true },
          source_id: { type: "string", nullable: true },
          source_name: { type: "string", nullable: true },
          destination_id: { type: "string", nullable: true },
          destination_name: { type: "string", nullable: true },
          reconciledtype: { type: "boolean" },
          piggy_bank_idtype: { type: "number" },
          piggy_bank_nametype: { type: "string" },
          bill_id: { type: "string", nullable: true },
          bill_name: { type: "string", nullable: true },
          tags: { type: "array", items: { type: "string" }, nullable: true },
          notes: { type: "string", nullable: true },
          internal_reference: { type: "string", nullable: true },
          external_id: { type: "string", nullable: true },
          external_url: { type: "string", nullable: true },
          bunq_payment_id: { type: "string", nullable: true },
          sepa_cc: { type: "string", nullable: true },
          sepa_ct_op: { type: "string", nullable: true },
          sepa_ct_id: { type: "string", nullable: true },
          sepa_db: { type: "string", nullable: true },
          sepa_country: { type: "string", nullable: true },
          sepa_ep: { type: "string", nullable: true },
          sepa_ci: { type: "string", nullable: true },
          sepa_batch_id: { type: "string", nullable: true },
          interest_date: { type: "string", nullable: true },
          book_date: { type: "string", nullable: true },
          process_date: { type: "string", nullable: true },
          due_date: { type: "string", nullable: true },
          payment_date: { type: "string", nullable: true },
          invoice_date: { type: "string", nullable: true },
        },
        additionalProperties: false,
        required: ["type", "date", "amount", "description"],
      },
    },
  },
  additionalProperties: false,
  required: ["transactions"],
} as const;
export type TransactionBlueprint = FromSchema<
  typeof TransactionBlueprintSchema
>;

export function isTransaction(e: any): e is Transaction {
  const { isValid } = validateSchemaInstance<Transaction>(e, TransactionSchema);
  return isValid;
}

export function isTransactionBlueprint(e: any): e is TransactionBlueprint {
  const { isValid } = validateSchemaInstance<TransactionBlueprint>(
    e,
    TransactionBlueprintSchema
  );
  return isValid;
}

export function areTransactions(e: any[]): e is Transaction[] {
  const { isValid, errors } = validateSchemaInstance<Transaction[]>(e, {
    type: "array",
    items: TransactionSchema,
  } as const);
  return isValid;
}
