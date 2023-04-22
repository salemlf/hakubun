export function defineCancelApiObject(apiObject: any) {
  const cancelApiObject = {};

  Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
    const cancellationControllerObject = {
      controller: undefined,
    };

    (cancelApiObject as any)[apiPropertyName] = {
      handleRequestCancellation: () => {
        if (cancellationControllerObject.controller) {
          (cancellationControllerObject as any)["controller"].abort();
        }

        (cancellationControllerObject as any)["controller"] =
          new AbortController();

        return cancellationControllerObject.controller;
      },
    };
  });

  return cancelApiObject;
}
