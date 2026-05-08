const defaultBaseUrl = 'http://localhost:8080/api'

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ?? defaultBaseUrl

export const getJson = async <ResponseBody>(
  path: string,
  init?: RequestInit,
) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json() as Promise<ResponseBody>
}
