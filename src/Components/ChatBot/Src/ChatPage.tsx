import "./chat.css";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useAppSelector } from "../../../Hooks/ReduxHook";
import { useState, useEffect, useRef } from "react";
import ActivateChatServer from "./ActivateChatServer";


export default function ChatPage() {
    const [isActive, setIsActive] = useState(false);
    const messages = useAppSelector(state => state.chat.messages);
    const isTyping = useAppSelector(state => state.chat.isTyping);

    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const updateIsActive = () =>
    {
        setIsActive(!isActive);
    }

    const BootUpApiCall = async() =>{
         const timerId = setTimeout(() => {
        }, 2000);
         clearTimeout(timerId);
        return false;
    }

    return (
        <div className="chat-container">
            <ChatHeader isActive={isActive} />
            {!isActive ? <ActivateChatServer updateIsActive ={updateIsActive} ApiCall={BootUpApiCall} ServerName="ChatBot"/> :
                <>
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
                </>
            }


        </div>
    );
}