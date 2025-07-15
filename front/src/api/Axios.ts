import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Création de l'instance Axios
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Ajout du token Authorization à chaque requête si présent
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Fonction pour refresh le token
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    Deconnection();
    return null;
  }
  try {
    const response = await api.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    }
    Deconnection();
    return null;
  } catch (error) {
    Deconnection();
    return null;
  }
}

// Interceptor de réponse pour gérer le refresh automatique
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      UserIsLogged()
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } else {
        popup("Déconnexion forcée");
        Deconnection();
      }
    }
    if (error.response && error.response.status !== 401) {
      alert(error.code + " " + error.response.statusText);
      if (error.response.data && error.response.data.message) {
        popup(error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

// Fonction utilitaire pour requêtes GET ou POST (body optionnel)
async function fetchApi<T = any>(
  endpoint: string,
  options?: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: any,
    config?: AxiosRequestConfig
  }
): Promise<AxiosResponse<T>> {
  const { method = 'GET', body, config } = options || {};

  if (method === 'GET') {
    return api.get<T>(endpoint, config);
  }
  return api.request<T>({
    url: endpoint,
    method,
    data: body,
    ...config,
  });
}

export function UserIsLogged(): boolean {
  return !!(localStorage.getItem("accessToken") || localStorage.getItem("refreshToken"));
}

export async function GetApi(url: string, param?: object) {
  try {
    const queryString = objectToQueryString(param);
    const res = await fetchApi(url + queryString);
    return res.data;
  } catch (error) {
    alert(error);
  }
}

export async function PostApi(url: string, body?: object, param?: object) {
  const queryString = objectToQueryString(param);
  return (await fetchApi(url + queryString, { method: 'POST', body })).data;
}

export async function PatchApi(url: string, body?: object, param?: object) {
  const queryString = objectToQueryString(param);
  return (await fetchApi(url + queryString, { method: 'PATCH', body })).data;
}

export async function PutApi(url: string, body?: object, param?: object) {
  const queryString = objectToQueryString(param);
  return (await fetchApi(url + queryString, { method: 'PUT', body })).data;
}

export async function DeleteApi(url: string, body?: object, param?: object) {
  const queryString = objectToQueryString(param);
  return (await fetchApi(url + queryString, { method: 'DELETE', body })).data;
}


export function Deconnection() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem("user");
}


function popup(msg: string) {
  alert(msg);
}
function objectToQueryString(params?: object) {
  if (!params) return '';
  return (
    '?' +
    Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  );
}
