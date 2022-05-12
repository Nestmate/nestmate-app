import { Link } from "react-router-dom"

export const EditButton = () => {
  return (
    <Link 
        to="/profile/settings" 
        className={`button-light hover:bg-slate-200 text-slate-700 hover:text-slate-900 h-10 mr-2`}>

        Edit
        
    </Link>
  )
}
