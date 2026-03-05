import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type ToDoTaskModel from "../../../Components/ToDoList/Model/ToDoTaskModel";

const initialState: ToDoTaskModel[] = [];

const toDoTaskSlice = createSlice({
  name: "toDoTask",
  initialState,
  reducers: {

    UpdateToDoTask(state, action: PayloadAction<ToDoTaskModel>) {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    AddToDoTask(state, action: PayloadAction<ToDoTaskModel>) {
      state.push(action.payload);
    },

    RemoveToDoTask(state, action: PayloadAction<number>) {
      return state.filter(task => task.id !== action.payload);
    },

    AddAllToDoTask(_, action: PayloadAction<ToDoTaskModel[]>) {
      return action.payload;
    }

  }
});

export const {UpdateToDoTask,AddToDoTask,RemoveToDoTask,AddAllToDoTask} = toDoTaskSlice.actions;

export default toDoTaskSlice.reducer;