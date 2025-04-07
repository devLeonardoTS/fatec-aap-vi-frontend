"use client";

import { useAuthContext } from "../auth-context";
import { LoginButton } from "./login-form-modal";

function LogoutButton() {
  const { logout } = useAuthContext();

  function handleLogout() {
    logout();
  }

  return (
    <>
      <button onClick={handleLogout} className="nav-button-link">
        Logout
      </button>
    </>
  );
}

export function NavUserRibbon({ isFluid = false }) {
  const { user } = useAuthContext();

  return (
    <nav className="p-2 px-4">
      <div
        className={`flex justify-between items-center text-sm ${
          isFluid ? "" : "max-w-7xl mx-auto"
        }`}
      >
        <div>Bem-vindo usuário!</div>

        <div className="space-x-4">
          {!user && <LoginButton />}

          {user && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}
