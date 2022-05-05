import { MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react"
import { getInterests } from "../../../api/NestmateApi";

export const InterestSelect = ({ loadedInterests, onChange }) => {

    const [currentInterests, setCurrentInterests] = useState([]);
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {

                if( !currentInterests.length ){

                  const { data } = await getInterests();

                  const interestData = data.map(({_id,name}) => ({
                      label: name,
                      value: _id
                  }));
                  
                  console.log(interests);
                  
                  const currInterests = loadedInterests.map(({_id}) => _id);
                  setCurrentInterests(currInterests);
                  setInterests(interestData);
                  setLoading(false);

              }
    
        })();
    },[loadedInterests]);

  return (
    <>
        <MultiSelect
        value={currentInterests}
        data={interests}
        label="Your Interests"
        placeholder="Pick all that you like"
        size="md"
        onChange={(values) => { setCurrentInterests(values); onChange(values) }}
        searchable
        nothingFound="Nothing found"
        />
    </>
  )
}
