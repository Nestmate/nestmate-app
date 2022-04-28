import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { getLocationsByQuery } from '../../../api/NestmateApi'
import { Autocomplete } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { LocationBar } from './LocationBar';

export const LocationSearch = ({size,className}) =>{

    const navigate = useNavigate();

    const [location, setLocation] = useState(null)
    const [query, setQuery] = useState('')
    const [locations,setLocations] = useState([]);
    const [loading,setLoading] = useState(false);

    const onLocationSearchChangeHandler = (values) => setLocation(values);

    const onSearchButtonClicked = (e) => {
        e.preventDefault();
        const { lat,lng } = location.loc;
        if(location) return navigate(`/mates/location/${lat}/${lng}`);
    }


    return (
        <div className={`w-full flex flex-row gap-3 ${className}`}>

            <LocationBar
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