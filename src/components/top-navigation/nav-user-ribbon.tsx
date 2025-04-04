"use client";

import { LoginButton } from "./login-form-modal";

export function NavUserRibbon({ isFluid = false }) {
  return (
    <nav className="p-2 px-4">
      <div
        className={`flex justify-between items-center text-sm ${
          isFluid ? "" : "max-w-7xl mx-auto"
        }`}
      >
        <div>Bem-vindo usuário!</div>

        <LoginButton />
      </div>
    </nav>
  );
}
