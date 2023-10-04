import { KeyboardEvent, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "../page.module.css";
import QuizPlayQuestion from "../components/QuizPlayQuestion";
import BackButton from "../components/BackButton";
import { addPlayer } from "../firebase/players";
import { Quiz } from "../firebase/types";
import { getFromQuiz } from "../firebase/quizzes";

type NewPlayer = {
  name: string;
  score: number;
};

const QuizPlay = () => {
  const [questions, setQuestions] = useState<Quiz[]>([]);
  const [gameState, setGameState] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<NewPlayer>({ name: "", score: 0 });

  useEffect(() => {
    const helper = async () => {
      const initQuestions = await getFromQuiz();
      const questionsArray: Quiz[] = [];

      initQuestions.forEach((doc) => {
        questionsArray.push({ id: doc.id, question: doc.data().question, answers: doc.data().answers, answerIndex: doc.data().answerIndex });
      });

      setQuestions(questionsArray);
    };
    helper();
  }, []);

  useEffect(() => {
    const helper = async () => {
      if (questionIndex === questions.length && gameState) {
        await addPlayer(currentPlayer.name, currentPlayer.score);
      }
    };
    helper();
  }, [currentPlayer, questionIndex]);

  const nextQuestionIndex = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const addPlayerScore = () => {
    setCurrentPlayer((prev) => ({ name: prev.name, score: prev.score + 1 }));
  };

  const setPlayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPlayer({ name: e.target.value.trim(), score: 0 });
  };

  const pressedEnter = (e: KeyboardEvent) => {
    e.key === "Enter" && setGameState(true);
  };

  const playGame = () => {
    if (currentPlayer.name === "") alert("Please Enter a Player Name!");
    else setGameState(true);
  };

  return (
    <div className={styles.page}>
      <h1>QuizPlay Page</h1>
      {gameState ? (
        questions.length > questionIndex ? (
          <QuizPlayQuestion questionIndex={questionIndex} nextQuestionIndex={nextQuestionIndex} addPlayerScore={addPlayerScore} questions={questions} />
        ) : (
          <div>
            <p>GAME IS OVER!</p>
            <p>
              Your scored {currentPlayer.score} out of {questions.length}
            </p>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginTop: "2rem", "&:hover": { backgroundColor: "primary.dark", color: "primary.contrastText" } }}
              onClick={() => {
                setQuestionIndex(0);
                setGameState(false);
              }}
            >
              Replay
            </Button>
          </div>
        )
      ) : (
        <div className={styles.page__main}>
          {questions.length < 3 ? (
            <>
              <p>Not enough questions!</p>
              <p> Add at least 3 in order to play!</p>
            </>
          ) : (
            <>
              <TextField id="outlined-basic" label="Enter Player Name" variant="outlined" size="small" color="primary" onChange={setPlayer} onKeyDown={pressedEnter} />

              <p>There are {questions.length} questions</p>
              <Button variant="contained" color="primary" onClick={playGame}>
                Start Game
              </Button>
            </>
          )}
        </div>
      )}
      <BackButton />
    </div>
  );
};

export default QuizPlay;
