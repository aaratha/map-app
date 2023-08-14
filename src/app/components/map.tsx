'use client';
import React from 'react';
import { useRef } from 'react';

import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export default function SimpleMap():any {
    const geolocateRef = useRef<mapboxgl.GeolocateControl | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyYXRoYSIsImEiOiJjbGw5eWZ6anExaDJtM2VtenpuZHJ1c2FuIn0.TOfFT2m_2oDuHFgjEFYiYg';
        
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/aaratha/clla30j0600uh01p83743h1xa',
            center: [30, 40],
            zoom: 1
        });
        const marker = new mapboxgl.Marker()
            .setLngLat([30, 40])
            .addTo(map); // add the marker to the map

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        
        map.addControl(geolocate);
        geolocateRef.current = geolocate;
        map.on('load', () => {
            geolocateRef.current?.trigger();
        });
    }, []);

    const handleClick = () => {
        geolocateRef.current?.trigger();
    };

    return (
        <div>
            <div className=' rounded-3xl overflow-hidden border border-black w-[92vh] h-[72vh] flex justify-center'>
                <div id="map" className='rounded-3xl overflow-hidden border border-black w-[90vh] h-[70vh] m-auto'></div>
            </div>
            <button onClick={handleClick} className='border border-black border-opacity-25 p-4 pt-2 pb-2 rounded-full hover:bg-white text-black transition-all absolute -translate-y-20 translate-x-10 bg-gray-500 bg-opacity-25'>Find</button>
        </div>
    );
}


