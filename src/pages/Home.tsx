import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../page.module.css";

const Home = () => {
  const navigate = useNavigate();
  const navigationOnClick = (link: string) => {
    navigate(`/${link}`);
  };

  return (
    <div className={styles.page}>
      <h1>Home Page</h1>
      <div className={styles.page__main}>
        <Button onClick={() => navigationOnClick("play")} variant="contained" sx={{ backgroundColor: "primary.main", color: "white" }}>
          Play
        </Button>
        <Button onClick={() => navigationOnClick("highscores")} variant="outlined" color="secondary" sx={{ "&:hover": { backgroundColor: "secondary.dark", color: "secondary.contrastText" } }}>
          Highscores
        </Button>
        <Button onClick={() => navigationOnClick("quizes")} variant="outlined" color="primary" sx={{ "&:hover": { backgroundColor: "primary.dark", color: "primary.contrastText" } }}>
          Quiz List
        </Button>
      </div>
    </div>
  );
};

export default Home;
