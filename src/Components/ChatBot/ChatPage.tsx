import "./Chat.css";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useAppSelector } from "../../ReduxManager/Hooks/hooks";
import { useEffect, useRef } from "react";


export default function ChatPage() {
    const messages = useAppSelector(state => state.chat.messages);
    const isTyping = useAppSelector(state => state.chat.isTyping);

    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <div className="chat-container">
            <ChatHeader />
                <div className="chat-body">
                    {messages.map(msg => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                    {isTyping && (
                        <div className="typing-indicator">
                            Doraemon is typing<span>.</span><span>.</span><span>.</span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <ChatInput />
        </div>
    );
}