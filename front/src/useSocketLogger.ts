import {useEffect, useState} from "react";
import {socket} from "./socket.ts";

function useSocketLogger(): Array<string> {
    const [logs, setLogs] = useState<Array<string>>([])

    useEffect(() => {
        function setNewLog(newLog: string): void {
            setLogs([...logs, newLog])
        }

        socket.on('system_message', setNewLog);

        return () => {
            socket.off('system_message', setNewLog)
        };
    }, [logs])

    return logs
}

export default useSocketLogger
