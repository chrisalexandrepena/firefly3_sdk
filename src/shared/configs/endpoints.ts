export default {
  users: {
    list: () => "/api/v1/users",
    get: (id: string) => `/api/v1/users/${id}`,
    create: () => "/api/v1/users",
  },
};
