import { LoadingOverlay, Stack } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { getChat } from "../../api/NestmateApi";
import { UserContext } from "../../context/user.context";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { NewMessage } from "./NewMessage";


export const ChatDetail = ( { chatId } ) => {

    const [ chat, setChat ] = useState( null );
    const [ messages, setMessages ] = useState([]);
    const [ loading, setLoading ] = useState( true );
    const { token, user } = useContext( UserContext );
    const isMountedRef = useRef( null );

    useEffect( () => {

        isMountedRef.current = true;

        if(token){

            ( async () => {
                try{
                    const { data } = await getChat(chatId,token);
                    const curChat = { ...data.chat, users: data.chat.users.filter( u => u._id !== user._id ) };

                    setChat(curChat);
                    setMessages(curChat.messages);

                }catch(err){
                    console.log(err);
                }finally {
                    setLoading(false);
                }
            } )();
        }

    },[ token ]);
    
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
