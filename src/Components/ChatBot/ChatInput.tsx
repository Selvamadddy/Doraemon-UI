import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../ReduxManager/Hooks/hooks";
import { sendUserMessage, sendBotMessage } from "../../ReduxManager/Slices/ChatSlice";
import "./chat.css";

import GetResponse from "./llm";
import SelHostLLMGetResponse from "./selfhostllm";

export default function ChatInput() {
  const [text, setText] = useState("");
  const [llmType, setLlmType] = useState<"cloud" | "self">("cloud");

  const dispatch = useAppDispatch();
  const isTyping = useAppSelector(state => state.chat.isTyping);

  const sendMessage = async () => {
    if (!text.trim()) return;

    dispatch(sendUserMessage(text));

    const response =
      llmType === "cloud"
        ? await GetResponse(text)
        : await SelHostLLMGetResponse(text);

    dispatch(sendBotMessage(response));
    setText("");
  };

  return (
    <div
      className="chat-input-wrapper"
      style={isTyping ? { pointerEvents: "none", opacity: 0.5 } : {}}
    >
      <div className="chat-input-box">
        <textarea
          className="chat-input"
          placeholder="Ask me anything!"
          value={text}
          rows={1}
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button className="rounded-circle send-btn" onClick={sendMessage}>
          <i className="bi bi-send"></i>
        </button>
      </div>

      {/* 🔽 Mini pill switch */}
      <div className="llm-switch">
        <span
          className={`llm-pill ${llmType === "cloud" ? "active" : ""}`}
          onClick={() => setLlmType("cloud")}
        >
          Cloud LLM
        </span>

        <span
          className={`llm-pill ${llmType === "self" ? "active" : ""}`}
          onClick={() => setLlmType("self")}
        >
          Self-Host LLM
        </span>
      </div>

      <small className="powered-text text-secondary">
        Powered by Intelligence
      </small>
    </div>
  );
}
