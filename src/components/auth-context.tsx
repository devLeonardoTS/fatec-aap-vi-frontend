import { useAuth } from "@/hooks/auth";
import { getAuthorizationCookie } from "@/lib/utils/api-helpers";
import { createContext, useContext, useLayoutEffect } from "react";

type AuthContextType = {
  // Define your context properties here
  user: {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
    role: string;
    is_active: number;
    profile: {
      id: number;
      full_name: string;
      created_at: string;
      updated_at: string;
    };
  };
  isLoggingIn: boolean;
  loginFormErrors: any;

  login: (credentials: {
    email: string;
    password: string;
    onSuccess?: () => void;
    onError?: () => void;
  }) => any;
  refresh: () => any;
  logout: () => any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const { isLoggingIn, loginFormErrors, user, login, refresh, logout } =
    useAuth();

  useLayoutEffect(() => {
    const hasAuthCookie = getAuthorizationCookie();

    if (user && hasAuthCookie) {
      // console.log("Refreshing Session...");
      refresh();
    }
  }, []);

  // useEffect(() => {
  // console.log("Authenticated User: ", user);
  // }, [user]);

  const provided = {
    isLoggingIn,
    loginFormErrors,
    user,
    login,
    refresh,
    logout,
  };

  return (
    <AuthContext.Provider value={provided}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
