export const MainApiBaseUrl = process.env.NEXT_PUBLIC_MAIN_API_URL || "";

/**
 * Métodos HTTP:
 * - GET: Recuperar dados do servidor.
 * - POST: Enviar dados para o servidor para criar um novo recurso ou disparar ações.
 * - PUT ou PATCH: Atualizar um recurso existente no servidor.
 * - DELETE: Remover um recurso do servidor.
 */

export const ApiRoutes = {
  post_login: `/auth/login`,
  post_register: `/users`,

  get_me: `/auth/user`,

  get_all_messages: `/messages`,
  post_new_message: `/messages`,
  patch_message: (id: string) => `/messages/${id}`,
  delete_message: (id: string) => `/messages/${id}`,
};
