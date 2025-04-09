import { Footer } from "@/components/footer/footer";
import { NavMainRibbon } from "@/components/top-navigation/nav-main-ribbon";
import { NavUserRibbon } from "@/components/top-navigation/nav-user-ribbon";
import { PropsWithChildren } from "react";

export default function LayoutFluid({ children }: PropsWithChildren) {
  // return (
  //   <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]">
  //     {/* A: Main Navigation */}
  //     <div className="col-span-2">
  //       <div className="bg-neutral-800 text-neutral-200">
  //         <div className="">
  //           <NavUserRibbon isFluid />
  //         </div>
  //       </div>
  //       <div className="bg-neutral-light text-neutral-800">
  //         <div className="">
  //           <NavMainRibbon isFluid />
  //         </div>
  //       </div>
  //     </div>

  //     {/* B: User Side Menu */}
  //     <div className="min-h-screen row-start-2 row-end-3 overflow-auto custom-scrollbar relative">
  //       <Sidebar />
  //     </div>

  //     {/* C: Content Area */}
  //     <main className="row-start-2 row-end-3 overflow-auto custom-scrollbar relative">
  //       {children}
  //     </main>

  //     {/* D: Footer */}
  //     <div className="bg-neutral-800 text-neutral-200 text-center py-2 px-4 col-span-2">
  //       <Footer />
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen flex flex-col flex-1 bg-gray-100">
      <div className="bg-neutral-800 text-neutral-200">
        <div className="">
          <NavUserRibbon isFluid />
        </div>
      </div>
      <div className="bg-neutral-light text-neutral-800">
        <div className="">
          <NavMainRibbon isFluid />
        </div>
      </div>

      <main className="flex flex-1 flex-col bg-white">{children}</main>

      <div className="bg-neutral-800 text-neutral-200 py-1">
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
}
