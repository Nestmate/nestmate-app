import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { DropDownItem } from './DropDownItem';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Avatar } from '@mantine/core';




export const Profile = ({user}) => {
    
    const {logoutUser} = useContext(UserContext);

    const navigation = [
        { name: 'Your Profile', to: `/mates/${user.username}`, current: true },
        { name: 'Settings', to: '/profile/settings', current: false },
    ]

    return (
        <>
        {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
                <div>
                <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-200 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <Avatar radius="xl" src={user?.profilePicture?.path}/>
                </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {navigation.map( item => <DropDownItem key={item.name} item={item}/>)}
                        
                        <Menu.Item>
                            <button className='dropdown-item w-100' onClick={() => logoutUser()}> Sign out </button>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>

        </>
    )
}
