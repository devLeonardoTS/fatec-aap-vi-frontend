"use client";

import { useSessionStore } from "@/stores/session-store";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useLayoutEffect } from "react";

// Declara todas as variáveis que serão passadas para a UI
// (Mas não implementa a lógica delas, isso é feito dentro do Provider)
interface DashboardContextType {}

// Crie o contexto com um valor padrão de `null` para a renderização inicial da tela
const DashboardContext = createContext<DashboardContextType | null>(null);

// Define as propriedades do Provider do contexto
interface DashboardProviderProps {
  children: ReactNode;
}

// Cria o componente que servira como Provider, implementando a lógica das variáveis que serão passadas para a UI.
export function DashboardProvider({ children }: DashboardProviderProps) {
  const router = useRouter();

  const { user, setFlashMessage: setMessage } = useSessionStore();

  const provided = {};

  useLayoutEffect(() => {
    if (!user) {
      setMessage("Você precisa estar autenticado para visualizar essa página");
      router.back();
    }
  }, [user]);

  if (!user) return null;

  return (
    <DashboardContext.Provider value={provided}>
      {children}
    </DashboardContext.Provider>
  );
}

// Hook para usar o Contexto
export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);

  if (context === null) {
    throw new Error("Context must be used nested within a Provider");
  }

  return context;
};
