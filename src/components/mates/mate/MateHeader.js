import { Link } from "react-router-dom";
import { getAge, toDate } from "../../helpers/helpers";
import { LocationMarkerIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import { useContext } from "react";
import { UserContext } from "../../../context/user.context";
import { Avatar, Badge } from "@mantine/core";
import { FavouriteButton } from "../../elements/buttons/FavouriteButton";
import { EditButton } from "../../elements/buttons/EditButton";
import { SendMessageButton } from "../../elements/buttons/SendMessageButton";

export const MateHeader = ({mate}) => {

    const {
        _id,
        firstName,
        profilePicture,
        lastName,
        username,
        description,
        birthDate,
        email,
        loc,
        pronounce,
        budgetRange,
        moveDateRange,
        isFavourited,
    } = mate;

    const {user} = useContext(UserContext);

    return (
        <>
            <header className="">
                 <div className="w-full">
                    <div className="flex flex-row justify-between items-start mb-4">
                        <div className="flex flex-row justify-start items-center gap-3">
                            <div>
                                <Avatar
                                    size={'xl'}
                                    fit="cover"
                                    radius={'md'}
                                    src={profilePicture.path}
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl mb-2">{`${firstName}, ${getAge(birthDate)}`}</h1>
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
                            <SendMessageButton user={user} mate={mate}/>
                        </div>
                    </div>
                    <div className="py-4 border-t-2 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-500 mb-2">Budget Range</p>
                            <p className="text-xl flex flex-row gap-2 items-center">${budgetRange[0]} <DotsHorizontalIcon className="h-4 w-4 text-slate-500"/> ${budgetRange[1]}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-2">Move Date</p>
                            <p className="text-xl flex flex-row gap-2 items-center">{toDate(moveDateRange[0])} <DotsHorizontalIcon className="h-4 w-4 text-slate-500"/> {toDate(moveDateRange[1])}</p>
                        </div>
                    </div>

                    <div className="py-4 border-t-2">
                        <p className="text-slate-500 mb-2">Bio</p>
                        <p className="text-xl">{description}</p>
                    </div>

                    <div className="py-4 border-t-2">
                        <p className="text-slate-500 mb-2">Interest</p>
                        {mate.interests?.map(({name}) => <Badge size="lg">{name}</Badge>)}
                    </div>
                    
                 </div>
                
            </header>
        </>
    )
}
