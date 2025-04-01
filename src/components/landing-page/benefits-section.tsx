"use client";

import { motion } from "framer-motion";
import { BarChart3, Droplets, Leaf, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      icon: <Droplets className="h-8 w-8 text-blue-300" />,
      value: "1,500",
      label: "Galões de Água Salvos",
      description: "Média mensal de economia de água por familia",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-cyan-300" />,
      value: "30%",
      label: "Consumo Reduzido",
      description: "Redução típica em consumo de Água",
    },
    {
      icon: <Leaf className="h-8 w-8 text-teal-300" />,
      value: "12mi",
      label: "Impacto Ambiental",
      description: "Galões de água preservados anualmente",
    },
  ];

  // Generate stable droplet positions
  const dropletPositions = [
    { left: "20%", delay: 0 },
    { left: "35%", delay: 0.3 },
    { left: "50%", delay: 0.6 },
    { left: "65%", delay: 0.9 },
    { left: "80%", delay: 1.2 },
  ];

  return (
    <div className="p-8 bg-neutral-light">
      <section
        ref={sectionRef}
        className="relative py-16 overflow-hidden"
        style={{
          background: "linear-gradient(to right, #2563eb, #3b82f6, #06b6d4)",
        }}
      >
        {/* Top wave divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-12 md:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-black/20"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mt-6 mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible && isMounted
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
            >
              Fazendo a Diferença, Uma Gota Por Vez
            </motion.h2>
            <motion.p
              className="text-blue-100 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible && isMounted
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Junte-se a milhares de imóveis que já estão economizando água e
              dinheiro com as tecnologias inteligentes do hidrocontrolador
              inValve
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isVisible && isMounted
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={
                  isMounted
                    ? { y: -5, transition: { duration: 0.2 } }
                    : undefined
                }
              >
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/5 rounded-full transition-transform duration-500 ease-out group-hover:scale-150"></div>

                <div className="relative z-10">
                  <div className="mx-auto mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-blue-100 font-medium mb-2">{stat.label}</p>
                  <p className="text-blue-100/80 text-sm">{stat.description}</p>
                </div>

                {/* Animated water droplets - only client-side */}
                {isMounted && (
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {dropletPositions.map((pos, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-blue-300/30"
                        style={{
                          left: pos.left,
                          top: "-10%",
                        }}
                        animate={{
                          y: ["0%", "500%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: pos.delay,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 mb-6 text-center">
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isVisible && isMounted
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={isMounted ? { scale: 1.05 } : undefined}
            >
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
              >
                <Waves className="mr-2 h-4 w-4" />
                Economize ainda hoje!
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-6 md:h-12"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-black/20"
            ></path>
          </svg>
        </div>

        {/* Animated background bubbles */}
        {isMounted && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 1 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${20 + Math.random() * 60}px`,
                  height: `${20 + Math.random() * 60}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  x: [0, Math.random() * 50 - 25],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 2,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
