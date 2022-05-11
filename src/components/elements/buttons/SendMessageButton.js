import { PaperAirplaneIcon } from "@heroicons/react/solid"
import { Link, useLocation } from "react-router-dom";


export const SendMessageButton = ({ user, mate}) => {

    const location = useLocation()

    return (
        
        <Link  className="button" to={`/chat/new/${mate._id}`} state={{ backgroundLocation: location }}><PaperAirplaneIcon className="button-icon"/></Link>
    )
}
