import { Button, Divider, Image, Stack, Text, Textarea, Title} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "tabler-icons-react";
import { createChat } from "../../api/NestmateApi";
import { getAge } from "../helpers/helpers";

export const ConnectionDetail = ( { connection, user, token } ) => {

    console.log(connection);
    
    const navigate = useNavigate();
    const [ loadingData, setLoadingData ] = useState(false);
    const [ message, setMessage ] = useState("");

    const getSimilarInterests = arr =>  arr.filter( ({ _id }) => user.interests.includes(_id));


    const onCreateNewConversation = async (e) => {

        e.preventDefault();
    
        try{
    
        setLoadingData(true);
        console.log( { users: [ user._id, user._id ] , message, token } );
        const { data,status } = await createChat( [ user._id, connection.user._id ], message, token );
    
        if(data?._id && status === 200) return navigate(`/chats/${data._id}`);
    
        showNotification({
            title: "An Error Occured",
            "message": "Please try again later",
            color: "red"
        });
    
        }catch(err){
            
            showNotification({
                title: "An Error Occured",
                "message": "Please try again later",
                color: "red"
            });

        }finally {
        setLoadingData(false);
        }
    }

    return (
        <>
            <Stack align={'center'} className="text-center">
                <Image src={connection.user.profilePicture.path} width={'200px'} height={'200px'} radius={'lg'} />
                <Title>{ connection.user.firstName }, { getAge( connection.user.birthDate ) }</Title>
                <Text size="lg">{ connection.user.description ? connection.user.description : 'No description'}</Text>
                { getSimilarInterests(connection.user.interests) > 0 && <>
                        <Text>Common interests</Text>
                        <div className="py-3 flex justify-start  -space-x-1.5">
                        {  getSimilarInterests(connection.user.interests).length === 0 ? <Text>No common interests</Text> : getSimilarInterests(connection.user.interests).map(({ emoji, name }) => <Badge emoji={ emoji }>{ name }</Badge>)}
                        </div>
                    </>}
                <form onSubmit={onCreateNewConversation} className="w-full">
                    <Stack align={'stretch'}>
                        
                        <Textarea 
                        placeholder={`Send ${connection.user.firstName} a message`}
                        size="md"
                        onChange={ ( e ) => setMessage( e.target.value ) }
                        required
                        className="w-full"
                        />
                        <Button type="submit" size="lg" loading={loadingData} disabled={loadingData}>Send Message</Button>

                    </Stack>

                </form>

            </Stack>
        </>
    )
}
