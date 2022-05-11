import { Link } from "react-router-dom";
import { getAge } from "../../helpers/helpers";
import { LocationMarkerIcon } from '@heroicons/react/solid'
import { useContext } from "react";
import { UserContext } from "../../../context/user.context";
import { Avatar } from "@mantine/core";
import { FavouriteButton } from "../../elements/buttons/FavouriteButton";
import { EditButton } from "../../elements/buttons/EditButton";
import { SendMessageButton } from "../../elements/buttons/SendMessageButton";

export const MateHeader = ({mate}) => {

    const {
        _id,
        firstName,
        profilePicture,
        birthDate,
        loc,
        pronounce,
        isFavourited,
    } = mate;

    const {user} = useContext(UserContext);

    return (
        <>
            <header className="">
                 <div className="w-full">
                    <div className="flex flex-row justify-between items-start">
                        <div className="flex flex-row justify-start items-center gap-3">
                            <div>
                                <Avatar
                                    size={'lg'}
                                    fit="cover"
                                    radius={'md'}
                                    src={profilePicture.path}
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl">{`${firstName}, ${getAge(birthDate)}`}</h1>
                                {loc && <p className="text-slate-800 flex flex-row gap-3">
                                    
                                    <span>
                                        <Link 
                                            to={`/mates/location/${loc.coordinates[0]}/${loc.coordinates[1]}`} 
                                            className="flex flex-row items-center">
                                            <LocationMarkerIcon className="h-5 w-5"/>
                                            {loc.location}
                                        </Link>
                                    </span>
                                    {pronounce && <span className="text-slate-500">{pronounce}</span>}
                                </p>}
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            {user && mate._id != user._id && <FavouriteButton isFavourited={isFavourited} mateId={_id}/> }
                            {user && mate._id === user._id && <EditButton />}
                            {user && mate._id !== user._id && isFavourited && <SendMessageButton user={user} mate={mate}/>}
                        </div>
                    </div>
                 </div>
            </header>
        </>
    )
}
