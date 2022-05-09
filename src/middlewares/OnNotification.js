import { NotificationsProvider, showNotification } from "@mantine/notifications";
import { useEffect,useState } from "react"
import { io } from 'socket.io-client';

export const OnNotification = ({ children }) => {

    const [notification, setNotification] = useState(null);

    useEffect(() => {   

        (async () => {

            const socket = await io(`${process.env.REACT_APP_PROJECTS_API}`);
            //setSocket(newSocket);
            socket.on('notification', (data) => { 

                showNotification({
                    title: data.message,
                    color: "green"
                });

            });

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
