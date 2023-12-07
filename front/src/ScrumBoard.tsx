import {User} from "./App.tsx"
import useNotesFetcher from "./useNotesFetcher.ts"
import ScrumNote from "./ScrumNote.tsx"
import ScrumNoteRemover from "./ScrumNoteRemover.tsx"
import ScrumNoteReveal from "./ScrumNoteReveal.tsx"
import useNotesReveal from "./useNotesReveal.ts";

type BoardProps = {
    user: User,
}

type Note = {
    user: User,
    note: number
}

function ScrumBoard({ user }: BoardProps) {
    const notes = useNotesFetcher()
    const revealed = useNotesReveal()

    return (
        <>
            <ScrumNote user={user} />

            <div className="box mt-4">
                <h4 className="title is-5">
                    Les notes
                </h4>

                <div className="block">
                    <ScrumNoteReveal />
                    <ScrumNoteRemover />
                </div>

                <table className="table is-fullwidth has-text-weight-bold">
                    {notes.map((note: Note, key: number) => {
                        return (
                            <tr key={key}>
                                <td className="is-size-5 ">{note.user.name}</td>
                                <td>
                                    <span
                                        className={revealed ? 'tag is-link is-rounded p-2' : 'tag is-link is-rounded has-text-link p-2'}
                                        style={{'width': '2rem', 'height': '2rem', 'fontSize' : '1.2rem'}}
                                    >
                                        {note.note}
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default ScrumBoard
