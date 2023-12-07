import {useEffect, useState} from "react";
import {socket} from "./socket.ts";
import {User} from "./App.tsx";

type Note = {
    user: User,
    note: number
}

function useNotesFetcher(): Array<Note> {
    const [notes, setNotes] = useState<Array<Note>>([])

    useEffect(() => {
        function setNewNotes(newNotes: Array<Note>) {
            setNotes(newNotes)
        }

        socket.on('scrum_get_notes', setNewNotes);

        return () => {
            socket.off('scrum_get_notes', setNewNotes)
        };
    }, [notes])

    return notes.sort((a: Note, b: Note) => a.user.name.localeCompare(b.user.name))
}

export default useNotesFetcher
