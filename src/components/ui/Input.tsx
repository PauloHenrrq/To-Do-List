import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export function Input({ label, error, registration, className, ...props }: InputProps) {
  return (
    <div className="space-y-2 w-full text-left">
      <label className="text-sm font-medium text-zinc-300 ml-1">{label}</label>
      <input
        {...registration}
        {...props}
        className={clsx(
          "w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm",
          error && "border-red-500/50 focus:ring-red-500/50",
          className
        )}
      />
      {error && <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>}
    </div>
  );
}
