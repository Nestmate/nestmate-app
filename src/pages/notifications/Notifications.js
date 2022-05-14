import { UserAddIcon } from "@heroicons/react/outline";
import { Avatar, Button, LoadingOverlay, Stack, Text, Title, Image } from "@mantine/core";
import EmptyNotification from "../../assets/empty/empty-notification.png"
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNotifications } from "../../api/NestmateApi";
import { Container } from "../../components/elements/Container"
import { UserContext } from "../../context/user.context";

export const Notifications = () => {

    const location = useLocation();

    const { token, isLoading } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ range, setRange ] = useState({ skip:0, limit:5 });
    useEffect(() => {
        console.log("notifications");
        if(token){

            (async () => {
                
                try{
                    const { data } = await getNotifications(token, range);
                    console.log(data);
                    setNotifications(data);
                }catch(err){
                    console.log(err);
                }finally{
                    setLoading(false);
                }
                

            })();
        }

    }, [ isLoading ]);

    return (
        <section>
            <Container className={'max-w-lg'}>
                {loading && <LoadingOverlay />}
                {!loading && notifications.length === 0 && <>
                    
                    <Stack align={'center'}>
                        <Image src={ EmptyNotification} className="w-32 h-32"/>
                        <h1 className="text-center text-3xl md:text-4xl">No Notifications Found</h1>
                        <Text align="center" color={'gray'}>Seems like you don't have any notifications yet. You'll get there no worries!</Text>
                        <Button component={ Link } to={'/mates'} size="lg">Find Mates</Button>
                    </Stack>
                </>  
                }
                {!loading && notifications.length > 0 && <>
                    <Stack>
                        <header>
                            <h2>All Notifications</h2>
                        </header>
                    
                        { notifications.map(({ link, title, message, updatedAt }) => <>
                            <Link to={link} state={{ backgroundLocation: location }} className="flex gap-4 items-start py-4 border-b-2 border-slate-200 rounded focus:outline-none">

                                <Avatar color={'blueStone'} size={'md'} className="mt-2">
                                    <UserAddIcon className=' w-6 h-6'/>
                                </Avatar>
                                
                                <div>
                                    { title &&  <Title order={4}>{title}</Title> }
                                    { message && <Text color="gray" size='md' className="mb-3">{ message }</Text> }
                                    { updatedAt && <Text color="gray" size='sm'>{ moment(updatedAt).format( 'MMMM Do YYYY' ) }</Text> }
                                </div>

                            </Link>
                        </> ) }
                    </Stack>
                </> }
            </Container>
        </section>
    )
}
