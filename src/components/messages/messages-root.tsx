"use client";

import { useState } from "react";
import { useMessagesContext } from "./messages-context";

export function MessagesRoot() {
  const {
    messages,
    isSearching,
    isCreating,
    isDeleting,
    createMessageAsync,
    deleteMessageAsync,
    refreshMessages,
  } = useMessagesContext();

  // const messages = [
  //   {
  //     id: "1",
  //     content: "Oi, essa é uma mensagem escrita no código!",
  //   },
  //   {
  //     id: "2",
  //     content: "Oi, essa é mais uma mensagem escrita diretamente no código!",
  //   },
  // ];

  const [newMessage, setNewMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      content: newMessage,
    };

    await createMessageAsync(payload);

    refreshMessages();

    setNewMessage("");
  }

  async function handleDeleteButtonClick(id: string) {
    await deleteMessageAsync(id);
    refreshMessages();
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mensagens</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md bg-white p-4 rounded-lg shadow-md space-x-2"
      >
        <input
          type="text"
          name="mensagem"
          id="mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-0"
          placeholder="Digite sua mensagem..."
        />
        <button
          type="submit"
          disabled={isCreating || isSearching || isDeleting || !newMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          Enviar
        </button>
      </form>

      <div className="w-full max-w-md mt-4 p-4 bg-white rounded-lg shadow-md h-64 overflow-auto">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">
            Nenhuma mensagem encontrada.
          </p>
        ) : (
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className="p-2 bg-blue-100 rounded-lg shadow-sm flex gap-2"
              >
                <p className="flex-grow">{message.content}</p>
                <button
                  type="button"
                  onClick={() => handleDeleteButtonClick(message.id)}
                  className="flex-shrink-0 px-2 py-1 border rounded-md text-xs border-white bg-black text-white h-fit"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
