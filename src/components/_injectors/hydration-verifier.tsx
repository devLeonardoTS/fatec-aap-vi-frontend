"use client";

import { PropsWithChildren, useLayoutEffect, useState } from "react";
import { WaterLoading } from "../common/water-loading";

export function HydrationVerifier({ children }: PropsWithChildren<{}>) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useLayoutEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <>{children}</> : <WaterLoading />}</>;
}
