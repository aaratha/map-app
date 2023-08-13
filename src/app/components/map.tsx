'use client';
import React from 'react';

import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export default function SimpleMap():any {
    let lat=40;
    let lng=30;
    
    const handleClick:any = () => {
        console.log('clicked!');
    }

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyYXRoYSIsImEiOiJjbGw5eWZ6anExaDJtM2VtenpuZHJ1c2FuIn0.TOfFT2m_2oDuHFgjEFYiYg';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [lng, lat], // starting position [lng, lat]
            zoom: 17 // starting zoom
        });
        map.addControl(
            new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
            })
            );
    }, []);

    return (
        <div>
            <div id="map" style={{ width: '50vw', height: '60vh' }}></div>
            <button onClick={handleClick}>Find</button>
        </div>
    );
}


