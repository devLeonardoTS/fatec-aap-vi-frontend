"use client";

import type React from "react";

import { useCreateResource, useGetResource } from "@/hooks/resources";
import { RequestKeys } from "@/lib/constants/request-keys";
import { ApiRoutes } from "@/lib/routes/api.routes";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

import { NavRoutes } from "@/lib/routes/nav.routes";
import {
  handleBackendValidations,
  handleFrontendValidations,
} from "@/lib/utils/validation-handlers";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useAuthContext } from "../auth-context";

const minFullNameChars = 3;
const maxEmailChars = 255;
const minPasswordChars = 8;

const signUpValidationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("O campo do nome completo é obrigatório.")
    .min(
      minFullNameChars,
      `O campo do nome completo deve ter pelo menos ${minFullNameChars} caracteres.`
    )
    .typeError("O campo do nome completo deve ser uma string."),
  email: Yup.string()
    .required("O campo do e-mail é obrigatório.")
    .email("O campo do e-mail deve ser um e-mail.")
    .max(
      maxEmailChars,
      `O campo do e-mail deve ter no máximo ${maxEmailChars} caracteres.`
    )
    .typeError("O campo do e-mail deve ser uma string."),
  password: Yup.string()
    .required("O campo da senha é obrigatório.")
    .oneOf(
      [Yup.ref("password_confirmation"), null],
      "As senhas devem ser iguais."
    )
    .min(
      minPasswordChars,
      `O campo da senha deve ter pelo menos ${minPasswordChars} caracteres.`
    )
    .typeError("O campo da senha deve ser uma string."),
  password_confirmation: Yup.string()
    .required("O campo da confirmação da senha é obrigatório.")
    .typeError("O campo da senha deve ser uma string."),
});

export function UserSignUpForm() {
  const router = useRouter();

  const initForm = {
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [formData, setFormData] = useState(initForm);

  const [errors, setErrors] = useState(initForm);

  const { createResourceAsync: signUpUserAsync, isLoading: isSigningUser } =
    useCreateResource({
      key: RequestKeys.CREATE_USER,
      route: ApiRoutes.post_register,
    });

  const { isLoggingIn, user, login } = useAuthContext();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSignUp(formData: any) {
    // Send payload to backend.
    console.log("handleSignUp", formData);
    toast
      .promise(signUpUserAsync(formData), {
        pending: "Cadastrando usuário...",
        // success: "Pedido de cadastro de usuário enviado com sucesso",
      })
      .then(({ data }) => {
        login({ email: formData.email, password: formData.password });
        setFormData(initForm);
      })
      .catch((error) => {
        console.log("Backend errors: ", error);

        const backendValidations = handleBackendValidations(error);

        setErrors((prev) => ({
          ...prev,
          ...backendValidations,
        }));

        if (errors) return;

        // If no validation errors, show generic error message.
        toast.error(
          "Não foi possível cadastrar o usuário no momento. Tente novamente mais tarde."
        );
      });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();

    // console.log("Payload", formData);

    // Clear errors on submit.
    setErrors(initForm);

    // Do Client Side validation.
    const frontendValidations = handleFrontendValidations(
      signUpValidationSchema,
      formData
    );

    setErrors((prev) => ({
      ...prev,
      ...frontendValidations,
    }));

    const hasErrors = Object.values(errors).some((value) => value?.length > 0);
    if (hasErrors) return;

    handleSignUp(formData);
  }

  const {
    data: protectedData,
    isLoading: isLoadingProtected,
    refetch,
  } = useGetResource({
    key: "ANY:PROTECTED",
    route: "/protected",
    // enabled: false,
  });

  useLayoutEffect(() => {
    if (user) router.push(NavRoutes.home);
  }, [user]);

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Cadastre-se</h2>
          <p className="mt-2 text-sm text-gray-600">
            Junte-se a comunidade de usuários do inValve
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700"
              >
                Digite seu nome completo
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                value={formData.full_name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.full_name ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                placeholder="Seu nome"
              />
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Digite seu e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                placeholder="seu-email@exemplo.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Digite sua senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirme a senha
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                autoComplete="new-password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password_confirmation
                    ? "border-red-300"
                    : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                placeholder="••••••••"
              />
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password_confirmation}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSigningUser}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Criar conta
            </button>
          </div>

          <div className="text-sm text-center">
            <p className="text-gray-600">
              Já tenho uma conta.{" "}
              <Link
                href="#"
                className="font-medium text-gray-800 hover:text-gray-700"
              >
                Fazer Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
