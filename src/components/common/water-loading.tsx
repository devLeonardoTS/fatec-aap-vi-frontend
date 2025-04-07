export const WaterLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="relative w-24 h-24">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-300 border-t-blue-500 animate-spin"></div>

        {/* Water container */}
        <div className="absolute inset-2 rounded-full border-2 border-blue-500 overflow-hidden flex items-end">
          {/* Filling water animation */}
          <div
            className="w-full bg-blue-400 absolute animate-pulse"
            style={{
              animation: "fill 2s ease-in-out infinite",
              height: "100%",
              bottom: "-100%",
            }}
          >
            {/* Wave effect on top of water */}
            <div className="absolute top-0 left-0 w-full">
              <div className="relative h-2 bg-blue-300 rounded-full"></div>
              <div className="relative h-1 mt-1 bg-white opacity-30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Central spinning element */}
        <div
          className="absolute inset-6 rounded-full bg-blue-200 border-2 border-blue-400 animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>

      <div className="mt-8 text-blue-700 font-semibold">
        <div className="flex items-center">
          <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
            Carregando
          </span>
          <span className="ml-1 animate-pulse">.</span>
          <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
            .
          </span>
          <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
            .
          </span>
        </div>
      </div>
    </div>
  );
};
