import { Link } from "react-router-dom";
import { getAge } from "../helpers/helpers";


export const RoomMate = ({roommate}) => {

    const { username ,firstName, birthDate } = roommate;

    

    return (
        <div>
            <Link to={`/mates/${username}`}>
                <img src="https://picsum.photos/400/420" alt={`${firstName}'s face`} className="w-full rounded-lg border-1 border-solid border-slate-200"/>
                <div className="py-4">
                    <h3 className="text-xl mb-2">{firstName}, {getAge(birthDate)}</h3>
                    <p>$500/m in <b>Lisboa</b></p>
                </div>
            </Link>
        </div>
    )
}
