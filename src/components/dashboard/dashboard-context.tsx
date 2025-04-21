"use client";

import {
  useGetResource,
  usePatchResource,
  usePostResource,
} from "@/hooks/request-handlers";
import { ApiRoutes } from "@/lib/routes/api.routes";
import { useSessionStore } from "@/stores/session-store";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

// Declara todas as variáveis que serão passadas para a UI
// (Mas não implementa a lógica delas, isso é feito dentro do Provider)
interface DashboardContextType {
  isLoadingDevicesList: boolean;
  isLoadingDevice: boolean;
  isLoadingDeviceCommands: boolean;
  isLoadingDeviceAnalytics: boolean;
  isLoadingAnalytics: boolean;
  isCreatingCommand: boolean;

  analytics: any;
  devicesList: any;
  devicesCurrentPage: number;
  devicesLastPage: number;
  deviceAnalytics: any;
  deviceDetails: any;
  deviceCommands: any;
  selectedDevice: any;

  onSelectDevice: (device: any) => void;
  refreshDeviceCommands: () => void;
  refreshDevicesList: () => void;
  refreshDevice: () => any;

  handleDeviceListFilters: ({ filters, page }: any) => void;
  handleCommandListFilters: ({ filters, page }: any) => void;

  handleOpenDevice: () => Promise<any>;
  handleCloseDevice: () => Promise<any>;
  handleScheduleCommand: ({ payload, onSuccess, onError }: any) => Promise<any>;
  handleDeviceConfiguration: ({
    payload,
    onSuccess,
    onError,
  }: any) => Promise<any>;
  handleVerifyDeviceWaterFlow: () => any;

