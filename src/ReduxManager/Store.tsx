import { configureStore } from "@reduxjs/toolkit";
import menuBarReducer from "./Slices/MenuBarSlice";

export const store = configureStore({
  devTools: false,
  reducer: {
    menuBar: menuBarReducer
  }
});

// Export RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
