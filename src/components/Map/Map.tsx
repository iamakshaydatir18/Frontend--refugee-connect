import  { useEffect, useState } from 'react';
import mapboxgl  from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import axios from 'axios'; // for making API requests
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const MapComponent = ({ location }: { location: string }) => {
  const [map, setMap] = useState<Map | null>(null);
  const [startingCoordinates, setStartingCoordinates] = useState<Coordinates | null>(null);
  const [endingCoordinates, setEndCoordinates] = useState<Coordinates | null>(null);
  
  const navigate = useNavigate();
  let latitude : any;
  let longitude : any;

  async function handleDirection() {
    if (startingCoordinates && endingCoordinates) {
      console.log(" lat & log  ", startingCoordinates.latitude,startingCoordinates.longitude,endingCoordinates.latitude,endingCoordinates.longitude)
      navigate(`/refugee/resource/mapView/${startingCoordinates.latitude}/${startingCoordinates.longitude}/${endingCoordinates.latitude}/${endingCoordinates.longitude}`);
    }
  }

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            resolve(position);
          },
          (error: GeolocationPositionError) => {
            reject(error);
          }
        );
      }
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtYWtzaGF5ZGF0aXIxOCIsImEiOiJjbHY2dDN3dzAwMnNxMmtuMDY5anlpaG8yIn0.6EKD6UsjSCuY4YkN1tYWjw';
    const initializeMap = async() => {
      const map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.0589, 42.3601], // Default center (Boston coordinates)
        zoom: 14 // Adjust the zoom level
      });

      await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => {
          const coordinates = response.data.features[0].geometry.coordinates;
          const [longitude, latitude] = coordinates;
          setStartingCoordinates({ latitude: latitude, longitude: longitude }); 

          new mapboxgl.Marker({ anchor: 'bottom' })
            .setLngLat([longitude, latitude])
            .addTo(map);

          map.setCenter([longitude, latitude]);
        })
        .catch(error => {
          console.error('Error geocoding address:', error);
        });

      setMap(map);

      await getCurrentLocation()
      .then(position => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        setEndCoordinates({ latitude: latitude, longitude: longitude }); 
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      })
      .catch(error => {
        console.error('Error getting current location:', error.message);
      });

    };

    if (!map) initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    }
  }, [map, location]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div id="map-container" style={{ width: '100%', height: '500px' }} />
      <Button variant="contained" onClick={handleDirection} style={{ marginTop: '20px' }}>Open Directions</Button>
    </div>
  );
};

export default MapComponent;
