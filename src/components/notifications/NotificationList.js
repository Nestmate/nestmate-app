import { Button, Image, List, ScrollArea, Stack, Text, Title } from "@mantine/core"
import { Link } from "react-router-dom"
import EmptyNotification from "../../assets/empty/empty-notification.png"
import { NotificationItem } from "./NotificationItem"
import { Connection } from "./types/Connection"

export const NotificationList = ( { notifications } ) => {

    const notificationTypes = {
        'connection': Connection
    }

  return (
    <div>

         <Stack align={'center'}>

            { notifications.length === 0 && <>
                <Stack align={'center'} spacing="sm" className="w-full py-4">
                    <Image src={ EmptyNotification} className="w-24 h-24"/>
                    <Title order={3}  align={'center'}>No Notifications yet</Title>
                    <Text  align={'center'}>Try to connect with some mates</Text> 
                    <Button component={ Link } to={'/mates'} size="md">Find Mates</Button>
                </Stack>
            </>}

            { notifications.length > 0 && <>
            <ScrollArea style={{ maxHeight:260 }} fullWidth>
            
                { notifications.map( notification =>  <NotificationItem key={ notification._id} notification={notification}/> ) }
                
            </ScrollArea> 
            <Button component={ Link } to="/profile/notifications" fullWidth variant="">See All Notifications</Button>
            </>}

        </Stack>

    </div>
  )
}
