import { UserAddIcon } from '@heroicons/react/solid';
import { showNotification } from '@mantine/notifications';
import { createContext, useContext, useEffect, useRef,useState } from 'react';
import { io } from 'socket.io-client';
import { UserContext } from './user.context';

const NotificationContext = createContext();

function NotificationProviderWrapper({children}){
    
    const { user } = useContext( UserContext );
    const [ socket, setSocket ] = useState( null );
    const isMountedRef = useRef( null );
    const [ currentNotification, setCurrentNotification ] = useState( [] );

    const socketEmit = (event, data) => socket && socket.emit( event, data )
    const socketOn = (event, callback) => socket && socket.on( event, callback )

    useEffect(() => {

        isMountedRef.current = true;

        (async () => {

            if(isMountedRef.current && user){

                const socket = await io(`${process.env.REACT_APP_PROJECTS_API}`);

                setSocket(socket);

                socket.emit('join', { userId: user._id });
                socket.on('notification', ({ notification }) => {

                    console.log('notification', notification);

                    setCurrentNotification( notification );

                    showNotification({
                        title: notification.title,
                        message: notification.message,
                        color: 'yellow',
                        icon: <UserAddIcon />
                    });

                });

            }

        })();

    }, [ user ])


    return (
        <NotificationContext.Provider 
            value={{ 
                socketOn, 
                socketEmit,
                currentNotification 
                }}>
            {children}
        </NotificationContext.Provider>
    )
}

export { NotificationContext, NotificationProviderWrapper };