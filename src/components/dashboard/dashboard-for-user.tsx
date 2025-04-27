"use client";

import { useGetResource, usePostResource } from "@/hooks/request-handlers";
import { ApiRoutes } from "@/lib/routes/api.routes";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  AlertCircle,
  BarChartIcon,
  ChevronLeft,
  ChevronRight,
  Droplets,
  ListIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  SendIcon,
  TicketIcon,
  TrendingUp,
  WavesIcon,
} from "lucide-react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Ripple } from "primereact/ripple";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuthContext } from "../auth-context";
import { useDashboardContext } from "./dashboard-context";

const DashboardNavigationMenu = [
  "Relatório Geral",
  "Meus Hidrocontroladores",
  "Suporte",
];

function litersToCubicMeters(liters) {
  return liters / 1000;
}

function parseCommandName(commandName: string) {
  switch (commandName) {
    case "open":
      return "Liberar Vazão";
    case "close":
      return "Encerrar Vazão";
    case "verify":
      return "Verificar Vazão";
    default:
      return commandName;
  }
}

function parseStatusFromCommand(command: any) {
  if (command.execute_after !== null && command.executed_at === null) {
    return "Agendado";
  }

  if (command.executed_at === null) {
    return "Pendente";
  }

  if (command.executed_at !== null) {
    return "Executado";
  }

  return "Não definido";
}

