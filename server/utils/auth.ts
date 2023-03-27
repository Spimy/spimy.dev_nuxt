import { FetchResponse, FetchError } from 'ofetch';
import { AuthCheckResponse } from '@/utils/types/responses';

export const checkServerAuthentication = async (authHeader: string) => {
  const responseHandler = (response?: FetchResponse<AuthCheckResponse>) => {
    return { isAuthenticated: response?.status === 200, data: response?._data };
  };

  const config = useRuntimeConfig();
  return await $fetch
    .raw<AuthCheckResponse>(`${config.public.auth_backend}/api/auth/check`, {
      headers: { Authorization: authHeader || '' }
    })
    .then(responseHandler)
    .catch((error: FetchError) => responseHandler(error.response));
};
