import { Form } from "@/components/Form";
import Header from "@/components/Header";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const CreatePage = async () => {
  return (
    <>
      <Header />
      <div className="container">
        <Link href={"/"} className="breadcrumb">
          <FontAwesomeIcon icon={faArrowLeft} className="breadcrumb-icon" />
          Назад
        </Link>
        <h2 className="title">Создание задачи</h2>
        <Form type="create" />
      </div>
    </>
  );
};

export default CreatePage;
