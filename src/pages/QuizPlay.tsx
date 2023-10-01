import { KeyboardEvent, useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { Button, TextField } from "@mui/material";
import styles from "../page.module.css";
import QuizPlayQuestion from "../components/QuizPlayQuestion";
import BackButton from "../components/BackButton";
import { addPlayer } from "../firebase/players";

type NewPlayer = {
  name: string;
  score: number;
};

const QuizPlay = () => {
  const quizes = useAppSelector((state) => state.quiz.quizes);
  const [gameState, setGameState] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<NewPlayer>({ name: "", score: 0 });

  useEffect(() => {
    const helper = async () => {
      if (questionIndex === quizes.length) {
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
        quizes.length > questionIndex ? (
          <QuizPlayQuestion questionIndex={questionIndex} nextQuestionIndex={nextQuestionIndex} addPlayerScore={addPlayerScore} />
        ) : (
          <div>
            <p>GAME IS OVER!</p>
            <p>
              Your scored {currentPlayer.score} out of {quizes.length}
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
          <TextField id="outlined-basic" label="Enter Player Name" variant="outlined" size="small" color="primary" onChange={setPlayer} onKeyDown={pressedEnter} />

          <p>There are {quizes.length} questions</p>
          <Button variant="contained" color="primary" onClick={playGame}>
            Start Game
          </Button>
        </div>
      )}
      <BackButton />
    </div>
  );
};

export default QuizPlay;
