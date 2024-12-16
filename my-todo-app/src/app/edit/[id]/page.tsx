"use client";

import Header from "@/components/Header";
import { fetchTaskByID } from "@/service/service";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Form } from "@/components/Form";
import { useState, useEffect } from "react";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

const EditPage = ({ params }: EditPageProps) => {
  const [formType, setFormType] = useState<string>("see"); // Toggle between "see" and "edit"
  const [taskData, setTaskData] = useState<any>(null);
  const [taskId, setTaskId] = useState<number | null>(null);

  // Resolve `params` and fetch the task ID
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const id = parseInt(resolvedParams.id, 10);
      setTaskId(id);
    };

    resolveParams();
  }, [params]);

  // Fetch the task data when `taskId` is resolved
  useEffect(() => {
    if (taskId !== null) {
      const fetchData = async () => {
        try {
          const data = await fetchTaskByID(taskId);
          setTaskData(data);
        } catch (error) {
          console.error("Failed to fetch task data:", error);
        }
      };

      fetchData();
    }
  }, [taskId]);

  if (!taskData) {
    return (
      <>
        <Header />
        <div className="container">
          <p>Загрузка...</p>
        </div>
      </>
    );
  }

  // Toggle between "see" and "edit" modes
  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "see" ? "edit" : "see"));
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <Link href={"/"} className="breadcrumb">
            <FontAwesomeIcon icon={faArrowLeft} className="breadcrumb-icon" />
            Назад
          </Link>
          <h2 className="title">
            {formType === "see" ? "Просмотр" : "Изменение"}
            <button className="btn__edit" onClick={toggleFormType}>
              <FontAwesomeIcon icon={faPencil} />
              {formType === "see" ? "Изменить" : "Отмена"}
            </button>
          </h2>
          <Form task={taskData} type={formType} />
        </div>
      </main>
    </>
  );
};

export default EditPage;
