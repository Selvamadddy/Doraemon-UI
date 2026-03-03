import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {Widget} from "../../../Components/Dashboard/Model/DashboardModel"

const initialState : Widget[] = [];

const chatSlice = createSlice({
  name: "Widget",
  initialState,
  reducers: {
    updateWidget(state, action: PayloadAction<Widget>) {
      state.push(action.payload)
    }
  }
});

export const { updateWidget } = chatSlice.actions;
export default chatSlice.reducer;