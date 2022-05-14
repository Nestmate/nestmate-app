import { Button, Stack, Text, Image } from "@mantine/core"
import EmptyMessages from "../../assets/empty/messages.png"
import { Link, useLocation } from "react-router-dom"
import { Container } from "../elements/Container"

export const ChatEmpty = ({ }) => {

  const location = useLocation();

  return (
    <div>
        <Container className='max-w-2xl py-10'>
            <Stack align="center">
                <Image src={ EmptyMessages} className="w-32 h-32"/>
                <h1 className="text-center">Boo! No Conversation...</h1>
                <Text size="lg" align="center">Start a new one, or just keep swimming.</Text>
                <Button component={ Link } size="lg" to={`/chat/new`} state={{ backgroundLocation: location }}>New Message</Button>
            </Stack>
        </Container>
    </div>
  )
}
