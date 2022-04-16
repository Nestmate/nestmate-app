

export const RoomMate = ({roommate}) => {

    const { firstName, birthDate } = roommate;

    const calculateAgeFromDate = (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        console.log(birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <div className="rounded-lg border overflow-hidden">
            <img src="https://picsum.photos/400/420" alt={`${firstName}'s face`} className="w-100"/>
            <div className="p-3 md:p-4 bg-white">
                <h3 className="text-xl mb-2">{firstName}, {calculateAgeFromDate(birthDate)}</h3>
                <p>$500/m in <b>Lisboa</b></p>
            </div>
        </div>
    )
}