function DashboardMenuButton({
  label,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      className="relative overflow-hidden w-full p-1 px-4 border rounded-md shadow-md transition-all hover:bg-blue-100"
      {...props}
    >
      {label}
      <Ripple
        pt={{
          root: {
            className: "bg-blue-300",
          },
        }}
      />
    </button>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    // Remove null values
    return pages.filter(Boolean);
  };

  useEffect(() => {
    console.log("pages", generatePageNumbers());
  }, []);

  return (
    <div className="flex items-center justify-center gap-1 text-sm mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {generatePageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function DeviceCountCard() {
  const { analytics } = useDashboardContext();

  const {
    total_devices = 0,
    highest_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = analytics?.data || {};

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 md:col-span-1 border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-50 rounded-lg mr-3">
          <Droplets className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="font-semibold text-gray-700">Dispositivos do Usuário</h3>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-gray-800">{total_devices}</p>
        <p className="text-sm text-gray-500">Dispositivos ativos</p>
      </div>
    </div>
  );
}

function TotalFlowCard({}) {
  const { analytics } = useDashboardContext();

  const {
    total_devices = 0,
    total_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = analytics?.data || {};

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 md:col-span-1 border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-amber-50 rounded-lg mr-3">
          <AlertCircle className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Vazão Total</h3>
          <p className="text-xs text-neutral-700">(Hoje)</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-gray-800 text-center">
          {(total_water_flow_today * 1).toFixed(2)}{" "}
          <span className="text-lg">L</span>
        </p>
        <p className="text-sm text-gray-500">
          Utilize o simulador para calcular custos
        </p>
      </div>
    </div>
  );
}

function LastHourAverageFlowCard({}) {
  const { analytics } = useDashboardContext();

  const {
    total_devices = 0,
    total_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = analytics?.data || {};

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-teal-50 rounded-lg mr-3">
          <TrendingUp className="h-6 w-6 text-teal-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Média Geral da Vazão</h3>
          <p className="text-xs text-neutral-700">(Última Hora)</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center md:flex-row md:gap-12 md:justify-center md:items-end">
        <p className="text-3xl font-bold text-gray-800">
          {(average_water_flow_last_hour * 1).toFixed(2)}{" "}
          <span className="text-lg">L/h</span>
        </p>
        <div className="flex gap-4 md:gap-12">
          <p className="text-sm text-gray-500">
            {litersToCubicMeters(average_water_flow_last_hour).toFixed(2)} M³/h
          </p>
          <p className="text-sm text-gray-500">
            {litersToCubicMeters(average_water_flow_last_hour / 60).toFixed(2)}{" "}
            M³/min
          </p>
        </div>
        {/* <div className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
          Normal
        </div> */}
      </div>
    </div>
  );
}

const HydrometerBarChart = ({ monthlyFlowDataset = [] }) => {
  const sampleData = [
    { month: "January", value: 0 },
    { month: "February", value: 0 },
    { month: "March", value: 0 },
    { month: "April", value: 0 },
    { month: "May", value: 0 },
    { month: "June", value: 0 },
    { month: "July", value: 0 },
    { month: "August", value: 0 },
    { month: "September", value: 0 },
    { month: "October", value: 0 },
    { month: "November", value: 0 },
    { month: "December", value: 0 },
  ];

  const monthTranslations = {
    January: "Jan",
    February: "Fev",
    March: "Mar",
    April: "Abr",
    May: "Mai",
    June: "Jun",
    July: "Jul",
    August: "Ago",
    September: "Set",
    October: "Out",
    November: "Nov",
    December: "Dez",
  };

  const updatedData = sampleData.map(({ month }) => {
    const flowData = monthlyFlowDataset.find((item) => item.month === month);
    return {
      month: monthTranslations[month] || month,
      value: flowData ? litersToCubicMeters(flowData.flow).toFixed(2) : 0,
    };
  });

  return (
    <div className="flex flex-col items-center w-full mx-auto p-4 col-span-2 border bg-white rounded-lg shadow-md">
      <div className="flex self-start mb-4">
        <div className="p-2 bg-indigo-50 rounded-lg mr-3">
          <BarChartIcon className="h-6 w-6 text-indigo-500" />
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-700">
            Gráfico de Vazão Mensal
          </h2>
          <p className="text-xs text-neutral-700">
            (Ano de {new Date().getFullYear()})
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={updatedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#666" }}
            tickLine={{ stroke: "#666" }}
          />
          <YAxis
            label={{
              value: "Soma de Vazão (M³)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
            tick={{ fill: "#666" }}
            tickLine={{ stroke: "#666" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "10px",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Bar
            dataKey="value"
            name="Total em M³"
            fill="#3b82f6"
            animationDuration={1500}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

function GeneralReportArea() {
  const { analytics, isLoadingAnalytics } = useDashboardContext();

  const {
    total_devices = 0,
    highest_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = analytics?.data || {};

  return (
    <div className="grid grid-cols-1 gap-4 shrink-0 md:grid-cols-2">
      <DeviceCountCard />
      <TotalFlowCard />
      <LastHourAverageFlowCard />
      <HydrometerBarChart monthlyFlowDataset={monthly_flow_sum} />
    </div>
  );
}

function UserDevicesTable() {
  const { devicesList, isLoadingDevicesList, selectedDevice, onSelectDevice } =
    useDashboardContext();

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
          {(!devicesList?.length || isLoadingDevicesList) && (
            <tr className="transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-1 [&>td]:text-nowrap [&>td]:break-all">
              <td colSpan={5} className="text-center py-2 text-gray-500">
                {isLoadingDevicesList
                  ? "Carregando..."
                  : "Nenhum dispositivo encontrado"}
              </td>
            </tr>
          )}

          {!isLoadingDevicesList &&
            devicesList?.length > 0 &&
            devicesList?.map((device, index) => {
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

function GlobalSearchForm({
  updateFilters,
}: {
  updateFilters: (search: string) => void;
}) {
  const [search, setSearch] = useState("");

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    updateFilters(search);
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Pesquisar"
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
      >
        <SearchIcon className="w-4 h-4" />
      </button>
    </form>
  );
}

function HandleDeviceShutterButton() {
  const { deviceAnalytics, handleOpenDevice, handleCloseDevice } =
    useDashboardContext();

  const {
    device = {},
    current_flow = {},
    total_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = deviceAnalytics || {};

  const btnLabel =
    device?.status === "Aberto" ? "Fechar Vazão" : "Liberar Vazão";

  return (
    <DashboardMenuButton
      label={btnLabel}
      onClick={
        device?.status === "Aberto" ? handleCloseDevice : handleOpenDevice
      }
    />
  );
}

function ScheduleActionFormModal({ isOpen, onClose }) {
  const { handleScheduleCommand } = useDashboardContext();

  const options = [
    {
      name: "Liberar vazão",
      value: "open",
    },
    {
      name: "Fechar vazão",
      value: "close",
    },
  ];

  const initForm = {
    command: "",
    execute_after: new Date(),
  };

  const [formData, setFormData] = useState(initForm);

  function handleChange(name: keyof typeof formData, value: any) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCloseModal() {
    onClose();
    setFormData(initForm);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (Object.values(formData).some((value) => !value)) {
      toast.error("Todos os campos devem ser preenchidos");
      return;
    }

    if (formData.execute_after < new Date()) {
      toast.error("A data de execução não pode estar no passado");
      return;
    }

    const payload = {
      ...formData,
      execute_after: formData.execute_after.toISOString(),
    };

    handleScheduleCommand({ payload, onSuccess: handleCloseModal });
  }

  return (
    <Modal
      opened={isOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      closeOnClickOutside={false}
      classNames={{
        body: "border border-4 border-neutral-light rounded-md p-4",
      }}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-between items-end">
          <h2 className="text-2xl font-bold">Agendar</h2>
          <p className="text-gray-600 text-sm">Escolha a ação e a data</p>
        </div>
        <div className="flex flex-col gap-4 p-2 border rounded">
          <label htmlFor="action">
            <span className="font-semibold px-2">Ações</span>
            <Dropdown
              id="action"
              value={formData.command}
              onChange={(e) => handleChange("command", e.value)}
              appendTo={document.body}
              options={options}
              optionLabel="name"
              placeholder="Selecione um comando"
              className="w-full border rounded-md"
            />
          </label>
          <label htmlFor="date_time">
            <span className="font-semibold px-2">Data e Hora</span>
            <Calendar
              id="date_time"
              value={
                formData?.execute_after
                  ? new Date(formData.execute_after)
                  : undefined
              }
              onChange={(e) => handleChange("execute_after", e.value)}
              showTime
              hourFormat="24"
              dateFormat="dd/mm/yy"
              className="w-full"
              inputClassName="border rounded-md p-2"
              appendTo={document.body}
            />
          </label>
        </div>

        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <DashboardMenuButton label="Agendar" type="submit" />
          <DashboardMenuButton
            label="Cancelar"
            type="button"
            onClick={handleCloseModal}
          />
        </div>
      </form>
    </Modal>
  );
}

function HandleScheduleActionButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <DashboardMenuButton label="Agendar" onClick={open} />
      <ScheduleActionFormModal isOpen={opened} onClose={close} />
    </>
  );
}

function DeviceCurrentFlowCard() {
  const { deviceAnalytics } = useDashboardContext();

  const {
    device = {},
    current_flow = {},
    total_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = deviceAnalytics || {};

  const deviceStatus = device?.status || "N/D";

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 md:col-span-1 border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-50 rounded-lg mr-3">
          <WavesIcon className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Vazão Atual</h3>
          <p className="text-xs text-neutral-700">
            Última Leitura:{" "}
            {current_flow?.created_at
              ? new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(current_flow?.created_at))
              : "Data não disponível"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center md:flex-row md:gap-12 md:justify-center md:items-end">
        <p className="text-3xl font-bold text-gray-800">
          {((current_flow?.water_flow || 0) * 1).toFixed(2)}{" "}
          <span className="text-lg">L</span>
        </p>
        <div className="text-xs px-2 py-1 rounded-full">
          {deviceStatus === "Aberto" ? (
            <span className="bg-green-50 text-green-600 px-2 py-1">
              Vazão Livre
            </span>
          ) : (
            <span className="bg-orange-50 text-orange-600 px-2 py-1">
              Vazão Fechada
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function DeviceTotalFlowCard({}) {
  const { deviceAnalytics } = useDashboardContext();

  const {
    total_devices = 0,
    total_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = deviceAnalytics || {};

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 md:col-span-1 border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-amber-50 rounded-lg mr-3">
          <AlertCircle className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Vazão Total</h3>
          <p className="text-xs text-neutral-700">(Hoje)</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-gray-800 text-center">
          {(total_water_flow_today * 1).toFixed(2)}{" "}
          <span className="text-lg">L</span>
        </p>
        <p className="text-sm text-gray-500">
          Utilize o simulador para calcular custos
        </p>
      </div>
    </div>
  );
}

function DeviceLastHourAverageFlowCard({}) {
  const { deviceAnalytics } = useDashboardContext();

  const {
    total_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = deviceAnalytics || {};

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-teal-50 rounded-lg mr-3">
          <TrendingUp className="h-6 w-6 text-teal-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Média Geral da Vazão</h3>
          <p className="text-xs text-neutral-700">(Última Hora)</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center md:flex-row md:gap-12 md:justify-center md:items-end">
        <p className="text-3xl font-bold text-gray-800">
          {(average_water_flow_last_hour * 1).toFixed(2)}{" "}
          <span className="text-lg">L/h</span>
        </p>
        <div className="flex gap-4 md:gap-12">
          <p className="text-sm text-gray-500">
            {litersToCubicMeters(average_water_flow_last_hour).toFixed(2)} M³/h
          </p>
          <p className="text-sm text-gray-500">
            {litersToCubicMeters(average_water_flow_last_hour / 60).toFixed(2)}{" "}
            M³/min
          </p>
        </div>
        {/* <div className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
          Normal
        </div> */}
      </div>
    </div>
  );
}

function CommandsTable({ listingType = "" }) {
  const { selectedDevice } = useDashboardContext();

  const {
    data: deviceCommandsRequest,
    isLoading: isLoadingDeviceCommands,
    refetch: refreshDeviceCommands,
  } = useGetResource({
    key: `GET:DEVICE:COMMANDS:${listingType}`,
    route: ApiRoutes.get_device_commands(selectedDevice?.token),
    enabled: true,
    refetchInterval: 5 * 1000,
    query: {
      filters: {
        listing_type: listingType,
      },
      page: 1,
    },
  });

  const { data: deviceCommands } = deviceCommandsRequest?.data || {};

  const [commandList, setCommandList] = useState(deviceCommands || []);

  useEffect(() => {
    if (deviceCommands) {
      setCommandList(deviceCommands);
    }
  }, [deviceCommands]);

  const isScheduledList = listingType.includes("schedule");

  return (
    <div className="rounded border max-h-[150px] overflow-auto custom-scrollbar relative">
      <table className="w-full table-auto rounded bg-gradient-to-b from-gray-50 to-white">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10">
          <tr className="[&>th]:px-4 [&>th]:py-1 text-left text-sm font-medium">
            <th
              className={
                isScheduledList ? "w-[60%] truncate" : "w-[70%] truncate"
              }
            >
              Comando
            </th>
            <th
              className={
                isScheduledList ? "w-[20%] truncate" : "w-[30%] truncate"
              }
            >
              Status
            </th>
            {isScheduledList && <th className="w-[20%]">Execução em</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {!deviceCommands?.length && (
            <tr className="transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-1 [&>td]:text-nowrap [&>td]:break-all">
              <td
                colSpan={isScheduledList ? 3 : 2}
                className="text-center py-2 text-gray-500"
              >
                {isScheduledList
                  ? "Nenhum comando agendado..."
                  : "Nenhum comando a ser executado..."}
              </td>
            </tr>
          )}

          {commandList?.length > 0 &&
            commandList?.map((command, index) => {
              const commandName = command?.command || "Nome não definido";
              const status = command?.status || "N/D";

              return (
                <tr
                  key={index}
                  className={`transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-2 [&>td]:text-nowrap [&>td]:break-all`}
                >
                  <td className="text-sm text-gray-600 truncate border-r">
                    {parseCommandName(commandName)}
                  </td>
                  <td className="text-sm text-gray-600 border-r">
                    <p className="m-0 p-0 truncate">
                      {parseStatusFromCommand(command)}
                    </p>
                  </td>
                  {isScheduledList && (
                    <td className="text-sm text-gray-600">
                      <p className="m-0 p-0 truncate">
                        {command?.execute_after
                          ? new Intl.DateTimeFormat("pt-BR", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }).format(new Date(command.execute_after))
                          : "Data não disponível"}
                      </p>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

function DeviceCommandsTablesArea({}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-green-50 rounded-lg mr-3">
          <ListIcon className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Fila de Comandos</h3>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-1 font-semibold">Aguardando Execução</p>
          <CommandsTable listingType={"basic_unexecuted"} />
        </div>

        <div>
          <p className="mb-1 font-semibold">Comandos Agendados</p>
          <CommandsTable listingType={"scheduled_unexecuted"} />
        </div>
      </div>
      {/* <CommandsTable listingType={"basic_unexecuted"} /> */}
    </div>
  );
}

function DeviceConfigurationModal({ isOpen, onClose }) {
  const { deviceDetails, handleDeviceConfiguration } = useDashboardContext();

  const initForm = {
    name: deviceDetails?.name || "",
    description: deviceDetails?.description || "",
  };

  const [formData, setFormData] = useState(initForm);

  function handleChange(name: keyof typeof formData, value: any) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCloseModal() {
    onClose();
    setFormData(initForm);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
    };

    handleDeviceConfiguration({ payload, onSuccess: handleCloseModal });
  }

  useEffect(() => {
    console.log("selected device", deviceDetails);
    if (deviceDetails) {
      setFormData((prev) => ({
        ...prev,
        name: deviceDetails?.name || "",
        description: deviceDetails?.description || "",
      }));
    }
  }, [isOpen]);

  return (
    <Modal
      opened={isOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      closeOnClickOutside={false}
      classNames={{
        body: "border border-4 border-neutral-light rounded-md p-4",
      }}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-between items-end">
          <h2 className="text-2xl font-bold">Configuração</h2>
          <p className="text-gray-600 text-sm">Atualize seu dispositivo</p>
        </div>
        <div className="flex flex-col gap-4 p-2 border rounded">
          <label htmlFor="name">
            <span className="font-semibold px-2 mb-1">Nome</span>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border rounded-md px-2 py-1"
            />
          </label>
          <label htmlFor="description">
            <span className="font-semibold px-2 mb-1">Descrição</span>
            <InputText
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border rounded-md px-2 py-1"
            />
          </label>
        </div>

        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <DashboardMenuButton label="Atualizar" type="submit" />
          <DashboardMenuButton
            label="Cancelar"
            type="button"
            onClick={handleCloseModal}
          />
        </div>
      </form>
    </Modal>
  );
}

function HandleDeviceConfigurationButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <DashboardMenuButton label="Configurações" onClick={open} />
      <DeviceConfigurationModal isOpen={opened} onClose={close} />
    </>
  );
}

function UserDeviceDetailsArea() {
  const { deviceAnalytics, isLoadingAnalytics } = useDashboardContext();

  const {
    device = {},
    total_devices = 0,
    highest_water_flow_today = 0,
    average_water_flow_last_hour = 0,
    monthly_flow_sum = [],
  } = deviceAnalytics || {};

  return (
    <div className="flex flex-col gap-4 border rounded-md shadow-md p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <HandleDeviceShutterButton />
        <HandleScheduleActionButton />
        {/* <DashboardMenuButton label="Agenda e Históricos" /> */}
        <div className="col-span-2 md:col-span-1">
          <HandleDeviceConfigurationButton />
        </div>
      </div>

      <hr />

      <div className="p-2 text-center border rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-2">Relatório Geral InValve</h2>
        <div className="flex gap-4 items-center justify-center">
          <p className="text-sm">
            <span className="font-semibold">Token:</span>{" "}
            {device.token || "Token não definido"}
          </p>{" "}
          |
          <p className="text-sm">
            <span className="font-semibold">Dispositivo:</span>{" "}
            {device.name || "Nome não definido"}
          </p>
        </div>
        <div>
          <p className="text-sm">
            {device.description || "Descrição nao definida"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 shrink-0 md:grid-cols-2">
        <DeviceCommandsTablesArea />
        <DeviceCurrentFlowCard />
        <DeviceTotalFlowCard />
        <DeviceLastHourAverageFlowCard />
        <HydrometerBarChart monthlyFlowDataset={monthly_flow_sum} />
      </div>
    </div>
  );
}

function UserHydrocontrollerArea() {
  const {
    devicesList,
    devicesCurrentPage,
    devicesLastPage,
    isLoadingDevicesList,
    selectedDevice,
    handleDeviceListFilters,
    onSelectDevice,
  } = useDashboardContext();

  function updateFilters(search: string) {
    handleDeviceListFilters({
      filters: {
        global: search,
      },
    });
  }

  return (
    <div>
      <div className="mb-4">
        <GlobalSearchForm updateFilters={updateFilters} />
        <UserDevicesTable />
        <Pagination
          currentPage={devicesCurrentPage}
          totalPages={devicesLastPage}
          onPageChange={(page) => {
            handleDeviceListFilters({
              page,
            });
          }}
        />
        <hr className="mt-4" />
      </div>
      {selectedDevice && <UserDeviceDetailsArea />}
    </div>
  );
}

function TicketsTable({}) {
  const {
    ticketsList,
    isLoadingTicketList,
    refreshTicketList,
    onSelectTicket,
    selectedTicket,
  } = useDashboardContext();

  useEffect(() => {
    refreshTicketList();
  }, []);

  return (
    <div className="rounded border max-h-[270px] overflow-auto custom-scrollbar relative">
      <table className="w-full table-auto rounded bg-gradient-to-b from-gray-50 to-white">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white sticky top-0 z-10">
          <tr className="[&>th]:px-4 [&>th]:py-1 text-left text-sm font-medium">
            <th className="w-[16%] truncate">Status</th>
            <th className="w-[16%] truncate">Titulo</th>
            <th className="w-[16%] truncate">Descrição</th>
            <th className="w-[16%] truncate">Criado em</th>
            <th className="w-[16%] truncate">Última atualização</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {(!ticketsList?.length || isLoadingTicketList) && (
            <tr className="transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-1 [&>td]:text-nowrap [&>td]:break-all">
              <td colSpan={5} className="text-center py-2 text-gray-500">
                {isLoadingTicketList
                  ? "Carregando..."
                  : "Nenhum ticket encontrado..."}
              </td>
            </tr>
          )}

          {!isLoadingTicketList &&
            ticketsList?.length > 0 &&
            ticketsList?.map((ticket, index) => {
              const title = ticket?.title || "Título não definido";
              const status = ticket?.status || "Status não definido";
              const description =
                ticket?.description || "Descrição não definida";
              const createdAt =
                ticket?.created_at || "Data de criação não definida";
              const updatedAt =
                ticket?.updated_at || "Data de atualização não definida";

              const isSelected = selectedTicket?.id === ticket?.id;

              return (
                <tr
                  key={index}
                  className={`transition-colors duration-200 ease-in-out hover:bg-blue-50 [&>td]:px-4 [&>td]:py-2 [&>td]:text-nowrap [&>td]:break-all hover:cursor-pointer ${
                    isSelected ? "font-bold" : ""
                  }`}
                  onClick={() => onSelectTicket(ticket)}
                >
                  <td className="text-sm text-gray-600 truncate border-r">
                    {status}
                  </td>
                  <td className="text-sm text-gray-600 truncate border-r">
                    {title}
                  </td>
                  <td className="text-sm text-gray-600 truncate border-r">
                    {description}
                  </td>
                  <td className="text-sm text-gray-600 border-r">
                    <p className="m-0 p-0 truncate">
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(createdAt))}
                    </p>
                  </td>
                  <td className="text-sm text-gray-600 border-r">
                    <p className="m-0 p-0 truncate">
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(updatedAt))}
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

function NewTicketFormModal({ isOpen, onClose }) {
  const { handleRegisterTicket } = useDashboardContext();

  const initForm = {
    title: "",
    description: "",
  };

  const [formData, setFormData] = useState(initForm);

  function handleChange(name: keyof typeof formData, value: any) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCloseModal() {
    onClose();
    setFormData(initForm);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (Object.values(formData).some((value) => !value)) {
      toast.error("Todos os campos devem ser preenchidos");
      return;
    }

    const payload = {
      ...formData,
    };

    handleRegisterTicket({ payload, onSuccess: handleCloseModal });
  }

  return (
    <Modal
      opened={isOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      closeOnClickOutside={false}
      classNames={{
        body: "border border-4 border-neutral-light rounded-md p-4",
      }}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-between items-end">
          <h2 className="text-2xl font-bold">Novo Ticket</h2>
          <p className="text-gray-600 text-sm">Descreva a situação</p>
        </div>
        <div className="flex flex-col gap-4 p-2 border rounded">
          <label htmlFor="title">
            <span className="font-semibold px-2">Título</span>
            <InputText
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </label>
          <label htmlFor="description">
            <span className="font-semibold px-2">Descrição</span>
            <InputText
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </label>
        </div>

        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <DashboardMenuButton label="Registrar" type="submit" />
          <DashboardMenuButton
            label="Cancelar"
            type="button"
            onClick={handleCloseModal}
          />
        </div>
      </form>
    </Modal>
  );
}

function HandleNewTicketButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <DashboardMenuButton label="Novo Ticket" onClick={open} />
      <NewTicketFormModal isOpen={opened} onClose={close} />
    </>
  );
}

function TicketDetails() {
  const { ticketDetails, isLoadingTicketDetails, handleChangeTicketStatus } =
    useDashboardContext();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 md:col-span-1 border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center">
        <div className="p-2 bg-blue-50 rounded-lg mr-3">
          <TicketIcon className="h-6 w-6 text-blue-500" />
        </div>
        <div className="w-full">
          <div>
            <h3 className="font-semibold text-gray-700">
              #{ticketDetails?.id} - Ticket:{" "}
              {ticketDetails?.title || "Título não definido"}
            </h3>
            <p className="text-xs text-neutral-700">
              Criado em:{" "}
              {ticketDetails?.created_at
                ? new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(ticketDetails.created_at))
                : "Data não disponível"}
            </p>
            <p className="text-xs text-neutral-700">
              Última atualização:{" "}
              {ticketDetails?.updated_at
                ? new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(ticketDetails.updated_at))
                : "Data não disponível"}
            </p>
          </div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full">
          {ticketDetails?.status === "Aberto" ? (
            <span className="bg-green-50 text-green-600 px-2 py-1">Aberto</span>
          ) : (
            <span className="bg-orange-50 text-orange-600 px-2 py-1">
              Encerrado
            </span>
          )}
          {!ticketDetails?.status && (
            <span className="bg-gray-50 text-gray-600 px-2 py-1">
              Status não definido
            </span>
          )}
        </div>
      </div>

      <div className="mt-2">
        <DashboardMenuButton
          label={
            ticketDetails?.status === "Aberto"
              ? "Encerrar Ticket"
              : "Reabrir Ticket"
          }
          onClick={handleChangeTicketStatus}
        />
      </div>

      <hr className="my-2" />

      <div className="flex flex-col gap-2 border rounded-md p-4 shadow-md">
        <h3 className="font-semibold text-gray-700">Descrição</h3>
        <hr />
        <p className="text-neutral-700">
          {ticketDetails?.description || "Detalhes não foram definidos"}
        </p>
      </div>
    </div>
  );
}

function ChatComment({ comment }: any) {
  const { user } = useAuthContext();

  const { comment: content, user_id, created_at } = comment;

  const user_fullname =
    comment?.user?.profile?.full_name || "Usuário não identificado";

  const reversed = user_id === user?.id;

  return (
    <div
      className={`flex ${
        reversed ? "justify-end" : "justify-start"
      } my-2 w-full`}
    >
      <div
        className={`
          max-w-[80%] 
          rounded-2xl 
          px-4 
          py-3 
          shadow-sm
          ${
            reversed
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }
        `}
      >
        <div className="flex items-center mb-1">
          <p className="font-medium text-sm">{user_fullname}</p>
        </div>
        <p className={`${reversed ? "text-white" : "text-gray-700"}`}>
          {content}
        </p>
        <p
          className={`text-xs mt-1 ${
            reversed ? "text-blue-100 text-end" : "text-gray-500"
          }`}
        >
          {created_at
            ? new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(created_at))
            : "Data não disponível"}
        </p>
      </div>
    </div>
  );
}

function TicketChat() {
  const [message, setMessage] = useState("");

  const {
    selectedTicket,
    ticketComments,
    isLoadingTicketComments,
    refreshTicketComments,
  } = useDashboardContext();

  const { postResourceAsync: sendCommentAsync, isLoading: isSendingComment } =
    usePostResource({
      key: "POST:TICKET:COMMENT",
      route: ApiRoutes.post_ticket_comment(selectedTicket?.id),
      onSuccess: () => {
        refreshTicketComments();
      },
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message) {
      return;
    }

    toast.promise(
      sendCommentAsync({
        comment: message,
      }),
      {
        pending: "Enviando mensagem...",
        success: "Mensagem enviada com sucesso",
        error: "Erro ao enviar mensagem",
      }
    );
  }

  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [ticketComments]);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border col-span-2 md:col-span-1 border-gray-100 transition-all hover:shadow-lg relative custom-scrollbar">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 rounded-lg mr-3">
            <MessageCircleMoreIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div className="w-full">
            <div>
              <h3 className="font-semibold text-gray-700">Fale conosco</h3>
            </div>
          </div>
        </div>
        {/* Chat Area */}
        <div className="flex flex-col gap-2 w-full border rounded p-2">
          <div
            ref={chatAreaRef}
            className="flex flex-col gap-2 p-2 max-h-[270px] overflow-auto custom-scrollbar"
          >
            {!ticketComments?.length && <p>Nenhuma mensagem encontrada</p>}
            {ticketComments?.map((comment, index) => (
              <Fragment key={index}>
                <ChatComment comment={comment} />
              </Fragment>
            ))}
          </div>
        </div>
        {/* Chatbox */}
        <div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="w-full">
              <InputText
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Digite sua mensagem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="self-center">
              <button
                type="submit"
                className="relative overflow-hidden w-full p-2 px-4 border rounded-md shadow-md transition-all hover:bg-blue-100"
              >
                <Ripple
                  pt={{
                    root: {
                      className: "bg-blue-200",
                    },
                  }}
                />
                <SendIcon className="h-4 w-4 text-blue-500" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SupportArea() {
  const {
    selectedTicket,
    isLoadingTicketDetails,
    handleTicketListFilters,
    ticketsCurrentPage,
    ticketsLastPage,
    refreshTicketList,
  } = useDashboardContext();

  function updateFilters(search: string) {
    handleTicketListFilters({
      filters: {
        global: search,
      },
    });

    refreshTicketList();
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold border rounded-md shadow-md p-2">
        Área de Suporte
      </h2>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div className="border rounded p-2 w-full col-span-full md:col-span-1">
            <HandleNewTicketButton />
          </div>
          <div className="col-span-full md:col-span-1 overflow-auto">
            <div className="p-1">
              <GlobalSearchForm updateFilters={updateFilters} />
            </div>
            <TicketsTable />
            <Pagination
              currentPage={ticketsCurrentPage}
              totalPages={ticketsLastPage}
              onPageChange={() => {}}
            />
          </div>
        </div>
        {selectedTicket && (
          <div className="grid grid-cols-2 gap-4">
            {isLoadingTicketDetails ? (
              <p>Carregando...</p>
            ) : (
              <>
                <TicketDetails />
                <TicketChat />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardForUsers() {
  // Handles navigation state throughout the dashboard.
  const [selectedMenu, setSelectedMenu] = useState(DashboardNavigationMenu[0]);

  return (
    <div className="flex flex-col gap-4 m-4 p-4 border rounded">
      <div className="flex flex-wrap md:flex-nowrap gap-2">
        {DashboardNavigationMenu.map((label, index) => (
          <DashboardMenuButton
            key={index}
            label={label}
            onClick={() => {
              setSelectedMenu(label);
            }}
          />
        ))}
      </div>

      {selectedMenu === DashboardNavigationMenu[0] && <GeneralReportArea />}

      {selectedMenu === DashboardNavigationMenu[1] && (
        <UserHydrocontrollerArea />
      )}

      {selectedMenu === DashboardNavigationMenu[2] && <SupportArea />}
    </div>
  );
}
