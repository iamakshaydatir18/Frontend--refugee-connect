import React from 'react';
import { useParams } from 'react-router-dom';
import MapWithDirections from './NewMap';


const MapComponentView: React.FC = () => {
  const { startingLatitude, startingLongitude, endingLatitude, endingLongitude } =
    useParams<{
      startingLatitude?: string;
      startingLongitude?: string;
      endingLatitude?: string;
      endingLongitude?: string;
    }>();


  const startLat = parseFloat(startingLatitude || '0');
  const startLng = parseFloat(startingLongitude || '0');
  const endLat = parseFloat(endingLatitude || '0');
  const endLng = parseFloat(endingLongitude || '0');


  return  <MapWithDirections startpoint={ {lat: startLat, lng: startLng } }
  endpont={ {lat: endLat, lng: endLng }} googleMapsApiKey={'AIzaSyAX5jyzX1HMhOpJxTb8OXshnyjZrtlYqKY'} /> 
};

export default MapComponentView;
