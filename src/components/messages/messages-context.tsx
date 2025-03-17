"use client";

import {
  useCreateMessage,
  useDeleteMessage,
  useGetMessages,
  useMessagesRefresher,
} from "@/hooks/messages";
import { createContext, ReactNode, useContext } from "react";

// Declara todas as variáveis que serão passadas para a UI
// (Mas não implementa a lógica delas, isso é feito dentro do MessagesProvider)
interface MessagesContextType {
  isSearching: boolean;
  isCreating: boolean;
  isDeleting: boolean;

  messages: any[];

  createMessageAsync: (data: any) => any;
  deleteMessageAsync: (id: string) => any;
  refreshMessages: () => void;
}

// Crie o contexto com um valor padrão de `null` para a renderização inicial da tela
const MessagesContext = createContext<MessagesContextType | null>(null);

// Define as propriedades do Provider do contexto
interface MessagesProviderProps {
  children: ReactNode;
}

// Cria o componente que servira como Provider, implementando a lógica das variáveis que serão passadas para a UI.
export function MessagesProvider({ children }: MessagesProviderProps) {
  // API entregará algo como "data.messages", então teremos isso no "data" do hook "useGetMessages".
  // Alteramos o nome da variável "data" para "messagesRequest", pq "data" aparece em outros lugares no código.
  const { data: messagesRequest, isLoading: isSearching } = useGetMessages({});

  // Extrai os dados das mensagens, garantindo que caso haja algum erro do backend a lista de mensagens estará vazia
  const { messages = [] } = messagesRequest?.data || {};

  // Inicializa uma função que permite a criação de novas mensagens
  const { createMessageAsync, isLoading: isCreating } = useCreateMessage({});

  // Inicializa uma função que permite refazer a requisição de mensagens
  const { refresh: refreshMessages } = useMessagesRefresher();

  const { deleteMessageAsync, isLoading: isDeleting } = useDeleteMessage({});

  // Toda lógica que será passada pra UI "messages-root" por meio do Provider.
  const provided = {
    isSearching,
    isCreating,
    isDeleting,

    messages,

    createMessageAsync,
    deleteMessageAsync,
    refreshMessages,
  };

  return (
    <MessagesContext.Provider value={provided}>
      {children}
    </MessagesContext.Provider>
  );
}

// Hook para usar o Contexto
export const useMessagesContext = (): MessagesContextType => {
  const context = useContext(MessagesContext);

  if (context === null) {
    throw new Error("Context must be used nested within a Provider");
  }

  return context;
};
