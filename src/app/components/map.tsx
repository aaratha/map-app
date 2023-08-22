'use client';
import React, { Fragment } from 'react';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { createPortal } from 'react-dom';
import { get, getDatabase, onValue, ref, set, update, child } from "firebase/database";

/**
 * A simple map component that displays a map using Mapbox GL and allows the user to add and view markers.
 * @param updateMarkers A function that updates the markers on the map.
 * @param userId The ID of the user whose markers are being displayed.
 * @returns The SimpleMap component.
 */
export default function SimpleMap({ updateMarkers, userId, photo, handlePinClick, clickPinToggle, toggleClickPin }: any ): any {
    const geolocateRef = useRef<mapboxgl.GeolocateControl | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

    const handleMarkerClick = (markerData: any) => {
        console.log('Marker clicked:', markerData);
        handlePinClick(markerData)
    };
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
        async function handlePins(userId: string) {
            const db = getDatabase();
            const userRef = ref(db, `users/${userId}`);
            const snapshot = await get(userRef);
            const userPins = snapshot.val()?.pins || [];
            const allPins = [...userPins];
            const friendsSnapshot = await get(child(userRef, 'friends'));
            if (friendsSnapshot.exists()) {
                const friendsData = friendsSnapshot.val();
                console.log('friendsData: ', friendsData)
                if (Array.isArray(friendsData)) {
                    for (const friendSnapshot of friendsData) {
                    const friendUserId = friendSnapshot.key;
                    const friendUserRef = ref(db, `users/${friendUserId}`);
                    const friendUserSnapshot = await get(friendUserRef);
                    const friendPins = friendUserSnapshot.val()?.pins || [];
                    allPins.push(...friendPins);
                    }
                } else {
                    const friendUserId = Object.keys(friendsData)[0];
                    console.log('friendUserId: ', friendUserId)
                    const friendUserRef = ref(db, `users/${friendUserId}`);
                    const friendUserSnapshot = await get(friendUserRef);
                    const friendPins = friendUserSnapshot.val()?.pins || [];
                    allPins.push(...friendPins);
                }
            }
            return allPins;
        }
        
        async function addMarkers() {
            const db = getDatabase();
            const userRef = ref(db, `users`);
            const pins = await handlePins(userId);
            pins.forEach(async (pin: any) => {
                const el = document.createElement('div');
                el.id = 'marker';
                el.style.position = 'absolute';
                
                const marker = new mapboxgl.Marker({ element: el, anchor: 'center' }).setLngLat(pin.lngLat);
                marker.getElement().addEventListener('click', () => {
                    handleMarkerClick(marker);
                    markerClicked = true;
                });
                const pinCreator = pin.creator;
                const snapshot = await get(child(userRef, `${pinCreator}`))
                const creatorPhoto = snapshot.val()?.photo || '';
                console.log('creatorPhoto: ', creatorPhoto)
                marker.getElement().innerHTML = `<img src=${creatorPhoto} style="border-radius: 50%; cursor: pointer" width="40" height="40" />`;
                marker.addTo(mapRef.current!);
            });
        }
        addMarkers();
    }, [markers, photo, userId]);
    let markerClicked = false;

    // Trigger geolocation when the "Find" button is clicked.
    const handleFindClick = () => {
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
        });
        return unsubscribe;
    }, [userId]);

    // Add a new marker when the map is clicked.
    useEffect(() => {
        if (clickPinToggle) {
            const handleClick = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
                if (markerClicked) {
                    markerClicked = false;
                    return;
                }
                console.log('Click event:', e);
                console.log(e.lngLat);
                const newMarker = new mapboxgl.Marker()
                    .setLngLat(e.lngLat)
                updateMarkers(newMarker);
                toggleClickPin();
            };
            mapRef.current?.off('click', handleClick);
            mapRef.current?.on('click', handleClick);
            return () => {
                mapRef.current?.off('click', handleClick);
            };
        }
    }, [markers, updateMarkers, userId, clickPinToggle]);

    // Render the map and "Find" button.
    return (
        <div className=' h-[93vh]'>
            <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
            <div id="map" className='overflow-hidden w-screen h-full m-auto'></div>
            {clickPinToggle && (
                <p className='absolute left-5 top-20 text-2xl text-white border border-green-600 p-2 rounded-lg bg-black bg-opacity-50 shadow-md'>Click anywhere</p>
            )}
        </div>
    );
}
