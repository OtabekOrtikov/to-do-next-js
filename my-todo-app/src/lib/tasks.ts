import { iTask } from "@/types/task";
import { join } from "path";
import { promises as fs, stat } from "fs";

const dataFilePath = join(process.cwd(), "src", "data", "tasks.json");

const readTasks = async (): Promise<iTask[]> => {
  const data = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(data) as iTask[];
};

const writeTasks = async (tasks: iTask[]): Promise<void> => {
  await fs.writeFile(dataFilePath, JSON.stringify(tasks, null, 2), "utf-8");
};

const getAllTasks = async (): Promise<iTask[]> => {
  return readTasks();
};

const getTaskByID = async (id: number): Promise<iTask | undefined> => {
  const tasks = await readTasks();
  return tasks.find((task) => task.id === id);
};

const createTask = async (
  title: string,
  startDate: string,
  description?: string,
  dueDate?: string,
  status?: string
): Promise<iTask> => {
  const tasks = await readTasks();
  const newID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  const newTask: iTask = {
    id: newID,
    title: title,
    description: description,
    startDate: startDate,
    dueDate: dueDate,
    status: status || "В плане",
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  return newTask;
};

const updateTask = async (
  id: number,
  title?: string,
  description?: string,
  startDate?: string,
  dueDate?: string,
  status?: string
): Promise<iTask | null> => {
  const tasks = await readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) return null;

  const task = tasks[taskIndex];

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (startDate !== undefined) task.startDate = startDate;

  tasks[taskIndex] = task;
  await writeTasks(tasks);

  return task;
};

const deleteTask = async (id: number): Promise<boolean> => {
  let tasks = await readTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  await writeTasks(tasks);
  return tasks.length < initialLength;
};

export { getAllTasks, getTaskByID, createTask, updateTask, deleteTask };
