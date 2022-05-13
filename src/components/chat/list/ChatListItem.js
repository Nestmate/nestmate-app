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
                <div position="apart" className={ `w-full flex flex-cols p-3 pr-0 md:py-1 gap-3 border-b-2 border-b-slate-200 ${ active && 'bg-slate-100'}` }>
                    <div className='flex gap-3 w-full py-3'>
                        <Avatar className='w-12 h-12 ' src={profilePicture.path}></Avatar>
                        <div>
                            <div className='flex justify-between items-center w-full'>
                                <Text>{ firstName }</Text>
                                { lastMessage?.updatedAt &&<>
                                <Text size="xs" color="gray" align='right'>{ messageDate(lastMessage.updatedAt) }</Text>
                                </> }
                            </div>
                            <div>
                                <p className='text-sm text-slate-800'>{ lastMessage ? lastMessage.message : 'No messages yet' }</p>
                            </div> 
                        </div>
                    </div>
                   

                    <div className={ `w-1 rounded-sm grow bg-transaparant group-hover:bg-slate-400 mx-1 ${ active && 'bg-slate-800'}` }></div>
                </div>
                
            </UnstyledButton>
        </>
    )
}
