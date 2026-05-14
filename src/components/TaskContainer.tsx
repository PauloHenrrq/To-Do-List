'use client';

import { useState, useOptimistic, useTransition, useCallback, useMemo } from 'react';
import { TaskFilter } from './TaskFilter';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { ListTodo } from 'lucide-react';
import { toggleTaskStatusAction, deleteTaskAction, createTaskAction } from '@/app/actions/task.actions';
import { type Task } from '@/schemas/task.schema';

interface TaskContainerProps {
  initialTasks: Task[];
}

export function TaskContainer({ initialTasks }: TaskContainerProps) {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isAdding, startAddTransition] = useTransition();
  const [isActionPending, startActionTransition] = useTransition();

  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    initialTasks,
    (state, { type, id, task }: { type: 'toggle' | 'delete' | 'add', id?: string, task?: any }) => {
      if (type === 'toggle') {
        return state.map(t => 
          t.id === id 
            ? { ...t, status: t.status === 'Concluída' ? 'Pendente' : 'Concluída' } 
            : t
        );
      }
      if (type === 'delete') {
        return state.filter(t => t.id !== id);
      }
      if (type === 'add' && task) {
        return [task, ...state];
      }
      return state;
    }
  );

  const handleCreate = useCallback(async (title: string, description?: string) => {
    const tempId = Math.random().toString();
    const newTask = {
      id: tempId,
      title,
      description: description || null,
      status: 'Pendente' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    startAddTransition(async () => {
      addOptimisticTask({ type: 'add', task: newTask });
      await createTaskAction({ title, description, status: 'Pendente' });
    });
  }, [addOptimisticTask]);

  const handleToggle = useCallback((id: string) => {
    startActionTransition(async () => {
      addOptimisticTask({ type: 'toggle', id });
      await toggleTaskStatusAction(id);
    });
  }, [addOptimisticTask]);

  const handleDelete = useCallback((id: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      startActionTransition(async () => {
        addOptimisticTask({ type: 'delete', id });
        await deleteTaskAction(id);
      });
    }
  }, [addOptimisticTask]);

  const filteredTasks = useMemo(() => {
    return optimisticTasks.filter(task => {
      if (activeFilter === 'Todos') return true;
      return task.status === activeFilter;
    });
  }, [optimisticTasks, activeFilter]);

  const counts = useMemo(() => ({
    total: optimisticTasks.length,
    pendente: optimisticTasks.filter(t => t.status === 'Pendente').length,
    concluida: optimisticTasks.filter(t => t.status === 'Concluída').length,
  }), [optimisticTasks]);

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="p-1 rounded-2xl bg-linear-to-r from-indigo-500/20 via-zinc-800 to-indigo-500/20">
        <div className="bg-zinc-950 rounded-2xl p-4 sm:p-6">
          <TaskForm onAdd={handleCreate} isPending={isAdding} />
        </div>
      </section>

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
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={() => handleToggle(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
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
    </div>
  );
}

