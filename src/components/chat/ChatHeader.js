import { ArrowLeftIcon } from '@heroicons/react/outline';
import { SimpleGrid, Stack, Title, Text, Button, UnstyledButton, Avatar} from '@mantine/core'
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export const ChatHeader = ( { chat }) => {

  const location = useLocation()

  const { _id, users } = chat;

  const currentUser = users[0];

  return (

    <header className='border-b-2 border-slate-200 p-3'>
        <div className='flex flex-row gap-3 items-center'>
            <div>
              <UnstyledButton component={ Link } to="/chats" variant="subtile" className='block lg:hidden'>
                <ArrowLeftIcon className='icon'/>
              </UnstyledButton>
            </div>
            <UnstyledButton component={ Link } to={`/mates/${currentUser.username}`} state={{ backgroundLocation:location }} className='grow flex items-center flex-row gap-4'>
                <Avatar size={'md'} src={currentUser.profilePicture.path}></Avatar>
                <div>
                    <Title order={3}>{ currentUser.firstName } { currentUser.lastName }</Title>
                    <Text size='sm' color='gray'>@{currentUser.username}</Text>
                </div>
            </UnstyledButton>
            <div></div>
        </div>
        
        
    </header>

  )

}
