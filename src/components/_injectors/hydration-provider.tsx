"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { WaterLoading } from "../common/water-loading";

export function HydrationProvider({ children }: PropsWithChildren<{}>) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <>{children}</> : <WaterLoading />}</>;
}
