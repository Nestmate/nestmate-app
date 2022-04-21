import { Link } from "react-router-dom"
import { ClassNames } from "../helpers/ClassName";

export const NavigationItem = ({item}) => {

    console.log(item)
    return (
        <>
            <Link 
                to={item.to} 
                className={`nav-link ${item.current && 'bg-slate-200 text-slate-900'}`} 
                aria-current={item.current ? 'page' : undefined}>
                
                {item.name} 
                
            </Link>
        </>
    )
}
