import { Link, useLocation } from "react-router-dom";
import { getAge, toDate } from "../helpers/helpers";
import { Image } from "@mantine/core";
import { useEffect } from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { Badge } from "../elements/badges/Badge";


export const RoomMate = ({roommate}) => {

    const location = useLocation();

    const { username, profilePicture, firstName, birthDate, loc, budgetRange, interests } = roommate;

    useEffect(() => {
        console.log(roommate);
    } ,[]);

    return (
        <div >
            {roommate && <Link to={`/mates/${username}`} state={{ backgroundLocation: location }}>
                <Image
                    width={'100%'}
                    height={300}
                    fit="cover"
                    radius={'md'}
                    src={profilePicture?.path}
                />
                
                <div className="py-4 grid grid-cols-1 gap-2">
                    <h3 className="text-xl">{firstName}, {getAge(birthDate)}</h3>
                    <p className="flex items-center flex-row gap-1"><LocationMarkerIcon className="icon"/>{loc?.location}</p>
                    <p>Starting from <b>${budgetRange[0]}/m</b></p>

                    { interests.length > 0 && <>
                        <p className="py-3 flex justify-start  -space-x-1.5">
                        { interests.slice(0,5).map( ({ _id, emoji, name },i) => <Badge key={`interest_$_id}_${i}`}  icon={emoji }></Badge>)}
                        {  interests.length - 6 > 0 && <Badge>+{ interests.length - 6 }</Badge> } 
                        </p>
                    </>}

                </div>
            </Link>}
        </div>
    )
}
