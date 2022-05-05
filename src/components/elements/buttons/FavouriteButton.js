import { StarIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react'
import { UserContext } from '../../../context/user.context';
import { toggleFavouriteUser } from "../../../api/NestmateApi";

export const FavouriteButton = ({isFavourited,mateId}) => {

    console.log(isFavourited);
    const { getToken } = useContext(UserContext);
    const token = getToken();
    const [isFavourite, setIsFavourite] = useState(isFavourited);
    const favouriteClass = isFavourite ? 'favourite-button-active' : 'favourite-button-inactive';

    const favouriteUser = async () => { 
        
        const { data } = await toggleFavouriteUser(token,mateId);
        setIsFavourite(data.message);

    }

    return (
        
        <button 
            className={`button-light ${isFavourite && 'active'}`} 
            onClick={favouriteUser}>
            <StarIcon className="button-icon"/>
        </button>
    )
}
