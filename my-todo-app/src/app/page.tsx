import { iTask } from "@/types/task";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { fetchTasks } from "@/service/service";

export const dynamic = "force-dynamic";

const MainPage = () => {
  const tasks: Promise<iTask[]> = fetchTasks();

  return (
    <>
      <Header />
      <TaskList tasks={tasks} />
    </>
  );
};

export default MainPage;
