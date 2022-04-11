import { useState, useEffect } from "react"
import { getLocations } from "../../api/NestmateApi";
import { Container } from "../../components/elements/Container";
import { RoomMates } from "../../components/mates/RoomMates"

export const Locations = ({theme}) => {

    useEffect(() => {

        (async () => {
            const { data } = await getLocations();
            setLocations(data);
            setLoading(false);
        })();

    },[]);

    const [locations,setLocations] = useState(null);
    const [loading,setLoading] = useState(true);

    return (
        <section className="bg-white">

            <Container>

                <h2 className="text-3xl md:text-4xl mb-2">Don’t know where to go?</h2>
                <p className="text-xl text-slate-600 mb-6">Here are a few suggestions.</p>
                
               {loading ? <p>Loading...</p> : locations.length}

            </Container>
        </section>

    )
}
