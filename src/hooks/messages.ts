import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* Descrição de Keys do React Query.
 * Query Keys são usados no React Query para identificar de forma única
 * cada consulta de dados. Isso permite que o React Query faça o cache
 * dos resultados das consultas e gerencie o estado de forma eficiente.
 *
 * Quando você executa uma consulta de dados com o React Query,
 * você fornece uma chave para essa consulta, chamada de Query Key.
 * Esta chave é geralmente um array que pode conter strings, números
 * ou objetos que representam a consulta.
 *
 * O React Query usa a Query Key para armazenar o resultado da consulta
 * em cache. Assim, se a mesma consulta for feita novamente, o React Query
 * pode retornar o resultado do cache em vez de fazer uma nova requisição
 * ao servidor, economizando tempo e recursos.
 *
 * As Query Keys também são usadas para invalidar ou atualizar o cache.
 * Quando os dados são alterados, você pode usar a chave da consulta
 * para informar ao React Query que deve buscar dados atualizados.
 *
 * Em resumo, as Query Keys são uma parte fundamental do React Query
 * para identificar, armazenar em cache e gerenciar o estado das consultas
 * de dados na aplicação.
 *
 * Essa mecânica segue a mesma linha de raciocínio com algumas pequenas nuances para as Mutation Keys.
 */

const QueryKeys = {
  GET_MESSAGES: "get::messages",
};

const MutationKeys = {
  CREATE_MESSAGE: "create::message",
  PATCH_MESSAGE: "patch::message",
  DELETE_MESSAGE: "delete::message",
};

/** Descrição de Rotas.
 * Rotas para as requisições HTTP para a API, converse com o responsável
 * pelo backend para definir as rotas.
 */
const Routes = {
  get_all_messages: `/messages`,
  post_new_message: `/messages`,
  patch_message: (id: string) => `/messages/${id}`,
  delete_message: (id: string) => `/messages/${id}`,
};

/** Descrição do Hook de busca de Mensagens.
 * useGetMessages: Hook que busca todas as mensagens da API.
 *
 * useGetMessages retorna um objeto com as seguintes propriedades:
 * - data: array com todas as mensagens;
 * - error: objeto de erro, caso a requisição falhe;
 * - isLoading: booleano que indica se a requisição está em andamento;
 * - refetch: função para refazer a requisição;
 * - abort: função para cancelar a requisição;
 */
export function useGetMessages({
  query = {},
  onSuccess = (data: any) => {},
  onError = (error: any) => {},
  enabled = true,
}) {
  const controller = new AbortController();

  const { refetch, data, error, isPending, isFetching } = useQuery({
    queryKey: [QueryKeys.GET_MESSAGES, query],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await api.get<any>(Routes.get_all_messages, {
          params: queryKey?.[1],
          signal: controller.signal,
        });

        const { data } = response;

        onSuccess(data);

        return data;
      } catch (error) {
        onError(error);

        throw error;
      }
    },
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled,
  });

  function abort(onAbort = () => {}) {
    controller.abort();
    onAbort();
  }

  return {
    refetch,
    data,
    error,
    isLoading: isFetching || isPending,
    abort,
  };
}

/** Descrição do Hook de refazer a requisição de Mensagens.
 * useMessagesRefresher: Hook que fornece uma função para refazer a requisição de mensagens.
 */
export function useMessagesRefresher() {
  const queryClient = useQueryClient();

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.GET_MESSAGES],
    });
  }

  return { refresh };
}

/** Descrição do Hook de criação de Mensagens.
 * useCreateMessage: Hook que cria uma nova mensagem na API.
 *
 * useCreateMessage retorna um objeto com as seguintes propriedades:
 * - createMessage: função para criar uma nova mensagem;
 * - createMessageAsync: função para criar uma nova mensagem de forma assíncrona;
 * - isLoading: booleano que indica se a requisição está em andamento;
 * - abort: função para cancelar a requisição;
 */
export function useCreateMessage({
  onSuccess = (data: any) => {},
  onError = (error: any) => {},
  onSettled = (data: any) => {},
}) {
  const controller = new AbortController();

  const mutation = useMutation({
    mutationKey: [MutationKeys.CREATE_MESSAGE],
    mutationFn: (data: any) => {
      return api.post(Routes.post_new_message, data, {
        signal: controller.signal,
      });
    },
    onSuccess,
    onError,
    onSettled: (data, error, variables, context) => {
      onSettled({ data, error, variables, context });
    },
  });

  function abort(onAbort = () => {}) {
    controller.abort();
    onAbort();
  }

  return {
    createMessage: mutation.mutate,
    createMessageAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    abort,
  };
}

/** Descrição do Hook de atualização de Mensagens.
 * usePatchMessage: Hook que atualiza uma mensagem na API.
 *
 * usePatchMessage retorna um objeto com as seguintes propriedades:
 * - createMessage: função para atualizar uma mensagem;
 * - createMessageAsync: função para atualizar uma mensagem de forma assíncrona;
 * - isLoading: booleano que indica se a requisição está em andamento;
 * - abort: função para cancelar a requisição;
 */
export function usePatchMessage({
  onSuccess = (data: any) => {},
  onError = (error: any) => {},
  onSettled = (data: any) => {},
}) {
  const controller = new AbortController();

  const mutation = useMutation({
    mutationKey: [MutationKeys.PATCH_MESSAGE],
    mutationFn: ({ id, ...data }: { id: string; [key: string]: any }) => {
      return api.patch(Routes.patch_message(id), data, {
        signal: controller.signal,
      });
    },
    onSuccess,
    onError,
    onSettled: (data, error, variables, context) => {
      onSettled({ data, error, variables, context });
    },
  });

  function abort(onAbort = () => {}) {
    controller.abort();
    onAbort();
  }

  return {
    createMessage: mutation.mutate,
    createMessageAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    abort,
  };
}

/** Descrição do Hook de exclusão de Mensagens.
 * useDeleteMessage: Hook que deleta uma mensagem na API.
 *
 * useDeleteMessage retorna um objeto com as seguintes propriedades:
 * - deleteMessage: função para deletar uma mensagem;
 * - deleteMessageAsync: função para deletar uma mensagem de forma assíncrona;
 * - isLoading: booleano que indica se a requisição está em andamento;
 * - abort: função para cancelar a requisição;
 */
export function useDeleteMessage({
  onSuccess = (data: any) => {},
  onError = (error: any) => {},
  onSettled = (data: any) => {},
}) {
  const controller = new AbortController();

  const mutation = useMutation({
    mutationKey: [MutationKeys.DELETE_MESSAGE],
    mutationFn: (id: string) => {
      return api.delete(Routes.delete_message(id), {
        signal: controller.signal,
      });
    },
    onSuccess,
    onError,
    onSettled: (data, error, variables, context) => {
      onSettled({ data, error, variables, context });
    },
  });

  function abort(onAbort = () => {}) {
    controller.abort();
    onAbort();
  }

  return {
    deleteMessage: mutation.mutate,
    deleteMessageAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    abort,
  };
}
