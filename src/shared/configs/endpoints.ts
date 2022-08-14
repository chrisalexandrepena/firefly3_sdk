export default {
  users: {
    list: () => "/api/v1/users",
    get: (id: string) => `/api/v1/users/${id}`,
    create: () => "/api/v1/users",
    update: (id: string) => `/api/v1/users/${id}`,
    delete: (id: string) => `/api/v1/users/${id}`,
  },
  transactions: {
    list: () => "/api/v1/transactions",
    get: (id: string) => `/api/v1/transactions/${id}`,
    create: () => "/api/v1/transactions",
    update: (id: string) => `/api/v1/transactions/${id}`,
    delete: (id: string) => `/api/v1/transactions/${id}`,
  },
};
