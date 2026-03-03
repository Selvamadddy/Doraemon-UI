import Doraemonbell from '../../Asset/Doraemon-bell.png'

interface MessageProps {
  message: {
    sender: "bot" | "user";
    text: string;
    time: string;
  };
}

export default function ChatMessage({ message }: MessageProps) {
  return (
    <div className={`message ${message.sender}`}>
     {message.sender === "bot" && <img className='rounded-circle me-1' src={Doraemonbell} alt="" style={{height : '1.2rem', marginBottom : '0.4rem'}}/> }
      <div className={`bubble ${message.sender}`}>
        <span>{message.text}</span> <br></br>
        <small className={message.sender === "bot" ? "text-primary" : "text-secondary"} style={{fontSize : "0.8rem"}}>{message.sender === "bot" ? "Doraemon" : "Nobi"} {message.time}</small>
      </div>
      {message.sender === "user" && <i className="bi bi-person-circle ms-1 text-primary"></i>}
    </div>
  );
}
