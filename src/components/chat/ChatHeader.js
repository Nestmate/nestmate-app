import { SimpleGrid, Stack, Title, Text} from '@mantine/core'
import React from 'react'

export const ChatHeader = ( { chat }) => {

    console.log({chat});

    const { _id, users } = chat;

    const currentUser = users[0];

  return (

    <header>
        <SimpleGrid cols={2}>
            <div>
                <Title order={3}>{ currentUser.firstName } { currentUser.lastName }</Title>
                <Text size='sm' color='green'>Online</Text>
            </div>
            <div></div>
        </SimpleGrid>
        
        
    </header>

  )

}
