import { useContext, useEffect,useState } from "react"
import { useParams } from "react-router-dom";
import { getUsersByLocation } from "../../api/NestmateApi"
import { Container } from "../../components/elements/Container";
import { RoomMate } from "../../components/mates/RoomMate";
import { UserContext } from "../../context/user.context";
import { Map } from "../../components/map/Map";

export const SearchMates = () => {

  const { user } = useContext(UserContext);
  const [loading,setLoading] = useState(true);
  const [mates,setMates] = useState([]);
  const { lat,lng } = useParams();

    useEffect(() => {

      (async () => {
        
        const {data} = await getUsersByLocation(lat,lng,10,user);
        setLoading(false);
        setMates(data);

      })();

    }, [user]);

    return (
      <section className="py-0">
        <div className="w-full">
          
          <div className="grid grid-cols-2 gap-0">
            <article className="px-4 md:px-6 overflow-y-scroll" style={{height:'80vh'}}>
            <header className="py-8">
              <h1>Search mates</h1>
            </header>
            {loading && <p>Loading...</p>}
            {!loading && mates?.length === 0 && <p>No mates found</p>}
            {!loading && mates?.length > 0 && <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
                {mates.map(mate => <RoomMate roommate={mate} key={mate.username} />)}
              </div>
            </>}
            </article>
            <aside>
              <Map lat={lat} lng={lng} mates={mates}/>
            </aside>
          </div>
        </div>
      </section>
    )
}