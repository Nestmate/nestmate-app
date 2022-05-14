import { useContext, useEffect,useState } from "react"
import { useParams } from "react-router-dom";
import { getUsersByLocation } from "../../api/NestmateApi"
import { Container } from "../../components/elements/Container";
import { RoomMate } from "../../components/mates/RoomMate";
import { UserContext } from "../../context/user.context";
import { Map } from "../../components/map/Map";
import { LoadingMate } from "../../components/mates/LoadingMate";
import { FilterHeader } from "../../components/elements/search/FilterHeader";
import { ActionIcon, Avatar, Button, Drawer, Modal, Stack } from "@mantine/core";
import { MapIcon } from "@heroicons/react/outline";
import { EmptyState } from "../../components/elements/empty/EmptyState";

export const SearchMates = () => {

  const { user } = useContext(UserContext);
  const [loading,setLoading] = useState(true);
  const [mates,setMates] = useState([]);
  const [filteredMates,setFilteredMates] = useState([]);
  const [opened, setOpened] = useState(false);
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <article className="p-4 md:p-8 overflow-y-scroll screen-height relative">
              <Stack>
                <FilterHeader title={'Mates'} mates={ mates } filterMates={ ( mates ) => setFilteredMates(mates) }/>

                {loading && <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[...Array(4)].map(i => <LoadingMate key={i} />)}
                </div>
                </>}

                {!loading && mates?.length > 0 && <>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
                    {filteredMates.map(mate => <RoomMate roommate={mate} key={mate.username} />)}
                  </div>
                </>}

                {!loading && mates?.length === 0 && <>
                  <EmptyState 
                  title={'No Mates Found'} 
                  description={'We couldn\'t find any mates in your area. Try searching for a different location.'}/>
                  </>}

                  
              </Stack>
              <Button  onClick={() => setOpened(!opened)} size={'xl'} radius={80} className="fixed bottom-4 right-4  px-4 z-10 block lg:hidden flex justify-center items-center"><MapIcon className="w-10 h-10" /></Button>
            </article>
            
            <aside className="hidden lg:block">
              <Map lat={lat} lng={lng} mates={filteredMates} innerStyle={{height:`calc(100vh - 70px)`}}/>
            </aside>
          </div>
        </div>
        {/* <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding={0}
          size="xl"
        >
          <Map lat={lat} lng={lng} mates={filteredMates}/>
        </Drawer> */}
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            size={'xl'}
            radius={'lg'}
            padding={0}
            withCloseButton={false}
            className="p-0 block lg:hidden"
          >
           <Map lat={lat} lng={lng} mates={filteredMates} innerStyle={ { height:`calc(80vh)`, borderRadius: '10px' } }/>
        </Modal>
      </section>
    )
}