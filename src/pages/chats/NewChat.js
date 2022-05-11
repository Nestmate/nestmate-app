import { Button, Text, Title, Stack, Select, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useContext, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { createChat, getConnections } from "../../api/NestmateApi";
import { Container } from "../../components/elements/Container";
import { UserContext } from "../../context/user.context";

export const NewChat = () => {

  const navigate = useNavigate();
  const { isLoading ,token, user } = useContext(UserContext);

  const { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [ loadingData, setLoadingData ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState( userId ? userId : '' );
  const [ message, setMessage ] = useState("");
  const [connections, setConnections] = useState([]);

  const onCreateNewConversation = async (e) => {

    e.preventDefault();

    try{

      setLoadingData(true);
      console.log( { users: [ user._id, selectedUser ] , message, token } );
      const { data,status } = await createChat( [ user._id, selectedUser ], message, token );

      if(data?._id && status === 200) return navigate(`/chats/${data._id}`);

      showNotification({
        title: "An Error Occured",
        "message": "Please try again later",
        color: "red"
      });

    }catch(err){
      console.log(err);
    }finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {

    (async () => {

      try{    

        setLoading(true);

        if(token){
          const { data } = await getConnections(token);

          const connectionOptions =  data.map(({ user }) => ({
              label: user.firstName,
              value: user._id
          }));

          console.log(connectionOptions);
          setConnections(connectionOptions);
        }

      }catch(err){

        console.log(err);

      }finally{
        setLoading(false);
      }

    })();

  },[ isLoading ]);

  return (
    <div className="py-10">
      <Container className="max-w-lg">

        { loading && <div>Loading...</div> }

        { !loading && connections?.length === 0 && <>
            <Stack align="center">
                <Title align="center">No Connections yet...</Title>
                <Text align="center" size="lg">Let's connect you with someone first before starting a conversation.</Text>
                <Button component={Link} to="/mates"  size="lg">Check Your Mates</Button>
            </Stack>
          </> }

        { !loading && connections?.length > 0 && <>
          <Stack>
            <Title align="center">Start a New conversation</Title>
            <form onSubmit={onCreateNewConversation}>
              <Stack>
                <Select
                  required
                  value={selectedUser}
                  placeholder="Select a connection"
                  searchable
                  data={ connections }
                  onChange={ ( val ) => setSelectedUser( val ) }
                />
                <Textarea 
                  placeholder="Your message"
                  onChange={ ( e ) => setMessage( e.target.value ) }
                  required
                  />
                <Button type="submit" size="lg" loading={loadingData} disabled={loadingData}>Send Message</Button>

              </Stack>

            </form>
          </Stack>
        </> }

      </Container>
    </div>
  )
}
