import { LoadingOverlay, Stack } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { getChat } from "../../api/NestmateApi";
import { Container } from "../elements/Container";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { NewMessage } from "./NewMessage";


export const ChatDetail = ( { chatId, token, user, socket } ) => {

    const [ chat, setChat ] = useState(null);
    const [ messages, setMessages ] = useState([]);
    const [ newMessages, setNewMessages ] = useState([]);
    const [ loading, setLoading ] = useState( false );
    const isMountedRef = useRef( null );


    useEffect(() => {

        isMountedRef.current = true;

        if( token ){

            (async () => {
                    
                try{

                    const { data } = await getChat( chatId, token );

                    setChat( { ...data.chat, users: data.chat.users.filter( u => u._id != user._id ) });
                    setMessages( data.chat.messages );
                    setNewMessages([]);

                    if( isMountedRef.current ) { 

                        socket.socketEmit('join_chat', { chatId, user });

                        socket.socketOn('message', ( message ) =>  { 
                            
                            message.chatId === chatId && setMessages( oldArr => [ ...oldArr, message.message ] );
                            
                        });
                    }

                }catch(err){
                    console.log(err);
                }

            })();
        }


    },[ chatId ]);
    
    
    return (
        <div class="flex w-full">

            { loading && <LoadingOverlay /> }
            { !loading && chat && <>
                <div className="flex flex-col w-full gap-3 ">

                    <ChatHeader chat={ chat } />

                    <ChatMessages messages={messages} newMessages={newMessages} userId={user._id} />
                    
                    <NewMessage chatId={chat._id} token={token} user={user} />

                </div>

            </>}
            { !loading && !chat && <>
                <h1>No Chat</h1>
            </>}
            
        </div>
    )
}
