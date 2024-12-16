import { iTask } from "@/types/task";
import styles from "@/styles/TaskList.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

interface TaskListProps {
  tasks: Promise<iTask[]>;
}

const TaskList = async ({ tasks }: TaskListProps) => {
  const data = await tasks;

  return (
    <div className={styles.taskList}>
      <div className={styles.container}>
        <div className={styles.taskList__inner}>
          {data.map((task) => (
            <div className={styles.task} key={task.id}>
              <div className={styles.task_inner}>
                <h2 className={styles.task_title}>{task.title}</h2>
                <Link href={`/edit/${task.id}`} className={styles.task_edit}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={styles.task_edit_icon}
                  />
                </Link>
              </div>
              <p className={styles.task_description}>
                {task.description || "No description"}
              </p>
              <div className={styles.task_bottom}>
                <p className={styles.startDate}>
                  {new Date(task.startDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p
                  className={`${styles.status} ${
                    task.status === "В плане"
                      ? "to-do"
                      : task.status === "Завершено"
                      ? "completed"
                      : task.status === "В процессе"
                      ? "in-progress"
                      : ""
                  }`}
                >
                  {task.status}
                </p>
              </div>
              <Link
                href={`/edit/${task.id}`}
                className={styles.link_after}
              ></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
