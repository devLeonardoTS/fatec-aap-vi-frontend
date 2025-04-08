import { RequestKeys } from "@/lib/constants/request-keys";
import { ApiRoutes } from "@/lib/routes/api.routes";
import {
  deleteAuthorizationCookie,
  setAuthorizationCookie,
} from "@/lib/utils/api-helpers";
import { handleBackendValidations } from "@/lib/utils/validation-handlers";
import { useSessionStore } from "@/stores/session-store";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateResource, useGetResource } from "./resources";

const authToastId = "TOAST:AUTH";

export function useAuth() {
  const { user, setUser } = useSessionStore();

  const [loginFormErrors, setLoginFormErrors] = useState<any>({});

  const { createResourceAsync: loginUserAsync, isLoading: isLoggingIn } =
    useCreateResource({
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

  async function login({ email, password }) {
    setLoginFormErrors({});
    setUser(null);

    toast.loading("Carregando seu perfil...", {
      toastId: authToastId,
    });

    await loginUserAsync({ email, password })
      .then(({ data }) => {
        console.log("Login Response: ", data);

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
      })
      .catch((error) => {
        const backendValidationErrors = handleBackendValidations(error);

        setLoginFormErrors((prev) => ({
          ...prev,
          ...backendValidationErrors,
        }));

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

    console.log("Refreshed User Data: ", data);

    setUser(data);
  }

  async function logout() {
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

// export const useAuth = () => {
//   const [errors, setErrors] = useState<any>({});

//   const { createResourceAsync: loginUserAsync, isLoading: isLoadingUser } =
//     useCreateResource({
//       key: RequestKeys.LOGIN,
//       route: ApiRoutes.post_login,
//     });

//   const {
//     data: userData,
//     isLoading: isRefreshingSession,
//     refetch,
//   } = useGetResource({
//     key: RequestKeys.REFRESH_USER,
//     route: ApiRoutes.get_me,
//     enabled: false,
//   });

//   const login = async ({ email, password }) => {
//     setErrors({});

//     toast.loading("Carregando seu perfil...", {
//       toastId: authToastId,
//     });

//     await loginUserAsync({ email, password })
//       .then(({ data }) => {
//         const user = data?.data?.user;
//         const profile = user?.profile;

//         const token_type = data?.data?.token_type;
//         const token = data?.data?.token;

//         if (!token_type || !token) {
//           toast.update(authToastId, {
//             render:
//               "Não foi possível autenticar o usuário no momento. Tente novamente mais tarde.",
//             isLoading: false,
//             type: "error",
//             autoClose: 5000,
//             closeButton: true,
//           });
//           deleteAuthorizationCookie();
//           return;
//         }

//         setAuthorizationCookie(
//           `${data?.data?.token_type} ${data?.data?.token}`
//         );

//         toast.update(authToastId, {
//           render: `Seja bem-vindo(a) ${profile?.full_name}!`,
//           isLoading: false,
//           type: "success",
//           autoClose: 5000,
//           closeButton: true,
//         });

//         onLogin(user);
//       })
//       .catch((error) => {
//         const backendValidationErrors = handleBackendValidations(error);

//         setErrors((prev) => ({
//           ...prev,
//           ...backendValidationErrors,
//         }));

//         if (errors) {
//           toast.update(authToastId, {
//             render: "Verifique os campos e tente novamente.",
//             isLoading: false,
//             type: "error",
//             autoClose: 5000,
//             closeButton: true,
//           });
//           return;
//         }

//         // If no validation errors, show generic error message.
//         toast.update(authToastId, {
//           render:
//             "Não foi possível autenticar o usuário no momento. Tente novamente mais tarde.",
//           isLoading: false,
//           type: "error",
//           autoClose: 5000,
//           closeButton: true,
//         });
//       });
//   };

//   const refresh = async () => {
//     console.log("[useAuth::refresh] - refetching...");
//     await refetch();
//   };

//   const logout = async () => {
//     await deleteAuthorizationCookie();
//     await refresh();
//     toast.success("Logout efetuado com sucesso!");
//   };

//   return { login, logout, errors, isLoadingUser };
// };
