import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateTaskSchema } from "@/schemas";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/tasks/[id]
 * Atualiza uma tarefa existente.
 */
export async function PATCH(req: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = updateTaskSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: result.error.format() },
        { status: 400 }
      );
    }

    const existingTask = await prisma.task.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: "Tarefa não encontrada ou não autorizada" },
        { status: 404 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: result.data,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("[TASK_PATCH]", error);
    return NextResponse.json(
      { error: "Erro ao atualizar tarefa" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/[id]
 * Remove uma tarefa existente.
 */
export async function DELETE(_req: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const existingTask = await prisma.task.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: "Tarefa não encontrada ou não autorizada" },
        { status: 404 }
      );
    }

    await prisma.task.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[TASK_DELETE]", error);
    return NextResponse.json(
      { error: "Erro ao deletar tarefa" },
      { status: 500 }
    );
  }
}
