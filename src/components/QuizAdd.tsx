import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
// import { quizAdd } from "../store/features/QuizSlice";
// import { useAppDispatch } from "../store/store";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import styles from "../pages/cards.module.css";
import { Quiz } from "../models";
import { addToQuiz } from "../firebase/quizzes";

type ToggleModal = {
  toggleModal: () => void;
  editValues: Quiz;
  setQuestionAdded: Dispatch<SetStateAction<boolean>>;
};

export const QuizAdd = ({ toggleModal, editValues, setQuestionAdded }: ToggleModal) => {
  const quizID = editValues.id;
  const question = useRef<string>(editValues.question);
  const answerA = useRef<string>(editValues.answers[0]);
  const answerB = useRef<string>(editValues.answers[1]);
  const answerC = useRef<string>(editValues.answers[2]);
  const answerD = useRef<string>(editValues.answers[3]);
  const [answerIndex, setAnswerIndex] = useState<number>(editValues.answerIndex);
  const [boxesChecked, setBoxesChecked] = useState<boolean[]>([true, false, false, false]);

  // const dispatch = useAppDispatch();

  const setAnswer = (correctAnswer: number) => {
    const checkBoxes = [false, false, false, false];
    checkBoxes[correctAnswer] = true;

    setBoxesChecked(checkBoxes);
    setAnswerIndex(correctAnswer);
  };

  useEffect(() => {
    setAnswer(answerIndex);
  }, []);

  const addNewQuiz = async () => {
    const newQuiz = {
      id: quizID,
      question: question.current.trim(),
      answerA: answerA.current.trim(),
      answerB: answerB.current.trim(),
      answerC: answerC.current.trim(),
      answerD: answerD.current.trim(),
      answerIndex: answerIndex,
    };

    if (!newQuiz.question || !newQuiz.answerA || !newQuiz.answerB || !newQuiz.answerC || !newQuiz.answerD) alert("Please fill in all fields!");
    else {
      // dispatch(quizAdd(newQuiz));
      await addToQuiz(newQuiz.id, newQuiz.question, [newQuiz.answerA, newQuiz.answerB, newQuiz.answerC, newQuiz.answerD], newQuiz.answerIndex);
      setQuestionAdded((prev) => !prev);
      toggleModal();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__window}>
        <TextField placeholder="Question" defaultValue={question.current} onChange={(e) => (question.current = e.target.value)} />
        <div className={styles["modal__window-answers"]}>
          <div>
            <TextField variant="filled" placeholder="Answer 1" defaultValue={answerA.current} onChange={(e) => (answerA.current = e.target.value)} />
            <FormControlLabel control={<Checkbox onChange={() => setAnswer(0)} checked={boxesChecked[0]} />} label="Correct Answer" />
          </div>
          <div>
            <TextField variant="filled" placeholder="Answer 2" defaultValue={answerB.current} onChange={(e) => (answerB.current = e.target.value)} />
            <FormControlLabel control={<Checkbox onChange={() => setAnswer(1)} checked={boxesChecked[1]} />} label="Correct Answer" />
          </div>
          <div>
            <TextField variant="filled" placeholder="Answer 3" defaultValue={answerC.current} onChange={(e) => (answerC.current = e.target.value)} />
            <FormControlLabel control={<Checkbox onChange={() => setAnswer(2)} checked={boxesChecked[2]} />} label="Correct Answer" />
          </div>
          <div>
            <TextField variant="filled" placeholder="Answer 4" defaultValue={answerD.current} onChange={(e) => (answerD.current = e.target.value)} />
            <FormControlLabel control={<Checkbox onChange={() => setAnswer(3)} checked={boxesChecked[3]} />} label="Correct Answer" />
          </div>
        </div>
        <div className={styles.modal__buttons}>
          <Button variant="outlined" color="secondary" onClick={toggleModal} sx={{ "&:hover": { backgroundColor: "secondary.dark", color: "secondary.contrastText" } }}>
            BACK
          </Button>
          <Button variant="contained" color="primary" onClick={addNewQuiz}>
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizAdd;
