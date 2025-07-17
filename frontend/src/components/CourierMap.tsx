import React, { useEffect, useState } from 'react';
import {GoogleMap} from "@react-google-maps/api";
const containerStyle = {
    height: `300px`,
    width: '100%'
};
export const MAP_DEFAULT_CENTER = { lat: 41.081324, lng: 29.032291 };
export default function CourierMap(){
    return(
        <GoogleMap
            id="courierMap"
            key={'map'}
            mapContainerStyle={containerStyle}
            center={MAP_DEFAULT_CENTER}
            zoom={13}
        />
    )
};