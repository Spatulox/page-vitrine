import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Création de l'instance Axios
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

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

export async function GetApi(url: string){
    return (await fetchApi(url)).data
}

export async function PostApi(url: string){
    return (await fetchApi(url, { method: 'POST', body: { name: 'test' } })).data;
}

export async function PacthApi(url: string){
    return (await fetchApi(url, { method: 'PATCH', body: { name: 'test' } })).data;
}

export async function PutApi(url: string){
    return (await fetchApi(url, { method: 'PUT', body: { name: 'test' } })).data;
}

export async function DeleteApi(url: string){
    return (await fetchApi(url, { method: 'DELETE', body: { name: 'test' } })).data;
}
