import axios from "axios";
import { useState, useEffect } from "react"
import { Container } from "../../components/elements/Container";
import { RoomMates } from "../../components/mates/RoomMates"

export const NearByRoomMates = ({theme}) => {

    useEffect(() => {

        (async () => {
            const { data } = await axios.get("https://api.nestmate.co/api/users/location/38.74365/-9.1602/100");
            setRoommates(data);
        })();

    },[]);

    const [roommates,setRoommates] = useState([]);

    return (
        <section className="bg-slate-100">

            <Container>

                <h2 className="text-3xl md:text-4xl mb-2">Roommates near you</h2>
                <p className="text-xl text-slate-600 mb-6">Some sort of subtitle</p>
                
                <RoomMates roommates={roommates}/>

            </Container>
        </section>

    )
}
