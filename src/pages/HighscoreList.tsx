import PlayerList from "../components/PlayerList";
import BackButton from "../components/BackButton";
import styles from "../page.module.css";

const HighscoreList = () => {
  return (
    <div className={styles.page}>
      <h1>Highscores</h1>
      <PlayerList />
      <BackButton />
    </div>
  );
};

export default HighscoreList;
