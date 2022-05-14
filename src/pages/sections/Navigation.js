import { Container } from "../../components/elements/Container"
import Logo from '../../assets/logo/nestmate-logo-full.svg'
import Icon from '../../assets/logo/nestmate-symbol.svg'
import { UserContext } from '../../context/user.context';
import { useContext, useState } from 'react';
import { Profile } from "../../components/navigation/Profile";
import { Disclosure } from '@headlessui/react'
import { NavigationItem } from "../../components/navigation/NavigationItem";
import { Link } from "react-router-dom";
import { Notifications } from "../../components/navigation/Notifications";
import { Burger, Drawer, Stack } from "@mantine/core";

const privateNavigation = [
  { name: 'Mates', to: '/mates', current: false },
  { name: 'Favourites', to: '/favourites', current: false },
  { name: 'Chat', to: '/chats', current: false },
]
const navigation = [
  { name: 'Help?', to: '/support', current: false }
]

const authMenu = [
  { name: 'Sign In', to: '/auth/signin', current: false },
  { name: 'Sign Up', to: '/auth/signup', current: false }
]



export const Navigation = () => {

  const {isLoggedIn,user,logoutUser} = useContext(UserContext);
  const [ opened, setOpened ] = useState(false);

  return (
    <Disclosure as="nav" className='border-b-2 border-slate-200 border-solid'>
      {({ open }) => (
        <>
          <Container>
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                
                <Burger
                  opened={opened}
                  size="md"
                  title="Open navigation"
                  aria-label="Open navigation"
                  onClick={() => setOpened((o) => !o)}
                />
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center justify-center">
                <Link to="/">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={Icon}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-7 w-auto"
                    src={Logo}
                    alt="Workflow"
                  />
                </Link>
                </div>

                {/* MAIN MENU */}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {isLoggedIn && privateNavigation.map( item => <NavigationItem key={item.name} item={item}/>)}
                    {navigation.map( item => <NavigationItem key={item.name} item={item}/>)}
                  </div>
                </div>


              </div>
              
              <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                padding="md"
                size="md"
              >
                <Stack>
                  {isLoggedIn && privateNavigation.map( item => <NavigationItem key={item.name} item={item}/>)}
                  {navigation.map( item => <NavigationItem key={item.name} item={item}/>)}
                </Stack>
              </Drawer>
              
              {/* PROFILE DROPDOWN */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {isLoggedIn && user && <>
                  <Notifications />
                  <Profile user={user} logoutUser={logoutUser}/>
                </>}

                {!isLoggedIn && <>
                  <div className="flex items-center">
                    {authMenu.map( item => <NavigationItem key={item.name} item={item}/>)}
                  </div>
                </>}
              </div>

            </div>
          </Container>

          
        </>
      )}
    </Disclosure>
  )
}
