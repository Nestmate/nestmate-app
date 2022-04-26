import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { getLocationsByQuery } from '../../../api/NestmateApi'
import { Autocomplete } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const LocationSearch = ({size,className}) =>{

    const navigate = useNavigate();

    const [location, setLocation] = useState(null)
    const [query, setQuery] = useState('')
    const [locations,setLocations] = useState([]);
    const [loading,setLoading] = useState(false);

    const onLocationSearchChangeHandler = (values) => {

        setQuery(values);   

        const currentLocation = locations.length ? locations.find(location => location.value === values) : null
        
        if(currentLocation) setLocation( currentLocation );
    }

    const onSearchButtonClicked = (e) => {
            e.preventDefault();
            //const { lat,lng } = location.loc;
            //if(location) return navigate(`/mates/location/${lat}/${lng}`);
    }

    useEffect(() => {
        
        const delayDebounceFn = setTimeout(() => {
            (async () => {
                //setLoading(true);
                if(query.length <= 0) return setLocations([]);
                
                const { data } = await getLocationsByQuery(query);

                console.log(data)

                const mappedLocations = data.predictions.map(({description,place_id}) => {
                    return {
                        value: description,
                        loc: place_id
                    } 
                });

                setLocations(mappedLocations);

            })();

        }, 100)

        return () => clearTimeout(delayDebounceFn);

    }, [query])

    return (
        <div className={`w-full flex flex-row gap-3 ${className}`}>

            <Autocomplete
                placeholder="Search by city, state, or zip code"
                nothingFound="No locations found"
                value={query} 
                onChange={onLocationSearchChangeHandler}
                size={size}
                data={locations}
                className="w-full"
                />
            <button className='button' onClick={onSearchButtonClicked}>Search</button>
        </div>
    )
}