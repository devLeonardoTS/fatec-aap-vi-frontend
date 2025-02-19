"use client";

import { getQueryClient } from "@/lib/utils/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

/** Detalhe dos Wrappers que envolvem a aplicação.
 *
 * - StrictMode: força a aplica o a renderizar novamente em modo de
 *   desenvolvimento, ajudando a detectar bugs de ciclo de vida.
 *
 * - QueryClientProvider: fornece o client de query para todas as
 *   páginas da aplicação.
 */

export function AppProviders({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </React.StrictMode>
  );
}
