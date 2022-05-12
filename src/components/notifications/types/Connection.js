import { UserAddIcon } from '@heroicons/react/outline';
import { Avatar, Text, Title } from '@mantine/core';
import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

export const Connection = ( { notification } ) => {

    const { type , title, message, link, updatedAt } = notification;
    console.log('Connection', notification);

    return (
        <>
            <Link to={link} className="flex gap-2 items-start p-1 hover:bg-slate-100 rounded focus:outline-none">

                <Avatar color={'blueStone'} size={'sm'} className="ml-1 mt-1">
                    <UserAddIcon className=' w-4 h-4'/>
                </Avatar>
                
                <div>
                    { title &&  <Title order={5}>{title}</Title> }
                    { message && <Text color="gray" size='sm'>{ message }</Text> }
                    { updatedAt && <Text color="gray" size='sm'>{ moment(updatedAt).format( 'MMMM Do' ) }</Text> }
                </div>
            </Link>
        </>
    )
}
