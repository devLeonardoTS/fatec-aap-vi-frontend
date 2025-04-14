"use client";

import {
  useGetResource,
  usePostResource,
  useResourceRefresher,
} from "@/hooks/request-handlers";
import { ApiRoutes } from "@/lib/routes/api.routes";
import { Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

function SendMessageForm() {
  const {
    postResourceAsync: createResourceAsync,
    isLoading: isCreatingMessage,
  } = usePostResource({
    key: "CREATE:MESSAGE",
    route: ApiRoutes.post_new_message,
  });

  const [messageContent, setMessageContent] = useState("");

  const { refresh: refreshMessages } = useResourceRefresher("GET:MESSAGES");

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-bold mb-2 text-black">Envie Nova Mensagem</h2>
      <textarea
        placeholder="Digite sua mensagem aqui..."
        className="w-full min-h-[100px] border p-2"
        style={{ color: "black" }}
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={async () => {
            await createResourceAsync({
              content: messageContent,
            });

            refreshMessages();
          }}
          className="flex items-center gap-1 border border-slate-400 px-2 py-1 rounded-md hover:bg-slate-200"
        >
          <Send />
          <span style={{ color: "black" }}>Enviar Mensagem</span>
        </button>
      </div>
    </div>
  );
}

export default function MessageTable() {
  const { data: messagesRequest, isLoading: messagesIsLoading } =
    useGetResource({
      key: "GET:MESSAGES",
      route: ApiRoutes.get_all_messages,
    });

  const messages = messagesRequest?.data?.messages || [];

  // const messages: Message[] = [
  //   {
  //     id: "1",
  //     content: "Oi, tudo bem?",
  //     created_at: "2023-10-24 09:30 AM",
  //     updated_at: "2023-10-24 09:30 AM",
  //   },
  //   {
  //     id: "2",
  //     content: "Opa, bom dia",
  //     created_at: "2023-10-24 10:15 AM",
  //     updated_at: "2023-10-24 10:15 AM",
  //   },
  //   {
  //     id: "3",
  //     content: "Beleza?",
  //     created_at: "2023-10-24 11:45 AM",
  //     updated_at: "2023-10-24 11:45 AM",
  //   },
  //   {
  //     id: "4",
  //     content: "Oi",
  //     created_at: "2023-10-24 01:20 PM",
  //     updated_at: "2023-10-24 01:20 PM",
  //   },
  // ];

  function MessageTable({ messages }: { messages: Message[] }) {
    return (
      <div className="rounded-md border">
        <table className="w-full">
          <caption className="sr-only">Mensagens Recentes</caption>
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 w-1/4" style={{ width: "180px" }}>
                ID
              </th>
              <th className="px-4 py-2">Conteúdo</th>
              <th className="px-4 py-2 text-right" style={{ width: "180px" }}>
                Data de Criação
              </th>
              <th className="px-4 py-2 text-right" style={{ width: "180px" }}>
                Data de Atualização
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className="border-t">
                <td className="px-4 py-2 font-bold">{message.id}</td>
                <td className="px-4 py-2">{message.content}</td>
                <td className="px-4 py-2 text-right">{message.created_at}</td>
                <td className="px-4 py-2 text-right">{message.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inbox de Mensagens</h1>
      </div>

      <SendMessageForm />

      <MessageTable messages={messages} />
    </div>
  );
}
