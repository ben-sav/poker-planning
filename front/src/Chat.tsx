import {useState, useEffect} from 'react'
import MessageInput from "./MessageInput.tsx";
import {socket} from "./socket"
import {User} from "./App.tsx";

type ChatProps = {
    user: User
}

type Message = {
    message: string,
    user: User,
}

function Chat({user}: ChatProps) {
    const [messages, setMessages] = useState<Array<Message>>([])

    const addMessage = (message: string) => {
        socket.emit('chat_message', JSON.stringify({
            message,
            user,
        }))
    }

    useEffect(() => {
        function setMessage(message: string) {
            setMessages([...messages, JSON.parse(message)])
        }

        socket.on('chat_message', setMessage);

        return () => {
            socket.off('chat_message', setMessage)
        };
    }, [messages])

    return (
        <nav className="panel">
            <div className="panel-heading">
                Un message ? <small>(enter to submit)</small>
            </div>

            <div className="panel-block">
                <MessageInput onClick={addMessage}/>
            </div>

            <ul className="chat-messages">
                {messages.map((message, key) => {
                    return <li key={key} className="panel-block is-active"><strong>{message.user.name}</strong>&nbsp;▶ {message.message}</li>
                })}
            </ul>
        </nav>
    )
}

export default Chat
