import React from 'react'
import { ChatListItem } from './ChatListItem'

export const ChatList = ({ chats }) => {
  return (
    <>
        { chats.map((chat,i) => <ChatListItem chat={ chat } /> )}
    </>
  )
}
