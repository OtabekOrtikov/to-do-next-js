import Header from "@/components/Header";
import { fetchTaskByID } from "@/service/service";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Form } from "@/components/Form";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

const EditPage = async ({ params }: EditPageProps) => {
  const resolvedParams = await params;
  const taskId = parseInt(resolvedParams.id, 10);
  const data = await fetchTaskByID(taskId);
  console.log(data);
  return (
    <>
      <Header />
      <div className="container">
        <Link href={"/"} className="breadcrumb">
          <FontAwesomeIcon icon={faArrowLeft} className="breadcrumb-icon" />
          Назад
        </Link>
        <h2 className="title">Редактирование задачи</h2>
        <Form task={data} />
      </div>
    </>
  );
};

export default EditPage;
