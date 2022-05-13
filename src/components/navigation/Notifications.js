import { BellIcon } from "@heroicons/react/outline"
import { ActionIcon, LoadingOverlay, Popover, Text } from "@mantine/core"
import { useContext, useEffect, useState } from "react";
import { getNotifications } from "../../api/NestmateApi";
import { NotificationContext } from "../../context/notification.context";
import { UserContext } from "../../context/user.context";
import { NotificationList } from "../notifications/NotificationList";

export const Notifications = () => {

    const [opened, setOpened] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token, isLoading } = useContext(UserContext);
    const { currentNotification } = useContext(NotificationContext);
    const [ seen, setSeen ] = useState(false);

        

    useEffect(() => {
        console.log("notifications");

        if(token && !isLoaded){
                
            (async () => {

                try{
                    const { data } = await getNotifications(token, { skip:0, limit:5 });
                    console.log(data);
                    data.find(notification => notification.isRead === false ) && setSeen(false);
                    setNotifications(data);

                }catch(err){
                    console.log(err);
                }finally{
                    setLoading(false);
                    setIsLoaded(true);
                }

            })();
        }

        setNotifications( oldNotifications => [ currentNotification, ...oldNotifications ])

    }, [ isLoading, currentNotification ]);

    return (
        <>
            <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                target={<ActionIcon onClick={() => { setOpened(!opened); setSeen(true)}} className={'relative'}>{ !seen && <div className="w-2 h-2 rounded-lg bg-orange-400 absolute -right-1 -top-1"></div> }<BellIcon className="w-6 h-6" /></ActionIcon>}
                width={320}
                position="bottom"
                withArrow
                closeOnEscape={false}
                transition="pop-top-right"
                placement="end"
                spacing={'sm'}
                >
                <div style={{ display: 'flex' }} className="relative w-full justify-center">
                    {/* <Image
                    src="./logo.svg"
                    width={30}
                    height={30}
                    sx={{ minWidth: 30 }}
                    mr="md"
                    /> */}
                    { loading && <LoadingOverlay /> }
                    { !loading && <NotificationList notifications={notifications}/> }
                </div>
                </Popover>
        </>
    )
}
