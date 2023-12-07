import {useEffect, useState} from "react";
import {socket} from "./socket.ts";

function useNotesReveal(): boolean {
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
        function fetchRevealed(isRevealed: boolean) {
            setRevealed(isRevealed)
        }

        socket.on('scrum_reveal_notes', fetchRevealed);

        return () => {
            socket.off('scrum_reveal_notes', fetchRevealed)
        };
    }, [])

    return revealed
}

export default useNotesReveal
