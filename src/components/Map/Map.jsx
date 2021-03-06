import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px',
    };


    class MapGH extends Component {
    render() {
        return (
        <LoadScript
            googleMapsApiKey="AIzaSyAaiOR1vTahbnVKQtvOy1cRUgR0QIOe9qE"
        >
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat: 50.81257958506358, lng: 4.349987925265931}}
            zoom={17}
            >

            <Marker position={{lat: 50.81257958506358, lng: 4.349987925265931}} />
            </GoogleMap>
        </LoadScript>
        )
    }
}

export default MapGH;