import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface Player {
  id: string;
  name: string;
  highScore: number;
  rounds: number;
}

export interface PlayerState {
  players: Player[];
}

const initialState: PlayerState = {
  players: [
    { id: "test1", name: "Grabma", highScore: 2, rounds: 1 },
    { id: "test2", name: "Sukoma", highScore: 2, rounds: 4 },
    { id: "test3", name: "Chokoma", highScore: 5, rounds: 1 },
    { id: "test4", name: "Bofah", highScore: 3, rounds: 2 },
    { id: "test5", name: "Candice", highScore: 0, rounds: 10 },
  ],
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playerAdd: (state, action: PayloadAction<{ name: string; score: number }>) => {
      const existingPlayer = state.players.filter((pl) => pl.name === action.payload.name && pl.id !== "")[0];

      if (existingPlayer) {
        if (action.payload.score > existingPlayer.highScore) existingPlayer.highScore = action.payload.score;
        existingPlayer.rounds = existingPlayer.rounds + 1;
      } else if (!existingPlayer) {
        state.players.push({
          id: v4(),
          name: action.payload.name,
          highScore: action.payload.score,
          rounds: 1,
        });
      }
    },
    playerDelete: (state, action: PayloadAction<{ id: string }>) => {
      state.players = state.players.filter((pl) => pl.id !== action.payload.id);
    },
  },
});

export default PlayerSlice.reducer;
export const { playerAdd, playerDelete } = PlayerSlice.actions;
