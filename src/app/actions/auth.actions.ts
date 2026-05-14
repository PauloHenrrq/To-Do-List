'use server';

import { AuthService } from '@/services/auth.service';
import { RegisterInput } from '@/schemas';

export async function registerAction(data: RegisterInput) {
  try {
    const user = await AuthService.register(data);
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Erro ao registrar usuário.' };
  }
}
