"use client";

import type React from "react";

import { useCreateResource } from "@/hooks/resources";
import { RequestKeys } from "@/lib/constants/request_keys";
import { ApiRoutes } from "@/lib/routes/api.routes";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export function UserSignUpForm() {
  const initForm = {
    full_name: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const [formData, setFormData] = useState(initForm);

  // Todo: Form Validation with Yup
  const errors = { ...initForm };

  const { createResourceAsync: signUpUserAsync, isLoading: isSigningUser } =
    useCreateResource({
      key: RequestKeys.CREATE_USER,
      route: ApiRoutes.post_register,
      // onError(error: any) {
      //   console.log("Error onError", error);
      // },
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Payload", formData);

    toast
      .promise(signUpUserAsync(formData), {
        pending: "Enviando pedido de cadastro de usuário...",
        success: "Pedido de cadastro de usuário enviado com sucesso",
      })
      .catch((error) => {
        // Fix this error handling;
        console.log(error);
        const { errors = [] } = error?.data ?? {};
        toast.error(errors[0] ?? "Não foi possível cadastrar o usuário");
      });
  };

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
                htmlFor="password_confirm"
                className="block text-sm font-medium text-gray-700"
              >
                Confirme a senha
              </label>
              <input
                id="password_confirm"
                name="password_confirm"
                type="password"
                autoComplete="new-password"
                value={formData.password_confirm}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password_confirm ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                placeholder="••••••••"
              />
              {errors.password_confirm && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password_confirm}
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
