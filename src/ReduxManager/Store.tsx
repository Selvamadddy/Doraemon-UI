import { configureStore } from "@reduxjs/toolkit";
import menuBarReducer from "./Slices/MenuBarSlice";
import chatSlice from "./Slices/ChatSlice";
import WidgetSlice from "./Slices/Dashboard/WidgetSlice";

export const store = configureStore({
  devTools: false,
  reducer: {
    menuBar: menuBarReducer,
    chat: chatSlice,
    widget: WidgetSlice
  }
});

// Export RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
