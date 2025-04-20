"use client";

import { useGetResource, usePostResource } from "@/hooks/request-handlers";
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
  isLoadingAnalytics: boolean;
  isCreatingCommand: boolean;

  analytics: any;
  devicesList: any;
  deviceDetails: any;
  deviceCommands: any;
  selectedDevice: any;

  onSelectDevice: (device: any) => void;
  refreshDeviceCommands: () => void;
  refreshDevicesList: () => void;
  refreshDevice: () => any;

  handleOpenDevice: () => Promise<any>;
  handleCloseDevice: () => Promise<any>;
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

  const [selectedDevice, setSelectedDevice] = useState(null);

  const {
    data: devicesListRequest,
    isLoading: isLoadingDevicesList,
    refetch: refreshDevicesList,
  } = useGetResource({
    key: "GET::DEVICES",
    route: ApiRoutes.get_all_devices,
  });

  const {
    data: deviceRequest,
    isLoading: isLoadingDevice,
    refetch: refreshDevice,
  } = useGetResource({
    key: "GET::DEVICE",
    route: ApiRoutes.get_device(selectedDevice?.token),
    enabled: false,
  });

  const {
    data: deviceCommandsRequest,
    isLoading: isLoadingDeviceCommands,
    refetch: refreshDeviceCommands,
  } = useGetResource({
    key: "GET:DEVICE:COMMANDS",
    route: ApiRoutes.get_device_commands(selectedDevice?.token),
    enabled: Boolean(selectedDevice?.data),
    query: {
      filters: {
        listing_type: "executed",
      },
    },
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
    data: analytics,
    isLoading: isLoadingAnalytics,
    refetch: refreshAnalytics,
  } = useGetResource({
    key: "GET:GENERAL:ANALYTICS",
    route: ApiRoutes.get_devices_analytics,
  });

  const { data: devicesList } = devicesListRequest || [];

  const { data: deviceDetails } = deviceRequest || [];

  const { data: deviceCommands } = deviceCommandsRequest || {};

  function onSelectDevice(device: any) {
    setSelectedDevice(device);
    console.log("Device clicked!", { selectedDevice, device });

    if (isLoadingDevice) return;

    if (selectedDevice?.token === device?.token) {
      setSelectedDevice(null);
      return;
    }

    console.log("Fetching device...");

    setTimeout(() => {
      refreshDevice().then(({ data }) => {
        console.log("Device fetched", data);
        const refreshedSelectedDevice = data?.data;
        setSelectedDevice(refreshedSelectedDevice);
      });
    }, 1000);
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
    isLoadingAnalytics,
    isCreatingCommand,

    analytics,
    devicesList,
    deviceDetails,
    deviceCommands,
    selectedDevice,

    onSelectDevice,

    refreshDeviceCommands,
    refreshDevicesList,
    refreshDevice,
    refreshAnalytics,

    handleOpenDevice,
    handleCloseDevice,
    handleVerifyDeviceWaterFlow,

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
