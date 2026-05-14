'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, ListTodo } from 'lucide-react';

import { registerSchema, loginSchema } from '@/schemas';
import { registerAction } from '../actions/auth.actions';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(isRegisterMode ? registerSchema : loginSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    } as AuthFormData
  });

  const onSubmit = async (formData: AuthFormData) => {
    setIsSubmitting(true);
    setFormErrorMessage(null);

    try {
      if (isRegisterMode) {
        const registrationResponse = await registerAction({
          name: formData.name || '',
          email: formData.email,
          password: formData.password,
        });

        if (!registrationResponse.success) {
          setFormErrorMessage(registrationResponse.error || 'Erro ao registrar usuário.');
          setIsSubmitting(false);
          return;
        }

        await handleSignIn(formData.email, formData.password);
      } else {
        await handleSignIn(formData.email, formData.password);
      }
    } catch (error) {
      setFormErrorMessage('Ocorreu um erro inesperado no sistema.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    const signInResult = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      setFormErrorMessage('Credenciais inválidas ou erro na autenticação.');
      return;
    }

    router.push('/');
    router.refresh();
  };

  const handleToggleAuthMode = () => {
    setIsRegisterMode((previousMode) => !previousMode);
    setFormErrorMessage(null);
    reset();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-950">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 rounded-2xl bg-indigo-600/10 mb-4 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <ListTodo className="w-10 h-10 text-indigo-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {isRegisterMode ? 'Criar sua conta' : 'Bem-vindo de volta'}
          </h1>
          <p className="text-zinc-400 mt-2">
            {isRegisterMode 
              ? 'Comece a organizar suas tarefas hoje.' 
              : 'Entre para gerenciar sua Lista de Tarefas.'}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {isRegisterMode && (
              <Input
                label="Nome"
                placeholder="Seu nome completo"
                registration={register('name')}
                error={errors.name?.message}
              />
            )}

            <Input
              label="E-mail"
              type="email"
              placeholder="exemplo@email.com"
              registration={register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              registration={register('password')}
              error={errors.password?.message}
            />

            {formErrorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-in fade-in zoom-in duration-200">
                {formErrorMessage}
              </div>
            )}

            <Button
              type="submit"
              isLoading={isSubmitting}
              leftIcon={isRegisterMode ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            >
              {isRegisterMode ? 'Criar Conta' : 'Acessar Conta'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm">
              {isRegisterMode ? 'Já possui uma conta?' : 'Ainda não tem uma conta?'}
              <button
                onClick={handleToggleAuthMode}
                className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors focus:outline-none focus:underline cursor-pointer"
              >
                {isRegisterMode ? 'Fazer login' : 'Cadastre-se'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
