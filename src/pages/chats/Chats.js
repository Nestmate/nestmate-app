import { LoadingOverlay } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getChats } from "../../api/NestmateApi";
import { ChatDetail } from "../../components/chat/ChatDetail";
import { ChatEmpty } from "../../components/chat/ChatEmpty";
import { ChatNotSelected } from "../../components/chat/ChatNotSelected";
import { ChatListItem } from "../../components/chat/list/ChatListItem";
import { Container } from "../../components/elements/Container";
import { NotificationContext } from "../../context/notification.context";
import { UserContext } from "../../context/user.context";


export const Chats = () => {

    //AUTHENTICATION
    const { isLoading, token, user } = useContext(UserContext);
    const { socketOn, socketEmit } = useContext(NotificationContext);
    const { chatId } = useParams();

    const [ chats, setChats ] = useState(null);
    const [ currentChat, setCurrentChat ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const addMessage = (message) => {
        console.log('addMessage', message);
        //setCurrentChat({ ...currentChat, messages: [ ...currentChat.messages, message ] });
    }

    //IS MOUNTED REF FOR SOCKET
    const isMountedRef = useRef( null );

    useEffect(() => {

        isMountedRef.current = true;

        

        if( token  ){

            (async () => {

                try{

                    const { data } = await getChats(token);

                    const loadedChates = await data.chats.map( chat => { return { ...chat, users: chat.users.filter( u => u._id != user._id) } } );

                    await setChats(loadedChates);
                    
                    if( isMountedRef.current ) { 

                        socketOn('update_chat', ( message ) =>  console.log( message )  );
            
                    }

                }catch(err){

                    console.log(err);

                }finally {

                    setLoading(false);

                }
            })();

            
        }

    }, [ isLoading, chatId ]);
    
    return (

        <section className="p-0">
            <Container className="px-0">
            { loading && isLoading && <LoadingOverlay /> }
                { !isLoading && !loading && chats.length > 0 && <>

                    <div className="grid grid-cols-1 lg:grid-cols-8">

                        <div className={ `col-span-2 border-r-2 border-slate-200 flex flex-col ${ chatId && 'hidden lg:block' }` }>
                            { chats.map((chat,i) => <ChatListItem key={`chatlistitem_${chat._id}`} chat={ chat } active={ chat._id === chatId }/> )}
                        </div>

                        <div className="col-span-6 screen-height flex">
                            
                            { chatId && <ChatDetail chatId={ chatId } token={ token } user={ user } socket={{ socketOn, socketEmit}} /> }

                            { !chatId && <ChatNotSelected className='hidden lg:block' /> }

                        </div>   
                    </div>  
                </>}

                { !isLoading && !loading && chats.length === 0 && <ChatEmpty className={`${ chatId && 'hidden lg:block' }`}/> }
                
            </Container>
        </section>
    )
}
