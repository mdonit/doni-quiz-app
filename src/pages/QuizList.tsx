import QuizAdd from "../components/QuizAdd";
import BackButton from "../components/BackButton";
import styles from "./cards.module.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import useModalPortal from "../hooks/useModalPortal";
import { useState } from "react";
import { Quiz } from "../firebase/types";
import { deleteFromQuiz, getFromQuiz } from "../firebase/quizzes";
import { useEffect } from "react";

const editValuesInitial: Quiz = {
  id: "",
  question: "",
  answerIndex: 0,
  answers: ["", "", "", ""],
};

const QuizListed = () => {
  const [showModal, setShowModal] = useState(false);
  const [editValues, setEditValues] = useState<Quiz>(editValuesInitial);
  const [questionAdded, setQuestionAdded] = useState<boolean>(false);

  const [questions, setQuestions] = useState<Quiz[]>([]);

  useEffect(() => {
    const helper = async () => {
      const initQuestions = await getFromQuiz();

      const questionsReceived: Quiz[] = [];

      initQuestions.forEach((doc) => {
        questionsReceived.push({ id: doc.id, question: doc.data().question, answers: doc.data().answers, answerIndex: doc.data().answerIndex });
      });

      setQuestions(questionsReceived);
    };
    helper();
  }, [questionAdded]);

  const toggleModal = () => {
    setShowModal((p) => !p);

    if (showModal) setEditValues(editValuesInitial);
  };

  const editQuiz = (quiz: Quiz) => {
    setEditValues(quiz);
    toggleModal();
  };

  const deleteQuiz = async (id: string, question: string) => {
    // if (confirm(`Are you sure you want to delete the following question: \n"${question}"`)) dispatch(quizDelete({ id }));
    if (confirm(`Are you sure you want to delete the following question: \n"${question}"`)) {
      await deleteFromQuiz(id);
      setQuestionAdded((prev) => !prev);
    }
  };

  return (
    <>
      <h1>QuizListed Page</h1>
      <IoIosAddCircle onClick={toggleModal} size={30} className={styles["card__icon-add"]} />
      {showModal && useModalPortal(<QuizAdd toggleModal={toggleModal} editValues={editValues} setQuestionAdded={setQuestionAdded} />)}
      <ul className={styles["card-list"]}>
        {questions.map((qu) => (
          <li key={qu.id}>
            <div className={styles.card}>
              <div className={styles.card__title}>{qu.question}</div>
              <ul className={styles.card__body}>
                {qu.answers.map((an) => (
                  <li key={qu.answers.indexOf(an)}>{an}</li>
                ))}
              </ul>
              <div className={styles.card__icons}>
                <AiFillEdit onClick={() => editQuiz(qu)} size={25} className={styles["card__icon-edit"]} />
                <AiFillDelete onClick={() => deleteQuiz(qu.id, qu.question)} size={25} className={styles["card__icon-delete"]} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <BackButton />
    </>
  );
};

export default QuizListed;
