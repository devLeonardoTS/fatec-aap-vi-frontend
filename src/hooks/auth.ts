import { RequestKeys } from "@/lib/constants/request_keys";
import { ApiRoutes } from "@/lib/routes/api.routes";
import {
  deleteAuthorizationCookie,
  setAuthorizationCookie,
} from "@/lib/utils/api-helpers";
import { handleBackendValidations } from "@/lib/utils/validation-handlers";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateResource } from "./resources";

const authToastId = "TOAST:AUTH";

export const useAuth = ({ onLogin = () => {}, onLogout = () => {} }) => {
  const [errors, setErrors] = useState<any>({});

  const { createResourceAsync: loginUserAsync, isLoading: isLoadingUser } =
    useCreateResource({
      key: RequestKeys.LOGIN,
      route: ApiRoutes.post_login,
    });

  const login = async ({ email, password }) => {
    setErrors({});

    toast.loading("Carregando seu perfil...", {
      toastId: authToastId,
    });

    await loginUserAsync({ email, password })
      .then(({ data }) => {
        const profile = data?.data?.user?.profile;

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
          return;
        }

        setAuthorizationCookie(
          `${data?.data?.token_type} ${data?.data?.token}`
        );

        toast.update(authToastId, {
          render: `Seja bem-vindo(a) ${profile?.full_name}!`,
          isLoading: false,
          type: "success",
          autoClose: 5000,
          closeButton: true,
        });

        onLogin();
      })
      .catch((error) => {
        const backendValidationErrors = handleBackendValidations(error);

        setErrors((prev) => ({
          ...prev,
          ...backendValidationErrors,
        }));

        if (errors) {
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
  };

  const logout = async () => {
    await deleteAuthorizationCookie();
    onLogout();
    toast.success("Logout efetuado com sucesso!");
  };

  return { login, logout, errors, isLoadingUser };
};
