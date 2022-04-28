import { useState, useEffect } from 'react'
import { getLocationsByQuery } from '../../../api/NestmateApi'
import { Autocomplete } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const LocationBar = ({size , label, onChange}) =>{


    const [location, setLocation] = useState(null)
    const [query, setQuery] = useState('')
    const [locations,setLocations] = useState([]);
    const [loading,setLoading] = useState(false);

    const onLocationSearchChangeHandler = (values) => {

        setQuery(values);   

        const currentLocation = locations.length ? locations.find(location => location.value === values) : null
        
        if(currentLocation) { 
            setLocation( currentLocation );
            onChange(currentLocation);
        }
        
    }

    useEffect(() => {
        
        const delayDebounceFn = setTimeout(() => {
            (async () => {
                //setLoading(true);
                if(query.length <= 0) return setLocations([]);
                
                const { data } = await getLocationsByQuery(query);

                console.log(data)

                const mappedLocations = data.candidates.map(({formatted_address,geometry}) => {
                    return {
                        value: formatted_address,
                        loc: geometry.location
                    } 
                });

                setLocations(mappedLocations);

            })();

        }, 100)

        return () => clearTimeout(delayDebounceFn);

    }, [query,location])

    console.log(location);

    return (
        <Autocomplete
        label={label}
        placeholder="Search by city, state, or zip code"
        nothingFound="No locations found"
        value={query} 
        onChange={onLocationSearchChangeHandler}
        size={size}
        data={locations}
        className="w-full"
        />
    )
}