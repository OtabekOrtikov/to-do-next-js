import { getAllTasks, createTask } from "@/lib/tasks";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const tasks = await getAllTasks();
    return NextResponse.json(tasks);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Не удалось получить задания' }, { status: 500 });
  }
}


export const POST = async (req: Request) => {
  const { title, description, startDate, dueDate } = await req.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json(
      { error: "Заголовок обязателен и должен быть строкой" },
      { status: 400 }
    );
  }

  if (
    !startDate ||
    typeof startDate !== "string" ||
    isNaN(new Date(startDate).getTime())
  ) {
    return NextResponse.json(
      { error: "Требуется действительная дата начала" },
      { status: 400 }
    );
  }

  if (
    dueDate !== undefined &&
    (typeof dueDate !== "string" || isNaN(new Date(dueDate).getTime()))
  ) {
    return NextResponse.json(
      { error: "Неверный формат даты" },
      { status: 400 }
    );
  }

  const newTask = await createTask(title, startDate, description, dueDate);
  return NextResponse.json(newTask, { status: 201 });
};
