import { api } from "@/lib/api";
import { parseAxiosError } from "@/lib/utils/parse-axios-errors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type UseGetResourceOptions<T = any> = {
  key: string;
  route: string;
  query?: Record<string, unknown>;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: boolean;
  refetchInterval?: any;
};

export type UsePostResource<T = any> = {
  key: string;
  route: string;
  onSuccess?: (data: T | any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: T | any) => void;
};

export type UsePatchResource<T = any> = {
  key: string;
  route: string;
  onSuccess?: (data: T | any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: T | any) => void;
};

export type UseDeleteResource<T = any> = {
  key: string;
  route: (id: string) => string;
  onSuccess?: (data: T | any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: T | any) => void;
};

export function useGetResource<T = any>({
  key,
  route,
  query,
  onSuccess = (data: T) => {},
  onError = (error: any) => {},
  enabled = true,
  refetchOnWindowFocus = false,
  retry = false,
  refetchInterval = false,
}: UseGetResourceOptions) {
  const controller = new AbortController();

  const { refetch, data, error, isPending, isFetching, isLoading } = useQuery<
    T,
    unknown
  >({
    queryKey: [key, query],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await api.get<T>(route, {
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
    retry,
    staleTime: 0,
    refetchOnWindowFocus,
    enabled,
    refetchInterval,
  });

  function abort(onAbort = () => {}) {
    controller.abort();
    onAbort();
  }

  return {
    refetch,
    data,
    error,
    isLoading: isFetching,
    abort,
  };
}

export function useResourceRefresher(key: string) {
  const queryClient = useQueryClient();

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  }

  return { refresh };
}

export function usePostResource<T = any>({
  key,
  route,
  onSuccess = (data: T) => {},
  onError = (error: any) => {},
  onSettled = (data: T) => {},
}: UsePostResource) {
  const controller = new AbortController();

  const mutation = useMutation({
    mutationKey: [key],
    mutationFn: (data: any) => {
      return api.post(route, data, {
        signal: controller.signal,
      });
    },
    onSuccess({ data }) {
      // Dispatch on success cb.
      onSuccess(data);
    },
    onError(error, variables, context) {
      // Dispatch on error cb.

      // console.log("[Hooks:resources:useCreateResource] - onError:", error);

      if (error?.name === "AxiosError") throw parseAxiosError(error);
    },
    onSettled: (data, error, variables, context) => {
      onSettled({ data, error, variables, context });
    },
  });

  function abort(onAbort = () => {}) {
    controller.abort();
    onAbort();
  }

  return {
    postResource: mutation.mutate,
    postResourceAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    abort,
  };
}

export function usePatchResource<T = any>({
  key,
  route,
  onSuccess = (data: T) => {},
  onError = (error: any) => {},
  onSettled = (data: T) => {},
}: UsePatchResource) {
  const controller = new AbortController();

  const mutation = useMutation({
    mutationKey: [key],
    mutationFn: ({ id, ...data }: { id: string; [key: string]: any }) => {
      return api.patch(route, data, {
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
    patchResource: mutation.mutate,
    patchResourceAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    abort,
  };
}

export function useDeleteResource<T = any>({
  key,
  route,
  onSuccess = (data: T) => {},
  onError = (error: any) => {},
  onSettled = (data: T) => {},
}: UseDeleteResource) {
  const controller = new AbortController();

  const mutation = useMutation({
    mutationKey: [key],
    mutationFn: (id: string) => {
      return api.delete(route(id), {
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
    deleteResource: mutation.mutate,
    deleteResourceAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    abort,
  };
}
