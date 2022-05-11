import { useEffect } from "react"
import { Container } from "../../components/elements/Container"
import { UserContext } from "../../context/user.context"
import { useContext,useState } from "react"
import { findMatesByUserId, getMatesByUserId } from "../../api/NestmateApi"
import { Grid, LoadingOverlay, SimpleGrid } from "@mantine/core"
import { RoomMate } from "../../components/mates/RoomMate"

export const Mates = () => {

    const { token,user } = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    const [mates,setMates] = useState([]);
    
    useEffect(() => {

        (async () => {
            
            const { data } = await getMatesByUserId(user._id);
            if(data?.connections?.length) {

                setLoading(false);
                setMates(data.connections);

            }else{

                const { data } = await findMatesByUserId(user._id);
                setLoading(false);
                setMates(data[0].connections);
            }

        })();

    }, [user]);

  return (
      <section className="min-h-min ">
          <Container>
                <header>

                    <h1 className="mb-6">Mates</h1>
                </header>
                {loading && <LoadingOverlay />}

                {!loading && mates?.length === 0 && <p>No mates found</p>}
                
                <div className="grid grid-col-1 md:grid-col-3 lg:grid-cols-4 gap-6">
                    {!loading && mates?.length > 0 && mates.map(mate => <>
                        <RoomMate key={mate.username} roommate={mate}/>
                    </>)}
                </div>
          </Container>
      </section>
  )
}