  createCommandAsync: (data: any) => Promise<any>;
}

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

  const [selectedDeviceToken, setSelectedDeviceToken] = useState(null);

  const [selectedDevice, setSelectedDevice] = useState(null);

  const deviceListFilterInit = { filters: {}, page: 1 };
  const [deviceListFilters, setDeviceListFilters] =
    useState(deviceListFilterInit);

  function handleDeviceListFilters({ filters, page }: any) {
    setDeviceListFilters((prev) => ({
      ...prev,
      filters: filters || prev.filters,
      page: page || prev.page,
    }));
  }

  const commandListFilterInit = { filters: {}, page: 1 };
  const [commandListFilters, setCommandListFilters] = useState(
    commandListFilterInit
  );

  function handleCommandListFilters({ filters, page }: any) {
    setCommandListFilters((prev) => ({
      ...prev,
      filters: filters || prev.filters,
      page: page || prev.page,
    }));
  }

  const {
    data: devicesListRequest,
    isLoading: isLoadingDevicesList,
    refetch: refreshDevicesList,
  } = useGetResource({
    key: "GET::DEVICES",
    route: ApiRoutes.get_all_devices,
    query: deviceListFilters,
  });

  const {
    data: deviceRequest,
    isLoading: isLoadingDevice,
    refetch: refreshDevice,
  } = useGetResource({
    key: "GET::DEVICE",
    route: ApiRoutes.get_device(selectedDeviceToken),
    enabled: Boolean(selectedDeviceToken),
  });

  const {
    data: deviceCommandsRequest,
    isLoading: isLoadingDeviceCommands,
    refetch: refreshDeviceCommands,
  } = useGetResource({
    key: "GET:DEVICE:COMMANDS",
    route: ApiRoutes.get_device_commands(selectedDeviceToken),
    enabled: Boolean(selectedDeviceToken),
    refetchInterval: 5 * 1000,
    query: commandListFilters,
  });

  const {
    data: deviceAnalyticsRequest,
    isLoading: isLoadingDeviceAnalytics,
    refetch: refreshDeviceAnalytics,
  } = useGetResource({
    key: "GET:DEVICE:ANALYTICS",
    route: ApiRoutes.get_device_analytics(selectedDeviceToken),
    enabled: Boolean(selectedDeviceToken),
    refetchInterval: 5 * 1000,

    // query: {
    //   filters: {
    //     listing_type: "executed",
    //   },
    // },
  });

  function refreshDeviceStates() {
    refreshDevice().then(({ data }) => {
      console.log("Device fetched", data);
      const refreshedSelectedDevice = data?.data;
      setSelectedDevice(refreshedSelectedDevice);
    });
    refreshDeviceCommands();
    refreshDevicesList();
  }

  const {
    postResourceAsync: createCommandAsync,
    isLoading: isCreatingCommand,
  } = usePostResource({
    key: "POST:DEVICE:COMMAND",
    route: ApiRoutes.post_device_command(selectedDevice?.token),
    onSuccess({ data }) {
      refreshDeviceStates();
    },
  });

  const {
    patchResourceAsync: patchDeviceAsync,
    isLoading: isLoadingDeviceConfiguration,
  } = usePatchResource({
    key: "PATCH:DEVICE",
    route: ApiRoutes.patch_device(selectedDevice?.token),
    onSuccess({ data }) {
      refreshDeviceStates();
    },
  });

  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    refetch: refreshAnalytics,
  } = useGetResource({
    key: "GET:GENERAL:ANALYTICS",
    route: ApiRoutes.get_devices_analytics,
  });

  const { data: devicesList, last_page: devicesLastPage } =
    devicesListRequest || [];

  const { data: deviceDetails } = deviceRequest || [];

  const { data: deviceCommands } = deviceCommandsRequest?.data || {};

  const { data: deviceAnalytics } = deviceAnalyticsRequest || {};

  function onSelectDevice(device: any) {
    if (selectedDeviceToken === device.token) {
      setSelectedDevice(null);
      setSelectedDeviceToken(null);
      return;
    }

    console.log("device", device);

    const toastId = toast.loading("Carregando dados do dispositivo...");

    setSelectedDeviceToken(device?.token);

    setTimeout(async () => {
      refreshDevice()
        .then(({ data }) => {
          console.log("Device fetched", data);
          const refreshedSelectedDevice = data?.data;
          setSelectedDevice(refreshedSelectedDevice);

          toast.update(toastId, {
            type: "success",
            render: "Dados do dispositivo carregados com sucesso",
            isLoading: false,
            autoClose: 5000,
            closeOnClick: true,
          });
        })
        .catch(() => {
          toast.update(toastId, {
            type: "error",
            render: "Erro ao carregar dados do dispositivo",
            isLoading: false,
            autoClose: 5000,
            closeOnClick: true,
          });
        });

      refreshDeviceCommands();
      refreshDeviceAnalytics();
    }, 200);
  }

  async function handleOpenDevice() {
    const toastId = toast.loading("Iniciando liberação de vazão...");

    if (isCreatingCommand) return;

    try {
      await createCommandAsync({
        command: "open",
        device_id: selectedDevice?.id,
      });
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        render:
          "Não foi possível iniciar a liberação da vazão... Tente novamente em alguns segundos.",
        isLoading: false,
        autoClose: 5000,
      });
    }

    refreshDeviceStates();

    toast.update(toastId, {
      type: "success",
      render: "Liberação iniciada com sucesso",
      isLoading: false,
      autoClose: 5000,
    });
  }

  async function handleCloseDevice() {
    const toastId = toast.loading("Iniciando fechamento de vazão...");

    if (isCreatingCommand) return;

    try {
      await createCommandAsync({
        command: "close",
        device_id: selectedDevice?.id,
      });
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        render:
          "Não foi possível iniciar o fechamento da vazão... Tente novamente em alguns segundos.",
        isLoading: false,
        autoClose: 5000,
      });
    }

    refreshDeviceStates();

    toast.update(toastId, {
      type: "success",
      render: "Fechamento iniciado com sucesso.",
      isLoading: false,
      autoClose: 5000,
    });
  }

  async function handleScheduleCommand({
    payload,
    onSuccess = () => {},
    onError = () => {},
  }: any) {
    const toastId = toast.loading("Agendando comando...");

    if (isCreatingCommand) return;

    try {
      await createCommandAsync({
        ...payload,
        device_id: selectedDevice?.id,
      });
    } catch (error) {
      onError();
      toast.update(toastId, {
        type: "error",
        render:
          "Não foi possível agendar o comando... Tente novamente em alguns segundos.",
        isLoading: false,
        autoClose: 5000,
      });
    }

    refreshDeviceCommands();

    onSuccess();

    toast.update(toastId, {
      type: "success",
      render: "Comando agendado com sucesso.",
      isLoading: false,
      autoClose: 5000,
    });
  }

  async function handleDeviceConfiguration({
    payload,
    onSuccess = () => {},
    onError = () => {},
  }: any) {
    const toastId = toast.loading(
      "Atualizando configurações do dispositivo..."
    );

    if (isCreatingCommand) return;

    try {
      await patchDeviceAsync({
        ...payload,
      });
    } catch (error) {
      onError();
      toast.update(toastId, {
        type: "error",
        render:
          "Não foi possível atulizar as configurações... Tente novamente em alguns segundos.",
        isLoading: false,
        autoClose: 5000,
      });
    }

    refreshDevice();

    onSuccess();

    toast.update(toastId, {
      type: "success",
      render: "Configurações atualizadas com sucesso.",
      isLoading: false,
      autoClose: 5000,
    });
  }

  async function handleVerifyDeviceWaterFlow() {
    if (isCreatingCommand) return;

    toast.promise(
      createCommandAsync({
        command: "verify",
        device_id: selectedDevice?.id,
      }),
      {
        pending: "Verificação de vazão iniciada...",
        success: "Verificação iniciada com sucesso.",
        error:
          "Não foi possível iniciar a verificação da vazão... Tente novamente em alguns segundos.",
      }
    );
  }

  const provided = {
    isLoadingDevicesList,
    isLoadingDevice,
    isLoadingDeviceCommands,
    isLoadingDeviceAnalytics,
    isLoadingAnalytics,
    isCreatingCommand,

    analytics,
    devicesList,
    devicesCurrentPage: deviceListFilters.page,
    devicesLastPage,
    deviceAnalytics,
    deviceDetails,
    deviceCommands,
    selectedDevice,

    onSelectDevice,

    refreshDeviceCommands,
    refreshDevicesList,
    refreshDevice,
    refreshAnalytics,

    handleDeviceListFilters,
    handleCommandListFilters,

    handleOpenDevice,
    handleCloseDevice,
    handleScheduleCommand,
    handleVerifyDeviceWaterFlow,
    handleDeviceConfiguration,

    createCommandAsync,
  };

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
