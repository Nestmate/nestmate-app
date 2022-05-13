import { useState,useRef,useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaG91YW4iLCJhIjoiY2ptYWhvZWMxMGlncDNzcHRjcHI4dWFybyJ9.LZU4i8T_QRFEpCtSLJRr7Q';


export const Map = ({ lat, lng, mates, innerStyle}) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {

        if (! map.current){  // initialize map only once
            
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom
            });
        }

        mates.forEach(mate => {

            const { coordinates } = mate.loc;
            console.log(coordinates);
            new mapboxgl.Marker({ color: 'black', rotation: 45 })
            .setLngLat(coordinates)
            .addTo(map.current);
            
        });

    },[ mates ]);
    
    return (
        <div>
            <div ref={mapContainer} style={ innerStyle }></div>
        </div>
        
    )
}
