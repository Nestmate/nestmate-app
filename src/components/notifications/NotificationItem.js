import { Connection } from "./types/Connection"

export const NotificationItem = ( {notification} ) => {
  return (
    <>
    { notification.type === 'connection' && <Connection notification={notification} /> }
    </>
  )
}
