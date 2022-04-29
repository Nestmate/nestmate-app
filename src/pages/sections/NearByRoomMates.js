import { useState, useEffect } from "react"
import { getUsersByLocation } from "../../api/NestmateApi";
import { Container } from "../../components/elements/Container";
import { LoadingMate } from "../../components/mates/LoadingMate";
import { RoomMates } from "../../components/mates/RoomMates"

export const NearByRoomMates = ({theme}) => {

    const [roommates,setRoommates] = useState([]);
    const [loading,setLoading] = useState(true);
    const [position,setPosition] = useState(null);

    const showPosition = ({coords}) => {
        setPosition(coords);
    }

    useEffect(() => {

        (async () => {

            if(!position) return await navigator.geolocation.getCurrentPosition(showPosition);
            const { data } = await getUsersByLocation( position.latitude, position.longitude, 100);
            setRoommates(data);
            setLoading(false);
        })();

    },[position]);


    return (
        <section className="bg-slate-100">

            <Container>

                <h2 className="text-3xl md:text-4xl mb-2">Roommates near you</h2>
                <p className="text-xl text-slate-600 mb-6">Some sort of subtitle</p>
                
                {loading ? <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                        {[...Array(5)].map(i => <LoadingMate key={i} />)}
                    </div>
                </> : <RoomMates roommates={roommates}/>}

            </Container>
        </section>

    )
}
