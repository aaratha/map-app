'use client';
import React, { Fragment } from 'react';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { createPortal } from 'react-dom';
import { get, getDatabase, onValue, ref, set, update } from "firebase/database";

/**
 * A simple map component that displays a map using Mapbox GL and allows the user to add and view markers.
 * @param updateMarkers A function that updates the markers on the map.
 * @param userId The ID of the user whose markers are being displayed.
 * @returns The SimpleMap component.
 */
export default function SimpleMap({ updateMarkers, userId, photo }: any ): any {
    const geolocateRef = useRef<mapboxgl.GeolocateControl | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

    // Initialize the map and geolocation control when the component mounts.
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

        markers.forEach(marker => {
            marker.getElement().innerHTML = `<img src=${photo} style="border-radius: 50%" width="32" height="32" />`;
            marker.addTo(map); 
        });
    }, [markers, photo]);

    // Trigger geolocation when the "Find" button is clicked.
    const handleClick = () => {
        geolocateRef.current?.trigger();
    };

    // Load markers from Firebase when the component mounts.
    useEffect(() => {
        const db = getDatabase();
        const markersRef = ref(db, `users/${userId}/pins`);
        const unsubscribe = onValue(markersRef, (snapshot) => {
            const markersData = snapshot.val();
            if (markersData) {
                const oldMarkers = Object.values(markersData).map((markerData: any) => {
                    const { lng, lat } = markerData.lngLat;
                    const marker = new mapboxgl.Marker()
                        .setLngLat([lng, lat]);
                    return marker;
                });
                setMarkers(oldMarkers);
            }
            return () => unsubscribe();
        });
    }, [userId]);

    // Add a new marker when the map is clicked.
    useEffect(() => {
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
    }, [markers, updateMarkers, userId]); 

    // Render the map and "Find" button.
    return (
        <div>
            <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
            <div className=' rounded-3xl overflow-hidden border border-black p-2 flex justify-center z-10'>
                <div id="map" className='rounded-3xl overflow-hidden border-4 border-black w-[90vw]  md:w-[90vh] h-[70vh] m-auto'>
                </div>
            </div>
            <button onClick={handleClick} className='border border-black border-opacity-25 p-4 pt-2 pb-2 rounded-full hover:bg-white text-black transition-all absolute -translate-y-20 translate-x-10 bg-gray-500 bg-opacity-75 z-20'>Find</button>
        </div>
    );
}
