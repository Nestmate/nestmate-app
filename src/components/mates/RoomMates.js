import { RoomMate } from "./RoomMate"

export const RoomMates = ({roommates}) => { 
    
    return(
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {roommates.length && roommates.map(roommate => <RoomMate roommate={roommate} />)}
            {!roommates.length && <h3 className="text-center text-slate-600 font-normal text-xl">No Roommates to show 😢</h3>}
        </div>
    )
}