import { NextResponse } from "next/server";
import { getTaskByID, updateTask, deleteTask } from "@/lib/tasks";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Неправильный ID" }, { status: 400 });
  }

  const task = await getTaskByID(id);
  if (!task) {
    return NextResponse.json({ error: "Задача не найдена" }, { status: 404 });
  }

  return NextResponse.json(task, { status: 200 });
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Неправильный ID" }, { status: 400 });
  }

  const { title, description, dueDate, startDate, status } = await req.json();

  // If dueDate or startDate are provided, validate them
  if (
    dueDate !== undefined &&
    (typeof dueDate !== "string" || isNaN(new Date(dueDate).getTime()))
  ) {
    return NextResponse.json({ error: "Неверная дата" }, { status: 400 });
  }

  if (
    startDate !== undefined &&
    (typeof startDate !== "string" || isNaN(new Date(startDate).getTime()))
  ) {
    return NextResponse.json({ error: "Неверная дата" }, { status: 400 });
  }

  const updated = await updateTask(
    id,
    title,
    description,
    dueDate,
    startDate,
    status
  );
  if (!updated) {
    return NextResponse.json({ error: "Задача не найдена" }, { status: 404 });
  }

  return NextResponse.json(updated, { status: 200 });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Неправильный ID" }, { status: 400 });
  }

  const deleted = await deleteTask(id);
  if (!deleted) {
    return NextResponse.json({ error: "Задача не найдена" }, { status: 404 });
  }

  return new Response(null, { status: 204 });
};
