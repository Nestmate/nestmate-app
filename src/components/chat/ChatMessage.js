import { Avatar, Text } from "@mantine/core"
import { timeAgo } from "../helpers/helpers"

export const ChatMessage = ({ message,user, updatedAt, align }) => {


  return (
    <div className={`chat-message-wrapper ${ align } `}>
      <div className={`chat-message ${ align }`}>
        <div>
          { align !== 'right' && <Avatar size={'md'} src={ user.profilePicture.path } />}
        </div>
        <div>
          <div className="chat-message-text mb-1">{ message }</div> 
          <Text className={`text-slate-700 text-${align}`} size="sm">{ timeAgo(updatedAt) }</Text>
        </div>
      </div>
    </div>
  )
}
