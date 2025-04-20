"use client";

import { NavRoutes } from "@/lib/routes/nav.routes";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Ripple } from "primereact/ripple";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../auth-context";

export function LoginButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <button onClick={open} className="nav-button-link">
        Login
      </button>

      <LoginFormModal opened={opened} close={close} />
    </>
  );
}

function LoginFormModal({ opened, close: closeModal }) {
  const initForm = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initForm);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const { login, logout, user, loginFormErrors, isLoggingIn } =
    useAuthContext();

  const handleChange =
    (name: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    };

  function handleCloseModal() {
    closeModal();
    setFormData(initForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();

    login({
      email: formData.email,
      password: formData.password,
      onSuccess() {
        handleCloseModal();
      },
    });
  }

  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      classNames={{
        body: "border border-4 border-neutral-light rounded-md p-4",
      }}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-between items-end">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-gray-600 text-sm">Entre com seu email e senha.</p>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="seu-email@exemplo.com"
            value={formData.email}
            onChange={handleChange("email")}
          />
          {loginFormErrors.email && (
            <p className="mt-1 text-sm text-red-600">{loginFormErrors.email}</p>
          )}
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700">Senha</span>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              className="block w-full pr-10 px-3 py-2 mr-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="********"
              value={formData.password}
              onChange={handleChange("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-2 text-black border-l p-ripple"
              onClick={toggleShowPassword}
            >
              {showPassword ? <EyeOff /> : <Eye />}
              <Ripple
                pt={{
                  root: {
                    className: "bg-blue-200",
                  },
                }}
              />
            </button>
            {loginFormErrors.password && (
              <p className="mt-1 text-sm text-red-600">
                {loginFormErrors.password}
              </p>
            )}
          </div>
        </label>

        <div className="flex justify-between">
          <Link
            href=""
            className="text-sm text-right text-neutral-400 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toast("Ainda estamos trabalhando nisso!", {
                draggable: true,
              });
            }}
          >
            Esqueci a minha senha
          </Link>

          <Link
            href={NavRoutes.user_sign_up}
            className="text-sm text-right text-neutral-400 hover:underline"
            onClick={handleCloseModal}
          >
            Quero me cadastrar!
          </Link>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full bg-neutral-light py-1 px-2 border rounded-md border-gray-300 font-semibold p-ripple"
          >
            Entrar
            <Ripple
              pt={{
                root: {
                  className: "bg-blue-300",
                },
              }}
            />
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-full py-1 px-2 border rounded-md border-gray-300 font-semibold p-ripple"
          >
            Voltar
            <Ripple
              pt={{
                root: {
                  className: "bg-blue-300",
                },
              }}
            />
          </button>
        </div>
      </form>
    </Modal>
  );
}
