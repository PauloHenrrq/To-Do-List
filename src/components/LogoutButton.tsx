'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group cursor-pointer"
      title="Sair"
    >
      <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
    </button>
  );
}
