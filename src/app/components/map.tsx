'use client';
import React, { Fragment } from 'react';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { createPortal } from 'react-dom';
import { get, getDatabase, onValue, ref, set, update } from "firebase/database";

export default function SimpleMap({ updateMarkers, userId }: any ): any {
    const geolocateRef = useRef<mapboxgl.GeolocateControl | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyYXRoYSIsImEiOiJjbGxiOG9xdDMwNG56M2txbWNhbzl1Nm1iIn0.t7OS87HS14To9irKMOAh6A';
        
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/aaratha/clla30j0600uh01p83743h1xa',
            center: [30, 40],
            zoom: 1
        });

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
        mapRef.current = map;

        markers.forEach(marker => { marker.addTo(map); });
    }, [markers]);

    const handleClick = () => {
        geolocateRef.current?.trigger();
    };
    useEffect(() => {
        const db = getDatabase();
        const markersRef = ref(db, `users/${userId}/pins`);
        onValue(markersRef, (snapshot) => {
            const markersData = snapshot.val();
            if (markersData) {
                const oldMarkers = Object.values(markersData).map((markerData: any) => {
                    const { lng, lat } = markerData;
                    const marker = new mapboxgl.Marker()
                        .setLngLat([lng, lat]);
                    marker.addTo(mapRef.current!);
                    console.log('ATTENCION PICK POCKET!')
                    return marker;
                });
                setMarkers(oldMarkers);
            }
        });
        const handleClick = (e: mapboxgl.MapMouseEvent) => {
            console.log(e.lngLat);
            const marker = new mapboxgl.Marker()
                .setLngLat(e.lngLat)
                .addTo(mapRef.current!);
            setMarkers(prevMarkers => {
                const newMarkers = [...prevMarkers, marker];
                updateMarkers(newMarkers);
                return newMarkers;
            });
        };
        mapRef.current?.off('click', handleClick);
        mapRef.current?.on('click', handleClick);
        return () => {
            mapRef.current?.off('click', handleClick);
        };
    }, [markers, updateMarkers]); 

    return (
        <div>
            <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
            <div className=' rounded-3xl overflow-hidden border border-black w-[92vw] md:w-[92vh] h-[72vh] flex justify-center z-10'>
                <div id="map" className='rounded-3xl overflow-hidden border border-black w-[90vw]  md:w-[90vh] h-[70vh] m-auto'>
                </div>
            </div>
            <button onClick={handleClick} className='border border-black border-opacity-25 p-4 pt-2 pb-2 rounded-full hover:bg-white text-black transition-all absolute -translate-y-20 translate-x-10 bg-gray-500 bg-opacity-25 z-20'>Find</button>
        </div>
    );
}


