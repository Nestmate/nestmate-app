import { LoadingOverlay, Stack } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { getChat } from "../../api/NestmateApi";
import { UserContext } from "../../context/user.context";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { NewMessage } from "./NewMessage";
import { io } from 'socket.io-client';


export const ChatDetail = ( { chatId } ) => {

    const [ chat, setChat ] = useState( null );
    const [ socket, setSocket ] = useState( null );
    const [ messages, setMessages ] = useState([]);
    const [ loading, setLoading ] = useState( true );
    const { token, user } = useContext( UserContext );
    const isMountedRef = useRef( null );

    const addMessage = (message) => setMessages( [ ...messages, message ] );

    useEffect( () => {

        isMountedRef.current = true;

        if(token){

            ( async () => {
                try{

                    const { data } = await getChat(chatId,token);
                    const curChat = { ...data.chat, users: data.chat.users.filter( u => u._id !== user._id ) };

                    setChat(curChat);
                    setMessages(curChat.messages);
                    
                    if(isMountedRef.current){

                        const newSocket = await io(`${process.env.REACT_APP_PROJECTS_API}`);
                        
                        newSocket.emit('join', { chatId, userId: user._id });
                        newSocket.on('message', message => {
                            
                            addMessage(message);
                            //setMessages( [ ...messages , message] )
                        } );
                    }
                    

                }catch(err){
                    console.log(err);
                }finally {
                    setLoading(false);
                }
            } )();
        }

    },[ token, chatId ]);
    
    return (
        <div>
            { loading && <LoadingOverlay /> }
            { !loading && chat && <>
                <Stack>

                    <ChatHeader chat={ chat } />

                    <ChatMessages messages={messages} userId={user._id}/>
                    
                    <NewMessage chatId={chatId} token={token} user={user} />

                </Stack>

            </>}
            { !loading && !chat && <>
                <h1>No Chat</h1>
            </>}
        </div>
    )
}
