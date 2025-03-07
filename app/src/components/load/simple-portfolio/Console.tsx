import React from "react";

type ConsoleError = {
  id: number;
  message: string;
  isNew: boolean;
};

interface ConsoleProps {
  errors: ConsoleError[];
}

const Console: React.FC<ConsoleProps> = React.memo(({ errors }) => {
  return (
    <div className="fixed bottom-5 left-5 w-1/2 h-52 bg-black bg-opacity-90 rounded-md overflow-hidden font-mono text-gray-100 shadow-lg z-50">
      <div className="flex justify-between items-center bg-gray-800 p-2">
        <div className="text-xs text-gray-400">Developer Console</div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
      </div>
      <div className="p-2.5 h-full overflow-y-auto text-xs leading-normal">
        {errors.map((error) => (
          <div
            key={error.id}
            className={`mb-1.5 flex gap-2.5 opacity-80 ${
              error.isNew ? "new-error" : ""
            }`}
          >
            <span className="text-gray-500">
              {new Date().toLocaleTimeString()}
            </span>
            <span className="text-red-400">{error.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Console;
