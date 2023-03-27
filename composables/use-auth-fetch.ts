import { NitroFetchOptions } from 'nitropack';
import { FetchError, FetchRequest, FetchResponse } from 'ofetch';

const instance = $fetch.create({
  credentials: 'include',
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
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return localLogout();

      const { data, error } = await useFetch('/auth/refresh', {
        ...options,
        baseURL: `${useRuntimeConfig().public.auth_backend}/api`,
        method: 'POST',
        body: { refreshToken }
      });

      if (error.value) return localLogout();
      localStorage.setItem('accessToken', (data.value! as any).accessToken);
    }
  }
});

export default async <T>(
  endpoint: FetchRequest,
  options: NitroFetchOptions<string> = {},
  authBackend: boolean = true
): Promise<FetchResponse<T>> => {
  const config = useRuntimeConfig();
  const baseURL = authBackend ? `${config.public.auth_backend}/api` : window.location.origin;

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
