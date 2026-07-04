import { useAuth } from "../context/AuthContext";

const ChatMessage = ({ message }) => {

    const { user } = useAuth();

    const isUser = message.sender === user?.id;

    return (

        <div className={`chat-message ${isUser ? "user" : "ai"}`}>

            <div className="bubble">

                {message.message}

            </div>

        </div>

    );

};

export default ChatMessage;