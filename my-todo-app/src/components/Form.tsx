"use client";

import { iTask } from "@/types/task";
import styles from "@/styles/Form.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface FormProps {
  task?: iTask;
  type: string;
}

export const Form = ({ task, type }: FormProps) => {
  const [status, setStatus] = useState<string>(task?.status || "");
  const [isOpenedSelect, setIsOpenedSelect] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  if (!task && type !== "create")
    return <p className="error">Task not Found</p>;

  const statuses = ["В плане", "В процессе", "Завершено"];

  const handleStatusSelect = (status: string) => {
    setStatus(status);
    setIsOpenedSelect(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string)?.trim() || "";
    const description = (formData.get("description") as string)?.trim() || "";
    const startDate = (formData.get("startDate") as string)?.trim() || "";
    const dueDate = (formData.get("dueDate") as string)?.trim() || "";

    const validationErrors: { [key: string]: string } = {};
    if (!title) validationErrors.title = "Название задачи обязательно.";
    if (!startDate) validationErrors.startDate = "Дата начала обязательна.";
    if (!status) validationErrors.status = "Статус обязателен.";
    if (!dueDate) validationErrors.dueDate = "Срок выполнения обязателен.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const payload = {
      title,
      description: description || "",
      startDate,
      dueDate: dueDate || null,
      status,
    };

    try {
      let response;

      if (type === "edit" && task?.id) {
        response = await fetch(`/api/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else if (type === "create") {
        response = await fetch(`/api/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response || !response.ok) {
        throw new Error("Failed to save the task.");
      }

      const result = await response.json();
      console.log("Task saved successfully:", result);
      router.push("/");
    } catch (error) {
      console.error("Error saving the task:", error);
      alert("Failed to save the task.");
    }
  };

  const handleDeleteBtn = () => {
    fetch(`/api/tasks/${task?.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete the task.");
        }

        console.log("Task deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting the task:", error);
        alert("Failed to delete the task.");
      });
    router.push("/");
  };

  return (
    <form
      onSubmit={type !== "see" ? handleSubmit : undefined}
      className={styles.form}
    >
      <div className={styles.form__group}>
        <label htmlFor="title" className={styles.form__label}>
          Название
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.form__input}
          defaultValue={task?.title || ""}
          disabled={type === "see"}
          required
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>
      <div className={styles.form__group}>
        <label htmlFor="description" className={styles.form__label}>
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.form__textarea}
          defaultValue={task?.description || ""}
          disabled={type === "see"}
        />
      </div>
      <div className={styles.form__group}>
        <label htmlFor="startDate" className={styles.form__label}>
          Дата начала выполнения задачи
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className={styles.form__input}
          defaultValue={
            task?.startDate
              ? new Date(task.startDate).toISOString().split("T")[0]
              : ""
          }
          disabled={type === "see"}
          required
        />
        {errors.startDate && <p className={styles.error}>{errors.startDate}</p>}
      </div>
      <div className={styles.form__group}>
        <label htmlFor="dueDate" className={styles.form__label}>
          Срок выполнения задания
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          className={styles.form__input}
          defaultValue={
            task?.dueDate
              ? new Date(task.dueDate).toISOString().split("T")[0]
              : ""
          }
          disabled={type === "see"}
        />
      </div>
      <div className={styles.form__group}>
        <div className={styles.form__group_item}>
          <label htmlFor="status" className={styles.form__label}>
            Статус
          </label>
          <div
            className={`${styles.form__select} ${
              type === "see" ? styles.disabled : ""
            }`}
            onClick={() => type !== "see" && setIsOpenedSelect(!isOpenedSelect)}
          >
            <div className={styles.form__selected}>
              {status || "Выберите статус"}
            </div>
            {isOpenedSelect && (
              <ul className={styles.form__dropdown}>
                {statuses.map((statusOption) => (
                  <li
                    key={statusOption}
                    className={styles.form__dropdownItem}
                    onClick={() => handleStatusSelect(statusOption)}
                  >
                    {statusOption}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.status && <p className={styles.error}>{errors.status}</p>}
        </div>
        {type !== "see" ? (
          <div className={styles.form__group_item}>
            <p className={styles.form__label}>Отправить</p>
            <button
              type="submit"
              className={`${styles.form__input} ${styles.btn_primary}`}
            >
              <FontAwesomeIcon icon={faSave} />
              Сохранить
            </button>
          </div>
        ) : (
          <div className={styles.form__group_item}>
            <p className={styles.form__label}>Отправить</p>
            <button
              onClick={handleDeleteBtn}
              type="button"
              className={`${styles.form__input} ${styles.btn_primary} ${styles.btn_danger}`}
            >
              <FontAwesomeIcon icon={faSave} />
              Удалить
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
