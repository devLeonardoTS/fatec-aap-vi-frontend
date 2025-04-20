"use client";

import { AlertCircle, BarChart, Droplets, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ProgressSpinner } from "primereact/progressspinner";
import { useDashboardContext } from "./dashboard-context";

function DevicesTable({ devices, isLoading = false }) {
  const { selectedDevice, onSelectDevice } = useDashboardContext();

  return (
    <div className="rounded border max-h-[270px] overflow-auto custom-scrollbar relative">
      <table className="w-full table-auto rounded bg-gradient-to-b from-gray-50 to-white">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10">
          <tr className="[&>th]:px-4 [&>th]:py-1 text-left text-sm font-medium">
            <th className="w-[16%] truncate">Token</th>
            <th className="w-[16%] truncate">Nome</th>
            <th className="w-[44%] truncate">Descrição</th>
            <th className="w-[16%] truncate">Status</th>
            <th className="w-[16%] truncate text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {(!devices?.length || isLoading) && (
            <tr className="transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-1 [&>td]:text-nowrap [&>td]:break-all">
              <td colSpan={5} className="text-center py-2 text-gray-500">
                {isLoading ? "Carregando..." : "Nenhum dispositivo encontrado"}
              </td>
            </tr>
          )}

          {!isLoading &&
            devices?.length > 0 &&
            devices?.map((device, index) => {
              const token = device?.token || "Token não definido";
              const name = device?.name || "Nome não definido";
              const description =
                device?.description || "Descrição não definida";
              const status = device?.status || "N/D";

              return (
                <tr
                  key={index}
                  className={`transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-2 [&>td]:text-nowrap [&>td]:break-all ${
                    selectedDevice?.id === device?.id ? "font-bold" : ""
                  }`}
                >
                  <td className="text-sm text-gray-600 truncate border-r">
                    {token}
                  </td>
                  <td className="text-sm text-gray-600 border-r">
                    <p className="m-0 p-0 truncate">{name}</p>
                  </td>
                  <td className="text-sm text-gray-600 border-r">
                    <p className="m-0 p-0 truncate">{description}</p>
                  </td>
                  <td className="text-sm text-gray-600 border-r">
                    <p className="m-0 p-0 truncate">{status}</p>
                  </td>
                  <td className="md:table-cell text-sm text-gray-600 truncate text-center">
                    <button
                      type="button"
                      className="border rounded px-2 py-1 hover:bg-blue-300 transition-all duration-300 font-normal"
                      onClick={() => onSelectDevice(device)}
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

function SelectedDeviceDetails({ device }) {
  const { handleOpenDevice, handleCloseDevice, handleVerifyDeviceWaterFlow } =
    useDashboardContext();

  return (
    <>
      <div className="border rounded m-4 py-2 px-4">
        <div className="flex flex-col text-center md:text-start">
          <h2 className="text-xl line-clamp-1 break-all whitespace-break-spaces">
            <span className="font-bold">Hidrocontrolador Selecionado</span>
          </h2>
          <p>
            <span className="font-bold">Nome:</span>
            {device?.name || "Nome não definido"}
          </p>
          <p>
            <span className="font-bold">Token: </span>{" "}
            {device?.token || "Token não definido"}
          </p>
        </div>
      </div>

      {/* Device Details Component */}
      <div className="border rounded grid grid-cols-[auto_1fr] gap-4 m-4 py-2 px-4">
        {/* Device Details Menu */}
        <div className="flex flex-col gap-2 md:border-r-2 row-start-2 row-end-3 overflow-auto custom-scrollbar relative pr-2">
          <button
            type="button"
            className="border rounded px-2 py-1 hover:bg-blue-300 transition-all duration-300"
            onClick={() => {
              device?.status === "Aberto"
                ? handleCloseDevice()
                : handleOpenDevice();
            }}
          >
            {device?.status === "Aberto" ? "Fechar Vazão" : "Liberar Vazão"}
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
            onClick={handleVerifyDeviceWaterFlow}
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
          <button
            type="button"
            className="underline hover:text-blue-500 transition-all duration-300"
          >
            Configurações
          </button>
        </div>

        {/* Device Details Area */}
        <div className="flex flex-col gap-2 row-start-2 row-end-3 overflow-auto custom-scrollbar relative">
          <div className="flex-1 p-2 border rounded">
            <div className="flex flex-col">
              <p className="font-bold">Descrição</p>
              <p>{device?.description || "Descrição não definida"}</p>
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
    </>
  );
}

export default function GeneralReportArea() {
  const { analytics, isLoadingAnalytics } = useDashboardContext();

  const {
    total_devices = 0,
    highest_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_average_water_flow_per_hour = [],
  } = analytics?.data || {};

  // --------------------------------------------

  // Sample data for the chart
  const monthMapping = {
    January: "Janeiro",
    February: "Fevereiro",
    March: "Março",
    April: "Abril",
    May: "Maio",
    June: "Junho",
    July: "Julho",
    August: "Agosto",
    September: "Setembro",
    October: "Outubro",
    November: "Novembro",
    December: "Dezembro",
  };

  const monthlyData = Object.entries(monthMapping).map(([month, ptMonth]) => ({
    month: ptMonth,
    flow:
      monthly_average_water_flow_per_hour?.find((m) => m.month === month)
        ?.flow || 0,
  }));

  // Sample data for cost simulation
  const [flowRate, setFlowRate] = useState(1);
  const [costPerCubicMeter, setCostPerCubicMeter] = useState(3.5);
  // const costPerCubicMeter = 3.5; // Example cost per cubic meter

  // Calculate monthly cost based on flow rate
  const calculateMonthlyCost = (flow: number) => {
    // Assuming 30 days per month and 24 hours per day
    const monthlyVolume = flow * 24 * 30;
    return (monthlyVolume * costPerCubicMeter).toFixed(2);
  };

  // Canvas reference for the chart
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Chart dimensions
    const chartWidth = canvas.width - 60;
    const chartHeight = canvas.height - 80;
    const barWidth = chartWidth / monthlyData.length - 10;
    const maxFlow = Math.max(...monthlyData.map((d) => d.flow));
    const scaleY = chartHeight / maxFlow;

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, chartHeight + 30);
    ctx.lineTo(chartWidth + 50, chartHeight + 30);
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw y-axis label
    ctx.save();
    ctx.translate(15, chartHeight / 2 + 20);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#475569";
    ctx.font = "14px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Média de Vazão (M³/h)", 0, 0);
    ctx.restore();

    // Draw x-axis label
    ctx.fillStyle = "#475569";
    ctx.font = "14px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Mês", chartWidth / 2 + 40, chartHeight + 80);

    // Draw bars
    monthlyData.forEach((data, index) => {
      const x = 50 + index * (barWidth + 10);
      const barHeight = data.flow * scaleY;
      const y = chartHeight + 30 - barHeight;

      // Draw bar
      ctx.fillStyle = "#0ea5e9";
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw month label
      ctx.fillStyle = "#475569";
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(data.month, x + barWidth / 2, chartHeight + 50);

      // Draw flow value
      ctx.fillStyle = "#475569";
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(data.flow.toString(), x + barWidth / 2, y - 5);
    });
  }, [monthlyData]);

  // ---------------------------------------------

  if (isLoadingAnalytics) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Relatório Geral de Controle Hídrico
        </h2>
        <div className="flex items-center justify-center">
          <ProgressSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Relatório Geral de Controle Hídrico
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Device Count Card */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 transition-all hover:shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <Droplets className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-700">
              Dispositivos do Usuário
            </h3>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-gray-800">{total_devices}</p>
            <p className="text-sm text-gray-500">Dispositivos ativos</p>
          </div>
        </div>

        {/* Average Flow Card */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 transition-all hover:shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-teal-50 rounded-lg mr-3">
              <TrendingUp className="h-6 w-6 text-teal-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">
                Média Geral da Vazão
              </h3>
              <p className="text-xs text-neutral-700">(Última Hora)</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {(average_water_flow_last_hour * 1).toFixed(2)}{" "}
                <span className="text-lg">M³/h</span>
              </p>
              <p className="text-sm text-gray-500">
                {(average_water_flow_last_hour / 60).toFixed(2)} M³/min
              </p>
            </div>
            <div className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
              Normal
            </div>
          </div>
        </div>

        {/* Highest Flow Device Card */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 transition-all hover:shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-amber-50 rounded-lg mr-3">
              <AlertCircle className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">
                Maior Vazão Detectada
              </h3>
              <p className="text-xs text-neutral-700">(Hoje)</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {highest_water_flow_today}{" "}
                <span className="text-lg">M³/min</span>
              </p>
              <p className="text-sm text-gray-500">
                Dispositivo: Hidrômetro Principal
              </p>
            </div>
            <div className="text-xs px-2 py-1 bg-amber-50 text-amber-600 rounded-full">
              Atenção
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-indigo-50 rounded-lg mr-3">
            <BarChart className="h-6 w-6 text-indigo-500" />
          </div>
          <h3 className="font-semibold text-gray-700">
            Gráfico de Vazão Mensal
          </h3>
        </div>
        <div className="h-80 w-full">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </div>

      {/* Cost Simulation Section */}
      {/* <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-indigo-50 rounded-lg mr-3">
            <CogIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <h3 className="font-semibold text-gray-700">
            Simulação de Vazão x Custo Mensal
          </h3>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="mb-6 ">
            <label
              htmlFor="flow-cost"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Custo por M³
            </label>
            <input
              type="number"
              id="flow-cost"
              onChange={(e) => {
                const value = e.target.value || "0";
                setCostPerCubicMeter(Number.parseFloat(value));
              }}
              value={
                typeof costPerCubicMeter !== "number" ? 0 : costPerCubicMeter
              }
              className="border rounded-md p-2 border-gray-100 bg-gray-50 focus:outline-gray-200 "
            />
          </div>

          <div className="mb-6 ">
            <label
              htmlFor="flow-rate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Vazão Média (M³/h)
            </label>
            <input
              type="number"
              id="flow-rate"
              step={0.01}
              onChange={(e) => setFlowRate(Number.parseFloat(e.target.value))}
              value={typeof flowRate !== "number" ? 0 : flowRate}
              className="border rounded-md p-2 border-gray-100 bg-gray-50 focus:outline-gray-200 "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Volume Mensal</p>
            <p className="text-xl font-bold text-gray-800">
              {(flowRate * 24 * 30).toFixed(2)} M³
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Custo por M³</p>
            <p className="text-xl font-bold text-gray-800">
              R$ {costPerCubicMeter.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">Custo Mensal Estimado</p>
            <p className="text-xl font-bold text-blue-700">
              R$ {calculateMonthlyCost(flowRate)}
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export function DashboardForUsers() {
  const { devicesList, isLoadingDevicesList, selectedDevice } =
    useDashboardContext();

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
            <GeneralReportArea />

            {/*  */}
            <DevicesTable
              devices={devicesList}
              isLoading={isLoadingDevicesList}
            />
          </div>
        </div>

        {/* Chosen Context - Title when Spanning more Content */}
        {selectedDevice && <SelectedDeviceDetails device={selectedDevice} />}
      </div>
    </div>
  );
}
