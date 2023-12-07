import {useState} from "react";
import Chat from "./Chat.tsx";
import Login from "./Login.tsx";
import ScrumBoard from "./ScrumBoard.tsx";

export type User = {
    name: string,
    currentVote: number
}

function App() {
    const [user, setUser] = useState<User | undefined>()

    const logUser = (name: string): void => {
        setUser({
            name,
            currentVote: 0,
        })
    }

    return (
        <>
            <section className="hero is-link">
                <div className="hero-body">
                    <h1 className="title">Planning Poker</h1>
                </div>
            </section>
            <div className="container is-max-desktop p-4">
                {user ? '' : <Login onClick={logUser}/>}
                {user ? <ScrumBoard user={user} /> : ''}
                {user ? <Chat user={user} /> : ''}
            </div>
        </>
    )
}

export default App
