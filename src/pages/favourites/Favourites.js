import { useEffect } from "react"
import { Container } from "../../components/elements/Container"
import { UserContext } from "../../context/user.context"
import { useContext,useState } from "react"
import { getFavouritesByUserId } from "../../api/NestmateApi"
import { RoomMate } from "../../components/mates/RoomMate"

export const Favourites = () => {

    const { user } = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    const [favourites,setFavourites] = useState([]);
    
    useEffect(() => {

        (async () => {
            
            const { data } = await getFavouritesByUserId(user._id);
            console.log(data);
            setLoading(false);
            setFavourites(data);
        })();

    }, [user]);

  return (
      <section className="min-h-min">
          <Container>
                <header>
                    <h1 className="mb-6">Favourites</h1>

                    {loading && <p>Loading...</p>}
                    {!loading && favourites?.length === 0 && <p>No mates found</p>}
                    {!loading && favourites?.length > 0 && <div className="grid grid-col-1 md:grid-col-3 lg:grid-cols-4 gap-6">
                        {favourites.map( mate => <RoomMate key={mate.username} roommate={mate}/>)}
                    </div>}
                </header>
          </Container>
      </section>
  )
}
