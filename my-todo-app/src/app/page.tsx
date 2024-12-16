import { iTask } from "@/types/task";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { fetchTasks } from "@/service/service";

export const dynamic = "force-dynamic";

const MainPage = async () => {
  const tasks: Promise<iTask[]> = fetchTasks();
  const tasksArray = await fetchTasks();

  return (
    <>
      <Header />
      {tasksArray.length > 0 ? <TaskList tasks={tasks} /> : <p className="text_danger">Задачи не найдены</p>}
    </>
  );
};

export default MainPage;
