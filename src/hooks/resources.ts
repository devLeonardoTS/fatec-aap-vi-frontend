import { api } from "@/lib/api";
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
};

export type UseCreateResource<T = any> = {
  key: string;
  route: string;
  onSuccess?: (data: T | any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: T | any) => void;
};

export type UsePatchResource<T = any> = {
  key: string;
  route: (id: string) => string;
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
}: UseGetResourceOptions) {
  const controller = new AbortController();

  const { refetch, data, error, isPending, isFetching } = useQuery<T, unknown>({
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

export function useResourceRefresher(key: string) {
  const queryClient = useQueryClient();

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  }

  return { refresh };
}

export function useCreateResource<T = any>({
  key,
  route,
  onSuccess = (data: T) => {},
  onError = (error: any) => {},
  onSettled = (data: T) => {},
}: UseCreateResource) {
  const controller = new AbortController();

  const mutation = useMutation({
    mutationKey: [key],
    mutationFn: (data: any) => {
      return api.post(route, data, {
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
    createResource: mutation.mutate,
    createResourceAsync: mutation.mutateAsync,
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
      return api.patch(route(id), data, {
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
