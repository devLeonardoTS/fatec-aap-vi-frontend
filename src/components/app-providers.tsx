"use client";

import { getQueryClient } from "@/lib/utils/get-query-client";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import React, { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth-context";

/** Detalhe dos Wrappers que envolvem a aplicação.
 *
 * - StrictMode: força a aplica o a renderizar novamente em modo de
 *   desenvolvimento, ajudando a detectar bugs de ciclo de vida.
 *
 * - QueryClientProvider: fornece o client de query para todas as
 *   páginas da aplicação.
 */

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function AppProviders({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  const primeReactConfig = {
    ripple: true,
  };

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider value={primeReactConfig}>
          <MantineProvider theme={theme}>
            <AuthProvider>{children}</AuthProvider>
            <ToastContainer position="top-center" closeOnClick />
          </MantineProvider>
        </PrimeReactProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
