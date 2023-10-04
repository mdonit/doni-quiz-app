import styles from "./grid.module.css";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useShuffleArray from "../hooks/useShuffleArray";
import { Quiz } from "../firebase/types";

type Props = {
  questionIndex: number;
  nextQuestionIndex: () => void;
  addPlayerScore: () => void;
  questions: Quiz[];
};

const QuizPlayQuestion = ({ questionIndex, nextQuestionIndex, addPlayerScore, questions }: Props) => {
  const [answerSelected, setAnswerSelected] = useState<number>(-1);
  const [quizes, setQuizes] = useState<Quiz[]>(questions);

  useEffect(() => {
    setQuizes(useShuffleArray([...questions]));
  }, []);

  return (
    <div className={styles.grid}>
      <div className={styles.grid__header}>
        <h2>Question: {quizes[questionIndex].question}</h2>
        <span>
          {questionIndex + 1}/{quizes.length}
        </span>
      </div>
      <ul className={styles["grid__item-list"]}>
        {quizes[questionIndex].answers.map((ans, index) => (
          <li
            className={answerSelected === index ? styles["grid__item--selected"] : styles.grid__item}
            onClick={() => {
              setAnswerSelected(index);
            }}
            key={index}
          >
            {index + 1}. - {ans}
          </li>
        ))}
      </ul>
      <div className={styles["grid__button-next"]}>
        <Button
          disabled={answerSelected === -1}
          variant="outlined"
          sx={{ width: 200, "@media (hover: hover)": { "&:hover": { color: "primary.contrastText", backgroundColor: "primary.dark" } } }}
          color="primary"
          onClick={() => {
            nextQuestionIndex();
            setAnswerSelected(-1);
            if (answerSelected === quizes[questionIndex].answerIndex) addPlayerScore();
          }}
        >
          {questionIndex + 1 === quizes.length ? "Check Score" : "Next Question"}
        </Button>
      </div>
    </div>
  );
};

export default QuizPlayQuestion;
