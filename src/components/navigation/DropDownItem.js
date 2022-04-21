import { Link } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { ClassNames } from "../helpers/ClassName";

export const DropDownItem = ({item}) => {
    return (
        <>
            <Menu.Item>
                <Link
                    to={item.to}
                    className='dropdown-item'
                    aria-current={item.current ? 'page' : undefined}
                    >
                    {item.name}
                </Link>
            </Menu.Item>
        </>
    )
}
