import { Avatar, Grid, Group, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

export const ChatListItem = ({ chat }) => {
    
    const { _id, users, lastMessage } = chat;
    console.log(users);
    const user = users[0];
    const { firstName, lastName, profilePicture } = user;

    const messageDate =  (date) => moment(lastMessage.createdAt).format('MMM Do');

    return (
        <>
            <UnstyledButton component={ Link } to={`/chats/${_id}`}>
                <Group position="apart">
                    <Group>
                        <Avatar size={40} src={profilePicture.path}></Avatar>
                        <div>
                            <Text>{ firstName }</Text>
                            <Text size="xs" color="gray">{ lastMessage ? lastMessage.message : 'No messages yet' }</Text>
                        </div>
                    </Group>
                    
                    { lastMessage?.updatedAt && <div>
                        <Text size="xs" color="gray" align='right'>{ messageDate(lastMessage.updatedAt) }</Text>
                    </div> }
                </Group>
            </UnstyledButton>
        </>
    )
}
