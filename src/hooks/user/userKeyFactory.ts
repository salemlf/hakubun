export const userKeys = {
  all: ["user"] as const,
  userInfo: () => [...userKeys.all, "-info"] as const,
};
