import { useState,useEffect } from "react"
import { Container } from "../../components/elements/Container";
import { RoomMates } from "../../components/mates/RoomMates"

export const NearByRoomMates = ({theme}) => {

    const [roommates,setRoommates] = useState([
        {
            firstName: 'Bryan',
            lastName: 'Adams',
            birthDate: '1987/06/18',
            verified: false
        },
        {
            firstName: 'Nicole',
            lastName: 'Kidman',
            birthDate: '2003/06/18',
            verified: false
        },
        {
            firstName: 'Bryan',
            lastName: 'Adams',
            birthDate: '1996/06/18',
            verified: false
        },
        {
            firstName: 'Nicole',
            lastName: 'Kidman',
            birthDate: '1993/06/18',
            verified: false
        },
        {
            firstName: 'Bryan',
            lastName: 'Adams',
            birthDate: '1976/06/18',
            verified: false
        }
    ]);

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
