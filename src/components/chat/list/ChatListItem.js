import { Avatar, Grid, Group, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

export const ChatListItem = ({ chat, active = true }) => {
    
    const { _id, users, lastMessage } = chat;

    const user = users[0];

    const { firstName, lastName, profilePicture } = user;

    const messageDate =  (date) => moment(lastMessage.createdAt).format('MMM Do');

    return (
        <>
            <UnstyledButton component={ Link } to={`/chats/${chat._id}`}>
                <div position="apart" className={ `flex flex-row p-3 md:py-4 gap-3 border-b-2 border-b-slate-200 ${ active && 'bg-slate-100'}` }>
                    <Group className='grow'>
                        <Avatar className='w-12 h-12' src={profilePicture.path}></Avatar>
                        <div>
                            <Text>{ firstName }</Text>
                            <Text size="xs" color="gray">{ lastMessage ? lastMessage.message : 'No messages yet' }</Text>
                        </div>
                    </Group>
                    
                    { lastMessage?.updatedAt && <div>
                        <Text size="xs" color="gray" align='right'>{ messageDate(lastMessage.updatedAt) }</Text>
                    </div> }
                    <div className={ `w-1 rounded-sm h-12 bg-transaparant ${ active && 'bg-slate-800'}` }></div>
                </div>
                
            </UnstyledButton>
        </>
    )
}
