import { useState,useEffect } from "react"
import { Container } from "../../components/elements/Container";
import { RoomMates } from "../../components/mates/RoomMates"

export const NearByRoomMates = ({theme}) => {

    const [roommates,setRoommates] = useState([
        {
            firstName: 'Bryan',
            lastName: 'Adams',
            birthDate: '18-06-1993',
            verified: false
        },
        {
            firstName: 'Nicole',
            lastName: 'Kidman',
            birthDate: '18-06-1993',
            verified: false
        }
    ]);

    return (
        <section className="py-6 md:py-10 bg-slate-100">

            <Container>

                <h2 class="text-3xl md:text-4xl mb-2">Roommates near you</h2>
                <p class="text-xl text-slate-600 mb-6">Some sort of subtitle</p>
                
                <RoomMates roommates={roommates}/>

            </Container>
        </section>

    )
}
