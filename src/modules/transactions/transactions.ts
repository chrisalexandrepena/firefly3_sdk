import Config from "../../shared/types/config.types";
import {
  areTransactions,
  isTransaction,
  Transaction,
  TransactionBlueprint,
} from "./transactions.types";
import {
  InvalidApiResponse,
  InvalidConfig,
} from "../../shared/errors/commonErrors";
import configIsValid from "../../shared/utils/configIsValid";
import {
  AvailableMethods,
  callFireflyApi,
} from "../../shared/utils/callFireflyApi";
import endpoints from "../../shared/configs/endpoints";

type TransactionTypeFilter =
  | "all"
  | "withdrawal"
  | "withdrawals"
  | "expense"
  | "deposit"
  | "deposits"
  | "income"
  | "transfer"
  | "transfers"
  | "opening_balance"
  | "reconciliation"
  | "special"
  | "specials"
  | "default";

export async function listTransactions(
  options:
    | {
        page?: string;
        start?: string;
        end?: string;
        type?: TransactionTypeFilter;
      }
    | undefined,
  config: Config
): Promise<Transaction[]> {
  if (!configIsValid(config)) throw new InvalidConfig();
  const transactions = await callFireflyApi<Transaction[]>(
    AvailableMethods.GET,
    endpoints.transactions.list(),
    undefined,
    options,
    config
  );
  if (areTransactions(transactions)) return transactions;
  else
    throw new InvalidApiResponse(
      "Firefly api return unknown Transaction[] format"
    );
}

export async function getTransaction(
  transactionId: string,
  config: Config
): Promise<Transaction> {
  if (!configIsValid(config)) throw new InvalidConfig();
  const transaction = await callFireflyApi<Transaction>(
    AvailableMethods.GET,
    endpoints.transactions.get(transactionId),
    undefined,
    undefined,
    config
  );
  if (isTransaction(transaction)) return transaction;
  else
    throw new InvalidApiResponse(
      "Firefly api return unknown Transaction format"
    );
}

export async function createTransaction(
  transaction: TransactionBlueprint,
  config: Config
): Promise<Transaction> {
  if (!configIsValid(config)) throw new InvalidConfig();
  const createdTransaction = await callFireflyApi<Transaction>(
    AvailableMethods.POST,
    endpoints.transactions.create(),
    transaction,
    undefined,
    config
  );
  if (isTransaction(createdTransaction)) return createdTransaction;
  else
    throw new InvalidApiResponse(
      "Firefly api return unknown Transaction format"
    );
}

export async function updateTransaction(
  transactionId: string,
  transaction: TransactionBlueprint,
  config: Config
): Promise<Transaction> {
  if (!configIsValid(config)) throw new InvalidConfig();
  const updatedTransaction = await callFireflyApi<Transaction>(
    AvailableMethods.PUT,
    endpoints.transactions.update(transactionId),
    transaction,
    undefined,
    config
  );
  if (isTransaction(updatedTransaction)) return updatedTransaction;
  else
    throw new InvalidApiResponse(
      "Firefly api return unknown Transaction format"
    );
}

export async function deleteTransaction(
  transactionId: string,
  config: Config
): Promise<void> {
  if (!configIsValid(config)) throw new InvalidConfig();
  await callFireflyApi<Transaction>(
    AvailableMethods.DELETE,
    endpoints.transactions.delete(transactionId),
    undefined,
    undefined,
    config
  );
}
