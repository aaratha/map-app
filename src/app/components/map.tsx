'use client';
import React from 'react';

import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export default function SimpleMap():any {
    let lat=40;
    let lng=30;

    const handleClick:any = () => {
        console.log('clicked!');
        geolocate.trigger();
    }

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyYXRoYSIsImEiOiJjbGw5eWZ6anExaDJtM2VtenpuZHJ1c2FuIn0.TOfFT2m_2oDuHFgjEFYiYg';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/aaratha/clla30j0600uh01p83743h1xa', // style URL
            center: [lng, lat], // starting position [lng, lat]
            zoom: 17 // starting zoom
        });
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
            });
            // Add the control to the map.
            map.addControl(geolocate);
            map.on('load', () => {
            geolocate.trigger();
            });
    }, []);

    return (
        <div>
            <div id="map" style={{ width: '49vw', height: '80vh' }} className='rounded-full overflow-auto border berder-white border-opacity-25'></div>
            <button onClick={handleClick}>Find</button>
        </div>
    );
}


