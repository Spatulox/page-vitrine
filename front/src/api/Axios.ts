import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Création de l'instance Axios
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
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

export async function GetApi(url: string) {
  try {
    const res = await fetchApi(url);
    return res.data;
  } catch (error) {
    alert(error);
  }
}

export async function PostApi(url: string, body: object) {
  return (await fetchApi(url, { method: 'POST', body })).data;
}

export async function PacthApi(url: string, body: object) {
  return (await fetchApi(url, { method: 'PATCH', body })).data;
}

export async function PutApi(url: string, body: object) {
  return (await fetchApi(url, { method: 'PUT', body })).data;
}

export async function DeleteApi(url: string, body: object) {
  return (await fetchApi(url, { method: 'DELETE', body })).data;
}

// Fonctions utilitaires à adapter selon ton projet
export function Deconnection() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // Redirige ou autre action de déconnexion ici
}
function popup(msg: string) {
  alert(msg);
}