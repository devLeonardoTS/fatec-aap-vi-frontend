import axios from "axios";
import { AppConfigs } from "./app-configs";

/*
 * Axios é uma biblioteca que permite fazer requisições HTTP (GET, POST, etc.)
 * de forma mais simples do que a função fetch do JavaScript.
 * Nesse caso, estamos usando ela para fazer requisições para a nossa API.
 *
 * Basicamente, estamos criando uma instância personalizada, que direciona as requisições
 * para a nossa API.
 */

export const api = axios.create({
  baseURL: AppConfigs.main_api_url,
});
