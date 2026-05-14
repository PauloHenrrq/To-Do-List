'use client';

import { useState, memo } from 'react';
import { Check, Trash2, Edit3, X, Save, Loader2 } from 'lucide-react';
import { updateTaskAction } from '@/app/actions/task.actions';
import { clsx } from 'clsx';
import { type Task } from '@/schemas/task.schema';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description || '');
  const [loading, setLoading] = useState(false);

  const isCompleted = task.status === 'Concluída';

  const handleUpdate = async () => {
    const hasTitleChanged = newTitle.trim() !== task.title;
    const hasDescriptionChanged = newDescription.trim() !== (task.description || '');

    if (!newTitle.trim()) {
      setIsEditing(false);
      setNewTitle(task.title);
      return;
    }

    if (!hasTitleChanged && !hasDescriptionChanged) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    const result = await updateTaskAction(task.id, { 
      title: newTitle,
      description: newDescription.trim() || null
    });
    
    if (result.success) {
      setIsEditing(false);
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  return (
    <div 
      onClick={() => {
        if (!isEditing) onToggle();
      }}
      className={clsx(
        "group relative flex items-center gap-3 sm:gap-4 p-4 rounded-2xl border transition-all cursor-pointer",
        isCompleted ? "bg-zinc-900/30 border-zinc-900" : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 shadow-sm"
    )}>
      <button
        className={clsx(
          "shrink-0 mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer",
          isCompleted 
            ? "bg-indigo-600 border-indigo-600 text-white" 
            : "border-zinc-700 hover:border-indigo-500/50"
        )}
      >
        {isCompleted && <Check className="w-4 h-4" />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div 
            className="flex flex-col gap-2 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <div className='w-full grid grid-cols-1 gap-2'>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdate();
                    if (e.key === 'Escape') {
                      setIsEditing(false);
                      setNewTitle(task.title);
                      setNewDescription(task.description || '');
                    }
                  }}
                  autoFocus
                  placeholder="Título"
                  className="w-full bg-zinc-800 border border-indigo-500/50 rounded-lg px-2 py-1 text-white font-medium focus:outline-none"
                />
                  <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleUpdate();
                    }
                    if (e.key === 'Escape') {
                      setIsEditing(false);
                      setNewTitle(task.title);
                      setNewDescription(task.description || '');
                    }
                  }}
                  placeholder="Adicionar uma descrição..."
                  className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-2 py-1.5 text-zinc-400 text-sm focus:outline-none resize-none"
                  rows={2}
                />
              </div>
              <div className="flex items-center gap-1">
                <button 
                  disabled={loading}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdate();
                  }} 
                  className="p-1 text-green-500 hover:text-green-400 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-[18px] h-[18px]" />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation();
                    setIsEditing(false); 
                    setNewTitle(task.title); 
                    setNewDescription(task.description || '');
                  }} 
                  className="p-1 text-zinc-100 hover:text-zinc-400 cursor-pointer"
                >
                  <X className="w-[19px] h-[19px]" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <span className={clsx(
              "block truncate text-base font-semibold transition-all",
              isCompleted ? "text-zinc-500 line-through" : "text-zinc-100"
            )}>
              {task.title}
            </span>
            {task.description && (
              <p className={clsx(
                "text-sm line-clamp-2 transition-all",
                isCompleted ? "text-zinc-600" : "text-zinc-400"
              )}>
                {task.description}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5">
        {!isEditing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-2 rounded-lg text-zinc-100 hover:text-indigo-400 hover:bg-indigo-400/10 transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 rounded-lg text-zinc-100 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-20">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
        </div>
      )}
    </div>
  );
});

