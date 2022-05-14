import { Button, Stack, Text, Title, Image } from "@mantine/core"
import EmptyMessages from "../../assets/empty/messages.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Container } from "../elements/Container"

export const ChatNotSelected = ({ }) => {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
        <Container className='max-w-2xl py-10'>
            <Stack align="center">
                <Image src={ EmptyMessages } className="w-32 h-32"/>
                <h1 className="text-center">Select a message</h1>
                <Text size="lg" align="center">Choose from your existing conversations, start a new one, or just keep swimming.</Text>
                <Button size="lg" component={ Link } to={`/chat/new`} onClick={ () => navigate('/chat/new')}>New Message</Button>
            </Stack>
        </Container>
    </div>
  )
}
