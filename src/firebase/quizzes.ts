import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "./config";

export const addToQuiz = async (id: string, question: string, answers: [answerA: string, answerB: string, answerC: string, answerD: string], answerIndex: number) => {
  if (!id)
    await addDoc(collection(fireStoreDb, "quizzes"), {
      question,
      answers,
      answerIndex,
    });
  else {
    const querySnapshot = await getDocs(collection(fireStoreDb, "quizzes"));
    let existingId = "";

    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        existingId = doc.id;
        return;
      }
    });

    const questionRef = doc(fireStoreDb, "quizzes", existingId);
    await updateDoc(questionRef, {
      question,
      answers,
      answerIndex,
    });
  }
};

export const deleteFromQuiz = async (id: string) => {
  await deleteDoc(doc(fireStoreDb, "quizzes", id));
};

export const getFromQuiz = async () => {
  return await getDocs(collection(fireStoreDb, "quizzes"));
};
