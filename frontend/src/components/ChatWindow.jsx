import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages, loading, chatRef }) => {

    return (

        <div className="chat-box">

            {
                loading ? (

                    <p className="chat-loading">

                        Loading chat...

                    </p>

                ) : (

                    messages.map((msg, i) => (

                        <ChatMessage
                            key={i}
                            message={msg}
                        />

                    ))

                )
            }

            <div ref={chatRef}></div>

        </div>

    );

};

export default ChatWindow;