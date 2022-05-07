import { Grid, LoadingOverlay } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getChats } from "../../api/NestmateApi";
import { ChatDetail } from "../../components/chat/ChatDetail";
import { ChatEmpty } from "../../components/chat/ChatEmpty";
import { ChatList } from "../../components/chat/list/ChatList";
import { Container } from "../../components/elements/Container";
import { UserContext } from "../../context/user.context";


export const Chats = () => {

    const [ chats, setChats ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { chat } = useParams();

    const { token, user } = useContext(UserContext);

    useEffect(() => {

        if(token){
            (async () => {
                try{
                    const { data } = await getChats(token);
                    const loadedChates = data.chats.map(chat => { return { ...chat, users: chat.users.filter( u => u._id != user._id) } } );
                    setChats(loadedChates);
                }catch(err){
                    console.log(err);
                }finally {
                    setLoading(false);
                }
            })();
        }

    }, [token]);
    
    return (

        <section className="p-0">
            <Container>
                { loading && <LoadingOverlay /> }
                { !loading && chats.length > 0 && <>
                    <div className="grid grid-cols-8">
                        <div className="col-span-2 p-4 md:p-6 border-r-2 border-slate-200">
                                <ChatList chats={chats}/>
                        </div>
                        <div className="col-span-6 p-4 md:p-6 screen-height">
                            
                            { chat && <ChatDetail chatId={chat} /> }
                            { !chat && <ChatEmpty /> }
                        </div>   
                    </div>  
                </>}
                
            </Container>
        </section>
    )
}
