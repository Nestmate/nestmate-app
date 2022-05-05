import { NotificationsProvider } from "@mantine/notifications";
import { useEffect,useState } from "react"
import { io } from 'socket.io-client';

export const OnNotification = ({ children }) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {   

        (async () => {

            const newSocket = await io("http://localhost:3000", {
                path: "/notification/"
            });

            setSocket(newSocket);

        })();

    },[]);

    return (
        <>
            <NotificationsProvider>
            { children }
            </NotificationsProvider>
        </>
    )
}
