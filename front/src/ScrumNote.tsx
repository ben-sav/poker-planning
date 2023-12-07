import {MouseEvent, useEffect, useState} from "react";
import {socket} from "./socket.ts";
import {User} from "./App.tsx";

type ScrumNoteProps = {
    user: User,
}

const FIB: Array<string> = ["1", "2", "3", "5", "8", "13", '?', 'X']

function ScrumNote({ user }: ScrumNoteProps) {
    const [note, setNote] = useState<string|undefined>(undefined)

    const handleClick = (event: MouseEvent): void => {
        // @ts-ignore
        const newNote = event.target.value
        setNote(newNote)
        socket.emit('scrum_add_note',{user: user, note: newNote})
    }

    useEffect(() => {
        function unsetNote() {
            setNote(undefined)
        }

        socket.on('scrum_remove_notes', unsetNote);

        return () => {
            socket.off('scrum_remove_notes', unsetNote)
        };
    }, [])

    return (
        <div className="box">
            <h4 className="title is-5">
                Hello {user.name}, quelle est ta note ?
            </h4>

            {FIB.map((value, key) => {
                return (
                    <button
                        key={key}
                        onClick={handleClick}
                        value={value}
                        className={note === value ? 'scrum-note-button scrum-note-button--active' : 'scrum-note-button'}
                    >
                        {value}
                    </button>
                )
            })}
        </div>
    )
}

export default ScrumNote
