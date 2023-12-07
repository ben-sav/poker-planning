import {socket} from "./socket.ts";

function ScrumNoteRemover() {
    const handleClick = (): void => {
        socket.emit('scrum_remove_notes')
    }

    return (
        <button onClick={handleClick} className='button is-danger'>
            Supprimer toutes les notes
        </button>
    )
}

export default ScrumNoteRemover
