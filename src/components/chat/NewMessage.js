import { Button, Grid, Group, Textarea } from "@mantine/core";
import { useContext, useState } from "react";
import { sendChatMessage } from "../../api/NestmateApi";

export const NewMessage = ({ chatId, user, token }) => {

    const [ message, setMessage ] = useState( "" );
    const [ isLoading, setIsLoading ] = useState( false );

    const onSendMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            await sendChatMessage(chatId, message, user._id, token);
            setMessage("");
        }catch(err){
            console.log(err);
        }finally {
            setIsLoading(false);
        }
    }
   
    return (
        <div>
            { user && token && <>
                <form onSubmit={onSendMessage}>
                    <div className="flex flex-row gap-4">
                        <Textarea
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full"
                        />
                        <Button type="submit" loading={isLoading}>Send</Button>
                    </div>
                </form>
            </>}
        </div>
        
    )
}
