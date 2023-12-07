import {useState} from "react";

type MessageInputProps = {
    onClick: (message: string) => void;
}

function MessageInput({ onClick }: MessageInputProps) {
    const [value, setValue] = useState<string>('')

    function handleKeyDown(event: any): void {
        if (event.key === 'Enter' && value !== '') {
            onClick(value);
            event.target.value = ''
        }
    }

    return (
        <>
            <input
                type="text"
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={handleKeyDown}
                className="input"
            />
        </>
    )
}

export default MessageInput
