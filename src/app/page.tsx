import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { TaskService } from '@/services/task.service';
import { TaskForm } from '@/components/TaskForm';
import { TaskContainer } from '@/components/TaskContainer';
import { ListTodo, CheckCircle2, Circle } from 'lucide-react';
import { LogoutButton } from '@/components/LogoutButton';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const tasks = await TaskService.findAllByUserId(session.user.id);
  const completedTasks = tasks.filter(t => t.status === 'Concluída').length;

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 min-h-screen">
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/10 border border-indigo-500/20">
              <ListTodo className="w-6 h-6 text-indigo-500" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">TODO-List</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-medium text-zinc-200">{session.user.name}</span>
              <span className="text-xs text-zinc-500">{session.user.email}</span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1 space-y-8 sm:space-y-12">
        <section className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Olá, {session.user.name?.split(' ')[0]}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            {tasks.length > 0 
              ? `Você tem ${tasks.length} tarefas no total, ${completedTasks} já concluídas.`
              : 'Parece que você não tem tarefas ainda. Vamos começar?'}
          </p>
        </section>

        <section className="p-1 rounded-2xl bg-linear-to-r from-indigo-500/20 via-zinc-800 to-indigo-500/20">
          <div className="bg-zinc-950 rounded-2xl p-4 sm:p-6">
             <TaskForm />
          </div>
        </section>

        <TaskContainer initialTasks={tasks} />
      </main>
    </div>
  );
}
