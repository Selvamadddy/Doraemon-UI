import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Exercise } from "../../../Components/GymTracker/Model/Exercise";

const initialState: Exercise[] = [];

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    AddExercise(_, action: PayloadAction<Exercise[]>) {
      return action.payload;
    },
    UpdateExercise(state, action: PayloadAction<Exercise>) {
      const index = state.findIndex(exercise => exercise.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

  }
});

export const {AddExercise, UpdateExercise} = exerciseSlice.actions;

export default exerciseSlice.reducer;