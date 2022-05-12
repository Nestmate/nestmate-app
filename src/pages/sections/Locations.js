import { useState, useEffect } from "react"
import { getLocations } from "../../api/NestmateApi";
import { Container } from "../../components/elements/Container";
import { Cities } from "../../components/locations/Cities";
import { LoadingMate } from "../../components/mates/LoadingMate";

export const Locations = ({ }) => {

    useEffect(() => {

        (async () => {
            const { data } = await getLocations();
            console.log(data);
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
                
                { loading &&  <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        {[...Array(4)].map(i => <LoadingMate key={i} />)}
                    </div>
                </>}

                {!loading && locations?.length === 0 && <p>No locations found</p>}
``
                {!loading && locations?.length > 0 && <>
                    <Cities cities={locations}/>
                </> }

            </Container>
        </section>

    )
}
