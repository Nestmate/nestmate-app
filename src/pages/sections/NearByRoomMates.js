import { useState, useEffect } from "react"
import { getUsersByLocation } from "../../api/NestmateApi";
import { Container } from "../../components/elements/Container";
import { RoomMates } from "../../components/mates/RoomMates"

export const NearByRoomMates = ({theme}) => {

    useEffect(() => {

        (async () => {
            const { data } = await getUsersByLocation( 38.74365, -9.1602, 100);
            setRoommates(data);
            setLoading(false);
        })();

    },[]);

    const [roommates,setRoommates] = useState([]);
    const [loading,setLoading] = useState(true);

    return (
        <section className="bg-slate-100">

            <Container>

                <h2 className="text-3xl md:text-4xl mb-2">Roommates near you</h2>
                <p className="text-xl text-slate-600 mb-6">Some sort of subtitle</p>
                
                {loading ? <p>Loading...</p> : <RoomMates roommates={roommates}/>}

            </Container>
        </section>

    )
}
