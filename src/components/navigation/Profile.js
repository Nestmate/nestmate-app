import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { DropDownItem } from './DropDownItem';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const navigation = [
    { name: 'Your Profile', to: '/profile', current: true },
    { name: 'Settings', to: '/settings', current: false },
]


export const Profile = ({user}) => {
    
    const {logoutUser} = useContext(UserContext);

    return (
        <>
        {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
                <div>
                <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-200 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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