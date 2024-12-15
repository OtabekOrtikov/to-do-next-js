import { iTask } from "@/types/task";

export const fetchTasks = (): Promise<iTask[]> => {
  const tasks = fetch("http://localhost:3000/api/tasks")
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return tasks;
};

export const fetchTaskByID = (id: number): Promise<iTask> => {
  const task = fetch(`http://localhost:3000/api/tasks/${id}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return task;
};
