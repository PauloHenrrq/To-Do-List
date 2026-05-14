'use client';

import { useState } from 'react';
import { TaskFilter } from './TaskFilter';
import { TaskItem } from './TaskItem';
import { ListTodo } from 'lucide-react';

interface TaskContainerProps {
  initialTasks: any[];
}

export function TaskContainer({ initialTasks }: TaskContainerProps) {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredTasks = initialTasks.filter(task => {
    if (activeFilter === 'Todos') return true;
    return task.status === activeFilter;
  });

  const counts = {
    total: initialTasks.length,
    pendente: initialTasks.filter(t => t.status === 'Pendente').length,
    concluida: initialTasks.filter(t => t.status === 'Concluída').length,
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center sm:items-start gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-300 flex items-center gap-2">
            Suas Tarefas
            <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-500 text-white shadow-sm shadow-indigo-500/20">
              {counts.total}
            </span>
          </h3>
        </div>

        <TaskFilter 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
          counts={counts}
        />
      </div>

      <div className="grid gap-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-6 border-2 border-dashed border-zinc-900 rounded-3xl text-center space-y-4">
            <div className="p-4 rounded-full bg-zinc-900 text-zinc-700">
              <ListTodo className="w-12 h-12" />
            </div>
            <div className="space-y-1">
              <p className="text-zinc-400 font-medium">
                {activeFilter === 'Todos' 
                  ? 'Nenhuma tarefa encontrada' 
                  : `Nenhuma tarefa ${activeFilter.toLowerCase()} encontrada`}
              </p>
              <p className="text-zinc-600 text-sm">Adicione uma tarefa acima para começar a se organizar.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
