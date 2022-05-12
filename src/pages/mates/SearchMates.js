import { useContext, useEffect,useState } from "react"
import { useParams } from "react-router-dom";
import { getUsersByLocation } from "../../api/NestmateApi"
import { Container } from "../../components/elements/Container";
import { RoomMate } from "../../components/mates/RoomMate";
import { UserContext } from "../../context/user.context";
import { Map } from "../../components/map/Map";
import { LoadingMate } from "../../components/mates/LoadingMate";
import { FilterHeader } from "../../components/elements/search/FilterHeader";
import { Stack } from "@mantine/core";

export const SearchMates = () => {

  const { user } = useContext(UserContext);
  const [loading,setLoading] = useState(true);
  const [mates,setMates] = useState([]);
  const [filteredMates,setFilteredMates] = useState([]);
  const { lat,lng } = useParams();

    useEffect(() => {

      (async () => {
        
        const {data} = await getUsersByLocation(lat,lng,10,user);
        setLoading(false);
        setMates(data);
        setFilteredMates(data);

      })();

    }, [user]);

    return (
      <section className="py-0">
        <div className="w-full">
          
          <div className="grid grid-cols-2 gap-0">
            <article className="p-4 md:p-8 overflow-y-scroll screen-height">
              <Stack>
                <FilterHeader title={'Mates'} mates={ mates } filterMates={ ( mates ) => setFilteredMates(mates) }/>

                {loading && <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[...Array(4)].map(i => <LoadingMate key={i} />)}
                </div>
                </>}

                {!loading && mates?.length > 0 && <>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
                    {filteredMates.map(mate => <RoomMate roommate={mate} key={mate.username} />)}
                  </div>
                </>}

                {!loading && mates?.length === 0 && <p>No mates found</p>}
              </Stack>
            </article>
            <aside>
              <Map lat={lat} lng={lng} mates={filteredMates}/>
            </aside>
          </div>
        </div>
      </section>
    )
}