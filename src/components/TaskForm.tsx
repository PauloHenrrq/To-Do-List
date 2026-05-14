'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { createTaskAction } from '@/app/actions/task.actions';

export function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || loading) return;

    setLoading(true);
    try {
      const result = await createTaskAction({ 
        title, 
        description: description.trim() || undefined,
        status: 'Pendente' 
      });
      if (result.success) {
        setTitle('');
        setDescription('');
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert('Erro ao criar tarefa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center sm:flex-row gap-3 w-full">
      <div className="flex-1 flex flex-col gap-2 w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Adicionar nova tarefa..."
          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm sm:text-base font-semibold placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição (opcional)"
          className="w-full px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="w-full flex items-center justify-center sm:w-auto px-5 py-3 sm:py-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 cursor-pointer"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            <Plus className="w-6 h-6" />
            <span className="sm:hidden font-semibold">Adicionar Tarefa</span>
          </div>
        )}
      </button>
    </form>
  );
}
