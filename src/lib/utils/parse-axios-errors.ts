export function parseAxiosError(error: any) {
  const { response } = error ?? {};
  const { data, status, statusText } = response ?? {};
  return { data, status, statusText };
}
