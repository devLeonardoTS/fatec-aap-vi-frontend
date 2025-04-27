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

  // Device-related routes
  get_devices_analytics: `/devices/analytics`,
  get_device_actions: `/devices/actions`,
  get_device: (token: string) => `/devices/${token}`,
  get_device_analytics: (token: string) => `/devices/${token}/analytics`,
  get_device_commands: (token: string) => `/devices/${token}/commands`,
  get_all_devices: `/devices`,
  post_device_command: (token: string) => `/devices/${token}/commands`,
  post_device: `/devices`,
  patch_device_command: (token: string, command_id: string) =>
    `/devices/${token}/commands/${command_id}`,
  patch_device: (token: string) => `/devices/${token}`,
  delete_device_command: (token: string, command_id: string) =>
    `/devices/${token}/commands/${command_id}`,
  delete_all_device_commands: (token: string) => `/devices/${token}/commands`,

  // Tickets routes
  get_all_tickets: `/tickets`,
  get_ticket: (id: string) => `/tickets/${id}`,
  get_ticket_comments: (id: string) => `/tickets/${id}/comments`,
  post_ticket_comment: (id: string) => `/tickets/${id}/comments`,
  post_ticket: `/tickets`,
  patch_ticket: (id: string) => `/tickets/${id}`,
  delete_ticket: (id: string) => `/tickets/${id}`,
};
