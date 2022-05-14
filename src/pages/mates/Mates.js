import { useEffect } from "react"
import { Container } from "../../components/elements/Container"
import { UserContext } from "../../context/user.context"
import { useContext,useState } from "react"
import { findMatesByUserId, getMatesByUserId } from "../../api/NestmateApi"
import { Stack, LoadingOverlay } from "@mantine/core"
import { RoomMate } from "../../components/mates/RoomMate"
import { FilterHeader } from "../../components/elements/search/FilterHeader"
import { EmptyState } from "../../components/elements/empty/EmptyState"
import { IsLoading } from "../../middlewares/IsLoading"
import EmptyMate from "../../assets/empty/empty-mates.png"

export const Mates = () => {

    const { token,user } = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    const [mates,setMates] = useState([]);
    const [filteredMates,setFilteredMates] = useState([]);

    const findMates = async (e) => {
        e.preventDefault();
        const { data } = await findMatesByUserId(user._id);
        setMates(data);
        setFilteredMates(data);
    }
    
    useEffect(() => {

        (async () => {
            
            const { data } = await getMatesByUserId(user._id);

            setLoading(false);
            setMates(data);
            
            if(mates.length) setFilteredMates(mates);

        })();

    }, [ IsLoading ]);

  return (
      <section className="min-h-min ">
          <Container>
                
                {loading && <LoadingOverlay />}

                {!loading && mates?.length === 0 && <EmptyState 
                        image={ EmptyMate }
                        title={`Let's find you some mates!`}
                        subtitle={`We make sure to match you with the right people, so you don't have to think about it.`}
                        cta={`Let's find you some mates!`}
                        onAction={ findMates  }
                    />}
                <Stack>
                { !loading && mates?.length > 0 && <>
                
                    <FilterHeader title={'Mates'} mates={ mates } filterMates={ (mates) => setFilteredMates(mates) }/>
                    
                    <div className="grid grid-col-1 md:grid-col-3 lg:grid-cols-4 gap-6">
                        {!loading && mates?.length > 0 && filteredMates.map(mate => <>
                            <RoomMate key={mate.username} roommate={mate}/>
                        </>)}
                    </div>
                </> }
                </Stack>
               
          </Container>
      </section>
  )
}
