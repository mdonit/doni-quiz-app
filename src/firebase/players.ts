import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, where } from "firebase/firestore";
import { fireStoreDb } from "./config";

export const addPlayer = async (name: string, score: number) => {
  const q = query(collection(fireStoreDb, "players"), where("name", "==", name));
  const playerData = await getDocs(q);

  if (playerData.docs.length > 0) {
    const existingPlayer = playerData.docs[0];
    const playerRef = doc(fireStoreDb, "players", existingPlayer.id);
    const previousScore = existingPlayer.data().score;
    const previousRounds = existingPlayer.data().rounds;

    await updateDoc(playerRef, {
      score: previousScore < score ? score : previousScore,
      rounds: previousRounds + 1,
    });
  } else {
    await addDoc(collection(fireStoreDb, "players"), {
      name,
      score,
      rounds: 1,
    });
  }
};

export const deletePlayer = async (id: string) => {
  await deleteDoc(doc(fireStoreDb, "players", id));
};

export const getPlayers = async () => {
  return await getDocs(collection(fireStoreDb, "players"));
};
