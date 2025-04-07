import { useAuth } from "@/hooks/auth";
import { useGetResource } from "@/hooks/resources";
import { RequestKeys } from "@/lib/constants/request_keys";
import { ApiRoutes } from "@/lib/routes/api.routes";
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
  isLoadingUser: boolean;
  errors: any;

  login: (data: any) => any;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refreshUser,
  } = useGetResource({
    key: RequestKeys.REFRESH_USER,
    route: ApiRoutes.get_me,
    enabled: false,
  });

  const { login, logout, errors } = useAuth({
    onLogin: refreshUser,
    onLogout: refreshUser,
  });

  useLayoutEffect(() => {
    if (getAuthorizationCookie()) {
      refreshUser();
    }
  }, []);

  const provided = {
    user,
    isLoadingUser,
    errors,

    login,
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
