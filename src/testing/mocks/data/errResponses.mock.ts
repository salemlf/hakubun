// TODO: instead mock this in an error generator file and then delete
export const perms401Err = {
  error:
    "The personal access token does not grant permission to access this endpoint",
  code: 401,
};

export const unauthorized401 = {
  status: 401,
  statusText: "Unauthorized",
};
