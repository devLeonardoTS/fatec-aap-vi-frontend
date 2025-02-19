import axios from "axios";

/*
 * Axios é uma biblioteca que permite fazer requisições HTTP (GET, POST, etc.)
 * de forma mais simples do que a função fetch do JavaScript.
 * Nesse caso, estamos usando ela para fazer requisições para a nossa API.
 *
 * Basicamente, estamos criando uma instância personalizada, que direciona as requisições
 * para a nossa API.
 */

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_API_URL,
});
