import { useEffect } from "react"
import { Container } from "../../components/elements/Container"
import { UserContext } from "../../context/user.context"
import { useContext,useState } from "react"
import { getFavouritesByUserId } from "../../api/NestmateApi"
import { RoomMate } from "../../components/mates/RoomMate"
import { FilterHeader } from "../../components/elements/search/FilterHeader"
import { Stack } from "@mantine/core"
import { EmptyState } from "../../components/elements/empty/EmptyState"
import { useNavigate } from "react-router-dom"
import EmptyFavourite from "../../assets/empty/empty-favourites.png"


export const Favourites = () => {

    const navigate = useNavigate();

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
                    {!loading && favourites?.length === 0 && <EmptyState 
                        image={ EmptyFavourite }
                        title={`You don't have any favourites yet.`}
                        subtitle={`You can add favourites by clicking on the star icon on the room mate you want to favourite.`}
                        cta={`Find Mates`}
                        onAction={ () => navigate('/mates') }
                    />}
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
