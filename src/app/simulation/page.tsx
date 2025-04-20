"use client";

import { useGetResource, usePostResource } from "@/hooks/request-handlers";
import { ApiRoutes } from "@/lib/routes/api.routes";
import { useState } from "react";

export default function SimulationPage() {
  const [event, setEvent] = useState(null);
  const [messages, setMessages] = useState([]);

  const {
    data: messagesRequest,
    isLoading: messagesIsLoading,
    refetch: refetchMessages,
  } = useGetResource({
    key: "GET:MESSAGES",
    route: ApiRoutes.get_all_messages,
    onSuccess({ data }) {
      setMessages(data?.messages || []);
    },
  });

  // const { data: eventsRequest, isLoading: isLoadingEvents } = useGetResource({
  //   key: "GET:DEVICE_EVENTS",
  //   route: `/queues`,
  //   query: { device: "abc" },
  //   refetchInterval: 10 * 1000,
  //   async onSuccess({ data }) {
  //     const { event } = data || {};

  //     if (!event) return;

  //     setEvent(event);

  //     if (event?.command === "check") {
  //       sendAverageWaterFlow();
  //     }

  //     alert(`Dispositivo executando comando "${event?.command}"...`);
  //   },
  //   onError(error) {
  //     setEvent(null);
  //   },
  // });

  const { postResourceAsync: createEventAsync, isLoading: isLoadingCommand } =
    usePostResource({
      key: "CREATE:COMMAND",
      route: `/queues`,
    });

  async function handleOpenValveClick() {
    await createEventAsync({
      device: "abc",
      command: "open",
    });
  }

  async function handleCloseValveClick() {
    await createEventAsync({
      device: "abc",
      command: "close",
    });
  }

  async function handleCheckWaterFlowClick() {
    await createEventAsync({
      device: "abc",
      command: "check",
    });
  }

  const {
    postResourceAsync: createAverageWaterFlowAsync,
    isLoading: isLoadingAverageWaterFlow,
  } = usePostResource({
    key: "CREATE:AVERAGE_WATER_FLOW_REGISTRY",
    route: `/queues/water_flow`,
  });

  async function sendAverageWaterFlow() {
    createAverageWaterFlowAsync({
      device: "abc", // Mac do dispositivo (Esp32);
      average_water_flow: Number((Math.random() * 100).toFixed(2)),
    }).then(() => {
      refetchMessages();
    });
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Página de Simulação</h1>
      <p className="text-xl">
        Dispositivo selecionado: <b>"abc"</b>
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleOpenValveClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Liberar Vazão
        </button>
        <button
          onClick={handleCloseValveClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Fechar Vazão
        </button>
        <button
          onClick={handleCheckWaterFlowClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Verificar Vazão
        </button>
      </div>
      {/* <hr style={{ border: "1px solid gray" }} />
      <h2 className="text-lg font-bold">
        Esp32 Disparando Verificações da Lista de Eventos a cada 10 segundos
      </h2>
      {isLoadingEvents ? (
        <p>Verificando lista de eventos...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {!event ? (
            <p>Fila de eventos está vazia para este dispositivo...</p>
          ) : (
            <div>
              <p>Comando executado...</p>
              <br />
              <p>Dispositivo: {(event as any)?.device}</p>
              <p>Comando: {(event as any)?.command}</p>
            </div>
          )}
        </div>
      )} */}
      <hr style={{ border: "1px solid gray" }} />
      <h2 className="text-lg font-bold">Interface Web - Controle de Vazão.</h2>
      {!messagesIsLoading && messages?.length > 0 ? (
        <ul>
          {messages?.map((message: any, index) => (
            <li key={index}>{message?.content}</li>
          ))}
        </ul>
      ) : messagesIsLoading ? (
        <p>Carregando lista de controle de vazão...</p>
      ) : (
        <p>Nenhuma mensagem de controle de vazão foi encontrada.</p>
      )}
    </div>
  );
}
