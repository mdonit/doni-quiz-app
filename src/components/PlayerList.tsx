import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import styles from "./table.module.css";
import styles2 from "../pages/cards.module.css";
import { AiFillDelete } from "react-icons/ai";
import { deletePlayer, getPlayers } from "../firebase/players";
import { useState, useEffect } from "react";
import { Player } from "../firebase/types";

const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const header = ["Player", "Score", "Rounds Played"];
  const [playersModified, setPlayersModified] = useState<boolean>(false);

  useEffect(() => {
    const helper = async () => {
      const initPlayers = await getPlayers();
      const unsortedPlayers: Player[] = [];

      initPlayers.forEach((doc) => {
        unsortedPlayers.push({ id: doc.id, name: doc.data().name, score: doc.data().score, rounds: doc.data().rounds });
      });

      unsortedPlayers.sort((a, b) => (a.score > b.score ? -1 : 1));
      setPlayers(unsortedPlayers);
    };
    helper();
  }, [playersModified]);

  const handleDeletePlayer = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete Player "${name}"?`)) {
      await deletePlayer(id);
      setPlayersModified((prev) => !prev);
    }
  };

  return (
    <>
      <TableContainer className={styles.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {header.map((h) => (
                <TableCell sx={{ borderBottom: "2px solid grey", fontSize: "1.1rem" }} key={header.indexOf(h)}>
                  <b>{h}</b>
                </TableCell>
              ))}
              <TableCell sx={{ borderBottom: "2px solid grey", fontSize: "1.1rem" }}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.table__body}>
            {players.map((pl) => (
              <TableRow key={pl.id} className={styles.table__row}>
                <TableCell>{pl.name}</TableCell>
                <TableCell className={styles.table__data} sx={{ textAlign: "center" }}>
                  {pl.score}
                </TableCell>
                <TableCell className={styles.table__data} sx={{ textAlign: "center" }}>
                  {pl.rounds}
                </TableCell>
                <TableCell>
                  <AiFillDelete onClick={() => handleDeletePlayer(pl.id, pl.name)} size={25} className={styles2["card__icon-delete"]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlayerList;
