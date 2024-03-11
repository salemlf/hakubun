import { Query, QueryKey } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { displayToast } from "../../components/Toast/Toast.service";

export const determine401Msg = (res: AxiosResponse) => {
  const endpointWithoutPerm =
    "The personal access token does not grant permission to access this endpoint";
  if (res.status === 401 && res.data.error === endpointWithoutPerm) {
    return (
      <p>
        It looks like you don't have permission to access this endpoint. Please
        make sure your API key has <strong>all permissions!</strong>
      </p>
    );
  }

  return res.data.error;
};

export const onQueryError = (
  error: unknown,
  query: Query<unknown, unknown, unknown, QueryKey>
) => {
  // showing errors on background refetches, and always showing when the error is a 401
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      let msg401 = determine401Msg(error.response);
      displayToast({
        toastType: "error",
        title: "Oh no, an API Error!",
        content: msg401,
        timeout: 10000,
      });
    } else if (query.state.data !== undefined) {
      displayToast({
        toastType: "error",
        title: "Oh no, an API Error!",
        content: `${error.message}`,
        timeout: 10000,
      });
    }
  }
};
