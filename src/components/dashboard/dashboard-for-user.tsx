"use client";

function DevicesTable({ devices, isLoading = false }) {
  return (
    <div className="rounded border max-h-[270px] overflow-auto custom-scrollbar relative">
      <table className="w-full table-auto rounded bg-gradient-to-b from-gray-50 to-white">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10">
          <tr className="[&>th]:px-4 [&>th]:py-1 text-left text-sm font-medium">
            {/* <th className="w-[16%]">ID</th> */}
            <th className="w-[16%] truncate">Token</th>
            <th className="w-[68%] truncate">Descrição</th>
            <th className="w-[16%] truncate text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {!devices?.length && (
            <tr className="transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-1 [&>td]:text-nowrap [&>td]:break-all">
              <td colSpan={3} className="text-center py-2 text-gray-500">
                {isLoading ? "Carregando..." : "Nenhum dispositivo encontrado"}
              </td>
            </tr>
          )}
          {!isLoading &&
            devices?.length > 0 &&
            devices?.map((device, index) => {
              const { token = "", description = null } = device || {};

              return (
                <tr
                  key={index}
                  className="transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-2 [&>td]:text-nowrap [&>td]:break-all"
                >
                  <td className="text-sm text-gray-600 truncate border-r">
                    {token}
                  </td>
                  <td className="text-sm text-gray-600 border-r">
                    <p className="m-0 p-0 truncate">{description}</p>
                  </td>
                  <td className="md:table-cell text-sm text-gray-600 truncate text-center">
                    <button
                      type="button"
                      className="border rounded px-2 py-1 hover:bg-blue-300 transition-all duration-300"
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardForUsers() {
  const devices = [
    {
      token: "ABC123",
      description: "Dispositivo 1",
    },
    {
      token: "312qwd",
      description: "Dispositivo 2",
    },
    {
      token: "awdqe1",
      description: "Dispositivo 3",
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex-shrink-0">
        <div className="border rounded m-4 py-2 px-4">
          <h1 className="text-2xl">Seu InValve</h1>
        </div>

        <div className="border rounded grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 m-4 p-4">
          <div className="flex flex-col md:items-start gap-2 p-4 border rounded">
            <button
              type="button"
              className="underline hover:text-blue-500 transition-all duration-300"
            >
              Relatório Geral
            </button>
            <button
              type="button"
              className="underline hover:text-blue-500 transition-all duration-300"
            >
              Meus Hidrocontroladores
            </button>
            <button
              type="button"
              className="underline hover:text-blue-500 transition-all duration-300"
            >
              Suporte
            </button>
          </div>

          {/* Chosen Context - Hidrocontrolers Table */}
          <div className="p-4 border rounded">
            {/* Chosen Context - General Report */}
            <div className="flex flex-col gap-2 row-start-2 row-end-3 overflow-auto custom-scrollbar relative">
              <div className="flex gap-2">
                <p className="font-bold">Qtd de Dispositivos do Usuário</p>
                <p>2</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">Média Geral da Vazão</p>
                <p>10 M³/h</p>
                <p>0,3 M³/min</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">
                  Dispositivo com Maior Vazão Detectada
                </p>
                <p>Nome do Dispositivo</p>
              </div>

              <div className="flex flex-col">
                <p>Gráfico "Y - Vazão" - "X - Mês"</p>
              </div>

              <div>
                Simulação de vazão x custo mensal com base na conta do usuário
              </div>
            </div>

            {/*  */}
            <DevicesTable devices={devices} isLoading={false} />
          </div>
        </div>

        {/* Chosen Context - Title when spanning more content*/}
        <div className="border rounded m-4 py-2 px-4">
          <div className="flex flex-col">
            <h2 className="text-xl">Hidrocontrolador: ID - Nome</h2>
            <p>Descrição aqui</p>
          </div>
        </div>

        {/* Device Details Component */}
        <div className="border rounded grid grid-cols-[auto_1fr] gap-4 m-4 py-2 px-4">
          {/* Device Details Menu */}
          <div className="flex flex-col gap-2 md:border-r-2 row-start-2 row-end-3 overflow-auto custom-scrollbar relative pr-2">
            <button
              type="button"
              className="border rounded px-2 py-1 hover:bg-blue-300 transition-all duration-300"
            >
              Liberar / Bloquear
            </button>
            <button
              type="button"
              className="border rounded px-2 py-1 hover:bg-blue-300 transition-all duration-300"
            >
              Agendar Ação
            </button>
            <button
              type="button"
              className="border rounded px-2 py-1 hover:bg-blue-300 transition-all duration-300"
            >
              Verificar Vazão
            </button>
            <button
              type="button"
              className="underline hover:text-blue-500 transition-all duration-300"
            >
              Agenda
            </button>
            <button
              type="button"
              className="underline hover:text-blue-500 transition-all duration-300"
            >
              Histórico de Execução
            </button>
          </div>

          {/* Device Details Area */}
          <div className="flex flex-col gap-2 row-start-2 row-end-3 overflow-auto custom-scrollbar relative">
            <div className="p-2 border rounded">
              <div className="flex flex-col">
                <p className="font-bold">Descrição</p>
                <p>Descrição do dispositivo configurada pelo usuário</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">Estado Atual</p>
                <p>ABERTO</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">Vazão</p>
                <p>10 M³/h</p>
                <p>0,3 M³/min</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">Última Verificação</p>
                <p>25/12/2024 às 11:20</p>
              </div>

              <div className="flex flex-col">
                <p>Gráfico "Y - Vazão" - "X - Mês"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
