import { NotificationsProvider } from "@mantine/notifications";
import { useEffect,useState } from "react"
import { io } from 'socket.io-client';

export const OnNotification = ({ children }) => {

    const [notification, setNotification] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {   

        (async () => {

            // const newSocket = await io(process.env.REACT_APP_PROJECTS_API);
            // setSocket(newSocket);

            // socket.on('notification', (data) => setNotification(data));

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
