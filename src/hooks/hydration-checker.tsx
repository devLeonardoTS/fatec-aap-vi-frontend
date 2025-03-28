import { useLayoutEffect, useState } from "react";

export function useHydrationCheck({}) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Aguardar até a reidratação do Next.js ser concluída
  useLayoutEffect(() => {
    setIsHydrated(true);
  }, []);

  return { isHydrated };
}
