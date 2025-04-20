"use client";

import { NavRoutes } from "@/lib/routes/nav.routes";
import { useSessionStore } from "@/stores/session-store";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleArrowLeft,
  LayoutPanelLeft,
  NotebookPen,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { cloneElement, useState } from "react";

const navItems = [
  {
    text: "Dashboard",
    icon: <UserIcon />,
    url: NavRoutes.dashboard,
    // others: {
    //   roles_whitelist: [],
    //   min_job_level: 0,
    // },
  },
  {
    text: "Suporte",
    icon: <NotebookPen />,
    url: "#",
    // others: {
    //   roles_whitelist: [],
    //   min_job_level: 0,
    // },
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const { user } = useSessionStore();

  return (
    <aside
      className={`flex flex-col border-r bg-neutral-light h-full transition-all duration-500 ease-in-out shadow-lg ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <motion.div
        className="flex items-center justify-between p-4 border-b-2 border-blue-300"
        layout
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <LayoutPanelLeft size={24} className="text-neutral-700" />
              <span className="font-semibold text-neutral-700">Meu espaço</span>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            ></motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-blue-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <CircleArrowLeft size={20} className="text-neutral-700" />
          </motion.div>
        </motion.button>
      </motion.div>

      <nav className="overflow-auto custom-scrollbar flex-grow">
        <ul className="space-y-1 p-2">
          {navItems.map((item, index) => {
            return (
              <motion.li
                key={index}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                title={item.text}
              >
                <Link
                  href={item.url}
                  className={`flex items-center gap-4 p-3 text-neutral-700 rounded-lg transition-all duration-300 ease-in-out hover:bg-neutral-200 hover:shadow ${
                    !isExpanded && "justify-center"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    {cloneElement(item.icon, {
                      size: 20,
                      className: "transition-colors duration-300",
                    })}
                  </motion.div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {item.text}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
