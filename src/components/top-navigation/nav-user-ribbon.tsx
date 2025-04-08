"use client";

import { NavRoutes } from "@/lib/routes/nav.routes";
import Link from "next/link";
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

function MyDashboardButton() {
  return (
    <>
      <Link href={NavRoutes.dashboard} className="nav-button-link">
        Dashboard
      </Link>
    </>
  );
}

export function NavUserRibbon({ isFluid = false }) {
  const { user, isLoggingIn } = useAuthContext();

  return (
    <nav className="p-2 px-4">
      <div
        className={`flex justify-between items-center text-sm ${
          isFluid ? "" : "max-w-7xl mx-auto"
        }`}
      >
        <p>
          Bem-vindo(a) ao inValve
          {user ? ", " + user?.profile?.full_name + "!" : ""}
        </p>

        <div className="space-x-4">
          {!user && <LoginButton />}
          {user && (
            <>
              <MyDashboardButton />
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
