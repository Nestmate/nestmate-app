import { useEffect } from "react"
import { Container } from "../../components/elements/Container"
import { UserContext } from "../../context/user.context"
import { useContext,useState } from "react"
import { getFavouritesByUserId } from "../../api/NestmateApi"
import { RoomMate } from "../../components/mates/RoomMate"
import { FilterHeader } from "../../components/elements/search/FilterHeader"
import { Stack } from "@mantine/core"

export const Favourites = () => {

    const { user } = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    const [favourites,setFavourites] = useState([]);
    const [filteredMates,setFilteredMates] = useState([]);
    
    useEffect(() => {

        (async () => {
            
            const { data } = await getFavouritesByUserId(user._id);
            console.log(data);
            setLoading(false);
            setFavourites(data);
            setFilteredMates(data);
        })();

    }, [user]);

  return (
      <section className="min-h-min">
          <Container>
                <header>
                    

                    {loading && <p>Loading...</p>}
                    {!loading && favourites?.length === 0 && <p>No mates found</p>}
                    {!loading && favourites?.length > 0 && <>
                        <Stack>

                            <FilterHeader title={'Your Favourites'} mates={ favourites } filterMates={ ( mates ) => setFilteredMates(mates) }/>

                            <div className="grid grid-col-1 md:grid-col-3 lg:grid-cols-4 gap-6">
                                {filteredMates.map( mate => <RoomMate key={mate.username} roommate={mate}/>)}
                            </div>
                        </Stack>
                    </>}
                </header>
          </Container>
      </section>
  )
}
