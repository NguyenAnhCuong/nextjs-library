import queryString from "query-string";

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
  const {
    url,
    method,
    body,
    queryParams,
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  // Build final URL (không mutate url gốc)
  const finalUrl = queryParams
    ? `${url}?${queryString.stringify(queryParams)}`
    : url;

  const options: RequestInit = {
    method,
    headers: new Headers({
      "content-type": "application/json",
      ...headers,
    }),
    body: body ? JSON.stringify(body) : undefined,
    ...nextOption,
  };

  if (useCredentials) {
    options.credentials = "include";
  }

  const res = await fetch(finalUrl, options);

  const json = await res.json();

  if (res.ok) {
    return json as T;
  }

  // Return backend error format vẫn đúng generic T
  return {
    statusCode: res.status,
    message: json?.message ?? "",
    error: json?.error ?? "",
  } as T;
};
