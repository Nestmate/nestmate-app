import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { Textarea, UnstyledButton } from "@mantine/core";
import { useState } from "react";
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
        <div className="p-4 border-t-2 border-slate-200">
            { user && token && <>
                <form onSubmit={onSendMessage} onKeyDown={ (e) => e.key === 'Enter' && onSendMessage(e) }>
                    <div className="flex flex-row gap-4 items-center">
                        <Textarea
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        size="md"
                        className="w-full"
                        />
                        <UnstyledButton className="p-2" type="submit" loading={isLoading}><PaperAirplaneIcon className="w-6 h-6 text-slate-700"/></UnstyledButton>
                    </div>
                </form>
            </>}
        </div>
        
    )
}
