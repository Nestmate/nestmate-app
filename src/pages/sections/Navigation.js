import { Container } from "../../components/elements/Container"
import Logo from '../../assets/logo/nestmate-logo-full.svg'
import Icon from '../../assets/logo/nestmate-symbol.svg'
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';
import { Profile } from "../../components/navigation/Profile";
import { ClassNames } from "../../components/helpers/ClassName";
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { NavigationItem } from "../../components/navigation/NavigationItem";
import { Link } from "react-router-dom";

const navigation = [
  { name: 'Mates', to: '/mates', current: true },
  { name: 'Groups', to: '/groups', current: false },
  { name: 'Help?', to: '/support', current: false },
]
const authMenu = [
  { name: 'Sign In', to: '/auth/signin', current: false },
  { name: 'Sign Up', to: '/auth/signup', current: false }
]



export const Navigation = () => {

  const {isLoggedIn,user,logoutUser} = useContext(UserContext);

  return (
    <Disclosure as="nav" className='border-b-2 border-slate-200 border-solid'>
      {({ open }) => (
        <>
          <Container>
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
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
                    {navigation.map( item => <NavigationItem key={item.name} item={item}/>)}
                  </div>
                </div>


              </div>
              
              {/* PROFILE DROPDOWN */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {isLoggedIn && <Profile user={user} logoutUser={logoutUser}/>}

                {!isLoggedIn && <>
                  <div className="flex items-center">
                    {authMenu.map( item => <NavigationItem key={item.name} item={item}/>)}
                  </div>
                </>}
              </div>

            </div>
          </Container>

          {/* MOBILE MENU */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={ClassNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
