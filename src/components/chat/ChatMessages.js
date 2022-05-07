import { ScrollArea, Stack } from "@mantine/core"
import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage"

export const ChatMessages = ( { messages, userId } ) => {

  const viewport = useRef();

  useEffect( () => {
    viewport.current.scrollTo({ top: viewport.current.scrollHeight });
  },[]);

  return (
    <>
      <ScrollArea style={{ height:500 }} viewportRef={viewport}>
        <Stack spacing={'md'}>
        { messages.map( message => <ChatMessage key={message._id} {...message} align={ message.user._id !== userId ? 'left' : 'right' } /> )}
        </Stack>
         
    </ScrollArea>
    </>
  )
}
