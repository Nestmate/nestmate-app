import { Link } from "react-router-dom";
import { getAge } from "../../helpers/helpers";
import { StarIcon } from '@heroicons/react/solid'
import { useContext,useState } from "react";
import { UserContext } from "../../../context/user.context";
import { toggleFavouriteUser } from "../../../api/NestmateApi";

export const MateHeader = ({mate}) => {

    const {_id,firstName,lastName,username,birthDate,email,favourite = false} = mate;
    const [isFavourite,setIsFavourite] = useState(favourite);
    const {isLoggedIn,user} = useContext(UserContext);

    console.log(user)

    const favouriteUser = async () => { 
        
        const { data } = await toggleFavouriteUser(user,_id);
        setIsFavourite(data.message);
    }

    return (
        <>
            <header className="flex flex-col md:flex-row gap-3 justify-between">
                <div>
                    <h1 className="text-3xl mb-2">{`${firstName}, ${getAge(birthDate)}`}</h1>
                    <p className="text-slate-800 flex flex-row gap-3"><span>Lisbon</span> <span>500/m</span></p>
                </div>
                <div className="mt-3 flex items-start">
                    {user && <button className={`button-light h-10 mr-2 ${isFavourite && 'active'}`} onClick={favouriteUser}><StarIcon className="h-5 w-5"/></button>}
                    <button to={`/mates/${username}`} className="button">Send Message</button>
                </div>
            </header>
        </>
    )
}
