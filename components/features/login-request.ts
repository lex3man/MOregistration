export const loginRequest = async (login: string) => {
  const response = await fetch(`/api/logincheck?login=${login}`);
  if (response.status === 202) {
    console.log(await response.json())
  }
  const available = response.status === 201;
  return available;
}
