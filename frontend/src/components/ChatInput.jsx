import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ onSend }) => {

    const [text, setText] = useState("");

    const handleSend = () => {

        if (!text.trim()) return;

        onSend(text);

        setText("");

    };

    return (

        <div className="chat-input">

            <input
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                }}
            />

            <button onClick={handleSend}>

                <FaPaperPlane />

            </button>

        </div>

    );

};

export default ChatInput;