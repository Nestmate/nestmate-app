import { ScrollArea, Stack } from "@mantine/core"
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage"

export const ChatMessages = ( { messages, newMessages, userId } ) => {

  const viewport = useRef();
  const isMountedRef = useRef();

  useEffect( () => {

    if(!isMountedRef.current ){

      isMountedRef.current = true;
      viewport.current.scrollTo({ top: viewport.current.scrollHeight });

    }else{

      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth'  });

    }
    
  },[ newMessages ]);

  return (
    <>
      <ScrollArea viewportRef={viewport}  offsetScrollbars className="grow px-3">
        <Stack spacing={'md'}>
        { messages.map( message => <ChatMessage key={message._id} {...message} align={ message.user._id !== userId ? 'left' : 'right' } /> )}
        { newMessages.map( message => <ChatMessage key={message._id} {...message} align={ message.user._id !== userId ? 'left' : 'right' } /> )}
        </Stack>
         
    </ScrollArea>
    </>
  )
}
