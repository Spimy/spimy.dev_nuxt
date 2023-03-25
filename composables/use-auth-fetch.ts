import { NitroFetchOptions } from 'nitropack';
import { FetchError, FetchRequest, FetchResponse } from 'ofetch';

const instance = $fetch.create({
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  onRequest: async ({ options }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    };
  },
  onResponseError: async ({ response, options }) => {
    if (response?.status === 401) {
      const { data, error } = await useFetch('/refresh', {
        ...options,
        method: 'POST',
        body: { refreshToken: localStorage.getItem('refreshToken') }
      });

      if (error.value) return localLogout();
      localStorage.setItem('accessToken', (data.value! as any).accessToken);
    }
  }
});

export default async <T>(
  endpoint: FetchRequest,
  options: NitroFetchOptions<string> = {}
): Promise<FetchResponse<T>> => {
  const config = useRuntimeConfig();
  const baseURL = `${config.public.auth_backend}/api/auth`;

  options = { ...options, baseURL };

  return await instance
    .raw(endpoint, options)
    .then((response) => response as FetchResponse<T>)
    .catch(async (error: FetchError) => {
      if (error.response?.status === 401 && localStorage.getItem('refreshToken')) {
        const response = await instance.raw(endpoint, options);
        return response as FetchResponse<T>;
      }

      return error.response as FetchResponse<T>;
    });
};
