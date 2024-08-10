import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

type center = {
  lat: number,
  lng: number
};

interface MapWithDirectionsProps {
  googleMapsApiKey: string;
  startpoint : center,
  endpont: center
}

const MapWithDirections: React.FC<MapWithDirectionsProps> = ({ googleMapsApiKey , startpoint , endpont }) => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode | null>(null);

  const directionsCallback = (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
    if (status === google.maps.DirectionsStatus.OK && result) {
      setDirectionsResponse(result);
    } else {
      console.error(`Failed to fetch directions, status: ${status}`);
    }
  };

  // When LoadScript has finished loading, it will trigger onLoad and setTravelMode
  const handleLoad = () => setTravelMode(google.maps.TravelMode.DRIVING);

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      onLoad={handleLoad}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startpoint}
        zoom={12}
      >
        {travelMode && (
          <DirectionsService
            options={{
              destination: endpont,
              origin: startpoint,
              travelMode: travelMode
            }}
            callback={directionsCallback}
          />
        )}
        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithDirections;