import {useState} from "react";

type LoginProps = {
    onClick: (message: string) => void;
}

function Login({ onClick }: LoginProps) {
    const [value, setValue] = useState<string>('')

    function handleKeyDown(event: any): void {
        if (event.key === 'Enter' && value !== '') {
            onClick(value);
        }
    }

    return (
        <>
            <h4>Choisissez un nom :</h4>

            <input
                type="text"
                onKeyDown={handleKeyDown}
                onChange={(event) => setValue(event.target.value)}
                className="input"
            />

            <button
                onClick={() => onClick(value)}
                className="button is-link is-fullwidth mt-4"
            >
                Enter
            </button>
        </>
    )
}

export default Login
