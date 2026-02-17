export const loginRequest = async (login: string) => {
  const response = await fetch(`/api/logincheck?login=${login}`);
  const available = response.status === 201;
  return available;
}
