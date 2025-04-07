import axios from "axios";
import { AppConfigs } from "./app-configs";

/*
 * Axios é uma biblioteca que permite fazer requisições HTTP (GET, POST, etc.)
 * de forma mais simples do que a função fetch do JavaScript.
 * Nesse caso, estamos usando ela para fazer requisições para a nossa API.
 *
 * Basicamente, estamos criando uma instância personalizada, que direciona as requisições
 * para a nossa API, e garante segurança com cookies e tokens CSRF do Backend Laravel.
 *
 */

export const api = axios.create({
  baseURL: AppConfigs.main_api_url + "/api",
  withCredentials: true,
  withXSRFToken: true,
});

// Função helper para obter o valor de um cookie por nome
const getCookie = (name: string) => {
  if (typeof window === "undefined") return null;
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Função para inicializar o cabeçalho X-XSRF-TOKEN se o cookie já estiver presente
const initializeCSRFToken = () => {
  const csrfToken = getCookie("XSRF-TOKEN");
  if (csrfToken) {
    api.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
  }
};

const initializeJWToken = () => {
  const jwtToken = getCookie("BEARER-TOKEN");

  console.log("Initializing JWT Token: ", jwtToken);

  if (jwtToken) {
    api.defaults.headers.common["Authorization"] = jwtToken;
  }
};

// Chamada da função de inicialização para setar o token CSRF se ele já estiver disponível
initializeCSRFToken();

// Chamada da função de inicialização para setar o token JWT se ele já estiver disponível
initializeJWToken();

// Variável para rastrear solicitações de tokens CSRF em andamento
let csrfRequest: Promise<any> | null = null;

// Função para buscar e setar o token CSRF
const fetchCSRFToken = async () => {
  if (!csrfRequest) {
    csrfRequest = api.get("sanctum/csrf-cookie", {
      baseURL: AppConfigs.main_api_url,
    });
  }
  await csrfRequest;
  csrfRequest = null;

  // Extrair o cookie XSRF-TOKEN e configurá-lo como o cabeçalho X-XSRF-TOKEN
  const csrfToken = getCookie("XSRF-TOKEN");
  if (csrfToken) {
    api.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
  }
};

// Interceptor de resposta para lidar com erros CSRF e retry
api.interceptors.response.use(
  (response) => response, // Passa respostas bem-sucedidas
  async (error) => {
    const originalRequest = error.config;

    // Verificar se houve um erro de token CSRF (HTTP 419) e garantir que vamos tentar mais uma vez a requisição após atualizar o token
    if (
      error.response?.status === 419 && // Erro CSRF
      !originalRequest._retry // Evitar loops de retry infinitos
    ) {
      try {
        // Marcar que a solicitação já teve um "retry"
        originalRequest._retry = true;

        // Buscar token CSRF
        await fetchCSRFToken();

        // Retry da solicita o original
        return api(originalRequest);
      } catch (csrfError) {
        console.error("Falha ao atualizar token CSRF:", csrfError);
        return Promise.reject(csrfError);
      }
    }

    // Passar qualquer outro erro
    return Promise.reject(error);
  }
);
