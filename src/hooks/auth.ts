import { RequestKeys } from "@/lib/constants/request-keys";
import { ApiRoutes } from "@/lib/routes/api.routes";
import { NavRoutes } from "@/lib/routes/nav.routes";
import {
  deleteAuthorizationCookie,
  setAuthorizationCookie,
} from "@/lib/utils/api-helpers";
import { handleBackendValidations } from "@/lib/utils/validation-handlers";
import { useSessionStore } from "@/stores/session-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetResource, usePostResource } from "./request-handlers";

const authToastId = "TOAST:AUTH";

export function useAuth() {
  const router = useRouter();

  const { user, setUser } = useSessionStore();

  const [loginFormErrors, setLoginFormErrors] = useState<any>({});

  const { postResourceAsync: loginUserAsync, isLoading: isLoggingIn } =
    usePostResource({
      key: RequestKeys.LOGIN,
      route: ApiRoutes.post_login,
    });

  const {
    data: refreshedUserData,
    error: refreshError,
    refetch: refreshSession,
  } = useGetResource({
    key: RequestKeys.REFRESH_USER,
    route: ApiRoutes.get_me,
    enabled: false,
  });

  async function login({
    email,
    password,
    onSuccess = () => {},
    onError = () => {},
  }) {
    setLoginFormErrors({});
    setUser(null);

    toast.loading("Carregando seu perfil...", {
      toastId: authToastId,
    });

    await loginUserAsync({ email, password })
      .then(({ data }) => {
        // console.log("Login Response: ", data);

        const user = data?.data?.user;
        const profile = user?.profile;
        const token_type = data?.data?.token_type;
        const token = data?.data?.token;

        if (!token_type || !token) {
          toast.update(authToastId, {
            render:
              "Não foi possível autenticar o usuário no momento. Tente novamente mais tarde.",
            isLoading: false,
            type: "error",
            autoClose: 5000,
            closeButton: true,
          });
          deleteAuthorizationCookie();
          onError();
          return;
        }

        setAuthorizationCookie(
          `${data?.data?.token_type} ${data?.data?.token}`
        );

        setUser(user);

        toast.update(authToastId, {
          render: `Seja bem-vindo(a) ${profile?.full_name}!`,
          isLoading: false,
          type: "success",
          autoClose: 5000,
          closeButton: true,
        });

        router.push(NavRoutes.dashboard);

        onSuccess();
      })
      .catch((error) => {
        const backendValidationErrors = handleBackendValidations(error);

        setLoginFormErrors((prev) => ({
          ...prev,
          ...backendValidationErrors,
        }));

        onError();

        if (loginFormErrors) {
          toast.update(authToastId, {
            render: "Verifique os campos e tente novamente.",
            isLoading: false,
            type: "error",
            autoClose: 5000,
            closeButton: true,
          });
          return;
        }

        // If no validation errors, show generic error message.
        toast.update(authToastId, {
          render:
            "Não foi possível autenticar o usuário no momento. Tente novamente mais tarde.",
          isLoading: false,
          type: "error",
          autoClose: 5000,
          closeButton: true,
        });
      });
  }

  async function refresh() {
    const { data } = await refreshSession();

    if (refreshError) {
      deleteAuthorizationCookie();
      setUser(null);
      toast.error("Sua sessão expirou. Por favor, faca login novamente.");
      return;
    }

    // console.log("Refreshed User Data: ", data);

    setUser(data);
  }

  async function logout() {
    router.push(NavRoutes.home);

    toast
      .promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        pending: "Encerrando sessão...",
        success: "Sua sessão foi encerrada com sucesso.",
      })
      .then(() => {
        deleteAuthorizationCookie();
        setUser(null);
      });
  }

  return {
    user,
    loginFormErrors,
    isLoggingIn,
    login,
    refresh,
    logout,
  };
}
