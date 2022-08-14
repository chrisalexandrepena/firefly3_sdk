import nock from "nock";
import {
  createTransaction,
  getTransaction,
  listTransactions,
} from "./transactions";
import endpoints from "../../shared/configs/endpoints";
import Config from "../../shared/types/config.types";
import testTransactions from "./__fixtures__/testTransactions";
import {
  isTransactionBlueprint,
  TransactionBlueprint,
} from "./transactions.types";

describe("Unit tests for transactions endoints", () => {
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

  it("should query transactions", async () => {
    fireflyScope
      .get(endpoints.transactions.list())
      .reply(200, { data: testTransactions });
    const transactions = await listTransactions(undefined, config);
    expect(transactions.length).toEqual(1);
    expect(transactions).toEqual(expect.arrayContaining(testTransactions));
  });

  it(`should query the test transaction with id ${testTransactions[0].id}`, async () => {
    const [testTransaction] = testTransactions;
    fireflyScope
      .get(endpoints.transactions.get(testTransaction.id))
      .reply(200, { data: testTransaction });
    const transaction = await getTransaction(testTransaction.id, config);
    expect(transaction).toEqual(testTransaction);
  });

  it(`should post a new transaction`, async () => {
    const transactionToCreate: TransactionBlueprint = {
      transactions: [
        {
          type: "withdrawal",
          date: "2022-08-14T18:14:41.579Z",
          amount: "123,45",
          description: "Vegetables",
        },
      ],
    };
    fireflyScope
      .post(endpoints.transactions.create())
      .reply(function (uri, body) {
        const success = isTransactionBlueprint(body);
        return [success ? 200 : 422, { data: testTransactions[0] }];
      });
    let errors = undefined;
    try {
      await createTransaction(transactionToCreate, config);
    } catch (e) {
      errors = e;
    } finally {
      expect(errors).not.toBeDefined();
    }
  });
});
