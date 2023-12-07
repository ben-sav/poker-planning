import {socket} from "./socket.ts";
import useNotesReveal from "./useNotesReveal.ts";

function ScrumNoteReveal() {
    const revealed = useNotesReveal()

    const handleClick = (): void => {
        socket.emit('scrum_reveal_notes', !revealed)
    }

    return (
        <button className={'button is-link mr-4'} onClick={handleClick}>{revealed ? 'HIDE' : 'REVEAL'}</button>
    )
}

export default ScrumNoteReveal
