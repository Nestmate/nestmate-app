

export const RoomMate = ({roommate}) => {

    const { firstName,lastName,birthDate,verified } = roommate;

    return (
        <div className="border-radius-xl">
            <img/>
            <div className="p-3 md:p-4 bg-white">
                <h3 className="text-xl mb-2">{firstName}, 28</h3>
                <p>$500/m in <b>Lisboa</b></p>
                <p></p>
            </div>
        </div>
    )
}
