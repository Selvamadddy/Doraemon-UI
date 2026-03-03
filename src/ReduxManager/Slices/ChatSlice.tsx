import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  time: string;
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
}

const initialState: ChatState = {
  messages: [
    {
      id: 1,
      sender: "bot",
      text:
        "Hello Nobita! I've been organizing your gadgets. Need help today?",
      time: "10:30 AM"
    }
  ],
  isTyping: false
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendUserMessage(state, action: PayloadAction<string>) {
      state.messages.push({
        id: Date.now(),
        sender: "user",
        text: action.payload,
        time: new Date().toLocaleTimeString()
      });
      state.isTyping = true;
    },
    sendBotMessage(state, action: PayloadAction<string>) {
      state.messages.push({
        id: Date.now(),
        sender: "bot",
        text: action.payload,
        time: new Date().toLocaleTimeString()
      });
      state.isTyping = false;
    }
  }
});

export const { sendUserMessage, sendBotMessage } = chatSlice.actions;
export default chatSlice.reducer;
