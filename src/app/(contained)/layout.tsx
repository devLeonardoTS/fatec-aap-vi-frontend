import { Footer } from "@/components/footer/footer";
import { NavMainRibbon } from "@/components/top-navigation/nav-main-ribbon";
import { NavUserRibbon } from "@/components/top-navigation/nav-user-ribbon";
import { PropsWithChildren } from "react";

export default function LayoutContained({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col flex-1 bg-gray-100">
      <div className="bg-neutral-800 text-neutral-200">
        <div className="container mx-auto">
          <NavUserRibbon />
        </div>
      </div>
      <div className="bg-neutral-light text-neutral-800">
        <div className="container mx-auto">
          <NavMainRibbon />
        </div>
      </div>

      <main className="container mx-auto flex flex-1 flex-col bg-white">
        {children}
      </main>

      <div className="bg-neutral-800 text-neutral-200 py-1">
        <div className="container mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
