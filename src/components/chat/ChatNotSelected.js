import { Button, Stack, Text, Title } from "@mantine/core"
import { Link, useLocation } from "react-router-dom"
import { Container } from "../elements/Container"

export const ChatNotSelected = ({ }) => {

  const location = useLocation();

  return (
    <div>
        <Container className='max-w-2xl py-10'>
            <Stack align="center">
                <h1 className="text-center">Select a message</h1>
                <Text size="lg" align="center">Choose from your existing conversations, start a new one, or just keep swimming.</Text>
                <Button component={ Link } size="lg" to={`/chat/new`} state={{ backgroundLocation: location }}>New Message</Button>
            </Stack>
        </Container>
    </div>
  )
}
