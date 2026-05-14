'use server';

import { TaskService } from '@/services/task.service';
import { CreateTaskInput, UpdateTaskInput } from '@/schemas';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Não autorizado');
  }
  return session.user.id;
}

export async function createTaskAction(data: CreateTaskInput) {
  try {
    const userId = await getUserId();
    await TaskService.create(userId, data);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTaskAction(taskId: string, data: UpdateTaskInput) {
  try {
    const userId = await getUserId();
    await TaskService.update(userId, taskId, data);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleTaskStatusAction(taskId: string) {
  try {
    const userId = await getUserId();
    await TaskService.toggleStatus(userId, taskId);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTaskAction(taskId: string) {
  try {
    const userId = await getUserId();
    await TaskService.delete(userId, taskId);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
