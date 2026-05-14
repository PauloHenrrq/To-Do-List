'use client';

import { clsx } from 'clsx';

interface TaskFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: {
    total: number;
    pendente: number;
    concluida: number;
  };
}

export function TaskFilter({ activeFilter, onFilterChange, counts }: TaskFilterProps) {
  const filters = [
    { state: 'Todos', value: 'Todos', count: counts.total },
    { state: 'Pendentes', value: 'Pendente', count: counts.pendente },
    { state: 'Concluídos', value: 'Concluída', count: counts.concluida },
  ];

  return (
    <div className="flex justify-evenly items-center gap-1.5 p-1.5 border border-zinc-800/50 backdrop-blur-sm rounded-2xl w-full sm:w-fit overflow-x-auto no-scrollbar">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={clsx(
            "relative flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap",
            activeFilter === filter.value 
              ? "bg-zinc-800 text-white shadow-xl shadow-black/20 ring-1 ring-zinc-700/50 cursor-pointer" 
              : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/30 cursor-pointer"
          )}
        >
          {filter.state}
          
          {filter.value !== 'Todos' && (
            <span className={clsx(
              "flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-extrabold transition-all duration-100",
              activeFilter === filter.value
                ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/20"
                : "bg-zinc-800/80 text-zinc-600 border border-zinc-700/50"
            )}>
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
