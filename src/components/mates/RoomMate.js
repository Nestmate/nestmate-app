import { Link, useLocation } from "react-router-dom";
import { getAge, toDate } from "../helpers/helpers";
import { Image } from "@mantine/core";
import { useEffect } from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";


export const RoomMate = ({roommate}) => {

    const location = useLocation();

    const { username, profilePicture, firstName, birthDate, loc, budgetRange } = roommate;

    useEffect(() => {
        console.log(roommate);
    } ,[]);

    return (
        <div className="card">
            {roommate && <Link to={`/mates/${username}`} state={{ backgroundLocation: location }}>
                <Image
                    width={'100%'}
                    height={400}
                    fit="cover"
                    src={profilePicture?.path}
                />
                
                <div className="p-4 grid grid-cols-1 gap-1">
                    <h3 className="text-xl">{firstName}, {getAge(birthDate)}</h3>
                    <p className="flex items-center flex-row gap-1"><LocationMarkerIcon className="icon"/>{loc?.location}</p>
                    <p>Starting from <b>${budgetRange[0]}/m</b></p>
                    <div>
                        
                    </div>
                </div>
            </Link>}
        </div>
    )
}
