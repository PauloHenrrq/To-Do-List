import prisma from '../lib/prisma';
import { 
  createTaskSchema, 
  updateTaskSchema, 
  type CreateTaskInput, 
  type UpdateTaskInput,
  type Task
} from '../schemas/task.schema';

export class TaskService {
  private static readonly taskSelect = {
    id: true,
    title: true,
    description: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  };

  static async findAllByUserId(userId: string): Promise<Task[]> {
    return await prisma.task.findMany({
      where: { userId },
      select: this.taskSelect,
      orderBy: { createdAt: 'desc' },
    }) as Task[];
  }

  static async create(userId: string, data: CreateTaskInput): Promise<Task> {
    const validatedData = createTaskSchema.parse(data);

    return await prisma.task.create({
      data: {
        ...validatedData,
        userId,
      },
      select: this.taskSelect,
    }) as Task;
  }

  static async update(userId: string, taskId: string, data: UpdateTaskInput): Promise<Task> {
    const validatedData = updateTaskSchema.parse(data);

    // O Prisma permite filtrar pelo userId diretamente no update para garantir segurança
    return await prisma.task.update({
      where: { id: taskId, userId },
      data: validatedData,
      select: this.taskSelect,
    }) as Task;
  }

  static async toggleStatus(userId: string, taskId: string): Promise<Task> {
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
      select: { status: true },
    });

    if (!task) {
      throw new Error('Tarefa não encontrada ou acesso negado.');
    }

    const newStatus = task.status === 'Pendente' ? 'Concluída' : 'Pendente';

    return await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
      select: this.taskSelect,
    }) as Task;
  }

  static async delete(userId: string, taskId: string) {
    // Garantimos que o usuário só delete o que é dele
    return await prisma.task.delete({
      where: { id: taskId, userId },
    });
  }
}


