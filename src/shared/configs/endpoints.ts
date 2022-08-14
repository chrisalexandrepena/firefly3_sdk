export default {
  users: {
    list: () => "/api/v1/users",
    get: (id: string) => `/api/v1/users/${id}`,
    create: () => "/api/v1/users",
    update: (id: string) => `/api/v1/users/${id}`,
    delete: (id: string) => `/api/v1/users/${id}`,
  },
};
