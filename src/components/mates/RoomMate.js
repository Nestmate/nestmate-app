import { Link, useLocation } from "react-router-dom";
import { getAge } from "../helpers/helpers";
import { Image } from "@mantine/core";
import { useEffect } from "react";


export const RoomMate = ({roommate}) => {

    const location = useLocation();

    const { username, profilePicture, firstName, birthDate, loc, budgetRange } = roommate;

    useEffect(() => {
        console.log(roommate);
    } ,[]);

    return (
        <div>
            {roommate && <Link to={`/mates/${username}`} state={{ backgroundLocation: location }}>
                <Image
                    width={'100%'}
                    height={300}
                    fit="cover"
                    radius={'md'}
                    src={profilePicture?.path}
                />
                
                <div className="py-4 grid grid-cols-1 gap-1">
                    <h3 className="text-xl mb-2">{firstName}, {getAge(birthDate)}</h3>
                    <p>Looking in <b>{loc?.location}</b></p>
                    <p>Starting from <b>${budgetRange[0]}/m</b></p>
                </div>
            </Link>}
        </div>
    )
}
