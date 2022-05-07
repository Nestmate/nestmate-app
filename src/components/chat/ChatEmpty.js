import { Button, Stack, Text, Title } from "@mantine/core"
import { Container } from "../elements/Container"

export const ChatEmpty = () => {
  return (
    <div>
        <Container className='max-w-2xl py-10'>
            <Stack align="center">
                <h1 className="text-center">Select a conversation</h1>
                <Text size="lg" align="center">Choose from your existing conversations, start a new one, or just keep swimming.</Text>
                <Button size="lg">New Message</Button>
            </Stack>
        </Container>
    </div>
  )
}
