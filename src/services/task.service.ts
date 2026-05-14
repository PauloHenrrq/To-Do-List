import prisma from '../lib/prisma';
import { 
  createTaskSchema, 
  updateTaskSchema, 
  type CreateTaskInput, 
  type UpdateTaskInput 
} from '../schemas/task.schema';

export class TaskService {
  static async findAllByUserId(userId: string) {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async create(userId: string, data: CreateTaskInput) {
    const validatedData = createTaskSchema.parse(data);

    return await prisma.task.create({
      data: {
        ...validatedData,
        userId,
      },
    });
  }

  static async update(userId: string, taskId: string, data: UpdateTaskInput) {
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new Error('Tarefa não encontrada ou acesso negado.');
    }

    const validatedData = updateTaskSchema.parse(data);

    return await prisma.task.update({
      where: { id: taskId },
      data: validatedData,
    });
  }

  static async toggleStatus(userId: string, taskId: string) {
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new Error('Tarefa não encontrada ou acesso negado.');
    }

    const newStatus = task.status === 'Pendente' ? 'Concluída' : 'Pendente';

    return await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });
  }

  static async delete(userId: string, taskId: string) {
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new Error('Tarefa não encontrada ou acesso negado.');
    }

    return await prisma.task.delete({
      where: { id: taskId },
    });
  }
}

