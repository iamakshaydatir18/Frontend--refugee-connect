// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'; // Assuming you use react-places-autocomplete for geocoding
// import { RootState } from '../../store/root-reducers';
// // Assuming you have Redux actions for managing resources


// type cordinate  = {
//  long: Number,
//  lat : Number
// }

// const ResourceList = () => {
//   const dispatch = useDispatch();
//   const resources = useSelector((state: RootState) => state.resources.resources); 
//   const[userLocation,setUserLocation] = useState<cordinate>();
 
//   useEffect(() => {
//     // Fetch resources from your API or any other source
//     // Dispatch an action to store resources in Redux
//     // Example:
//     // fetchResources().then(resources => dispatch(setResources(resources)));
//   }, [dispatch]);

//   useEffect(() => {
//     // Check if the Geolocation API is supported by the browser
//         if ('geolocation' in navigator) {
//     // Get the current position of the user
//     navigator.geolocation.getCurrentPosition(
//       (position) => {

//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
  
//         // Now you have the user's latitude and longitude, you can use it as needed
//         setUserLocation({lat:latitude,long:longitude});
//         console.log('Latitude:', latitude);
//         console.log('Longitude:', longitude);

//         });

//         const filteredResources = resources.filter(resource => {
//             // Geocode resource's address to get latitude and longitude
//             const resourceLatLng = geocodeByAddress(resource.location)
//               .then(results => getLatLng(results[0]))
//               .catch(error => {
//                 console.error('Error geocoding resource address:', error);
//                 return null;
//               });

//               console.log("resourceLatLng is -",resourceLatLng);
//         }
       
//   } else {
//     // Geolocation is not supported by the browser
//     console.error('Geolocation is not supported by this browser.');
//   }
  
//   }, []);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     // Haversine formula to calculate distance
//     // Implementation remains the same as previous example
//   };

  

//     // if (userLocation && userLocation.lat && userLocation.long && resourceLatLng) {
//     //   const distance = calculateDistance(
//     //     userLocation.lat,
//     //     userLocation.long,
//     //     resourceLatLng.lat,
//     //     resourceLatLng.lng
//     //   );
//     //   return distance <= 5; // Return true if resource is within 5 miles of user's location
//     // }
//     // return false; // Return false if any location data is missing
//   };

//   return (
//     <div>
//       <h2>Resources within 5 miles:</h2>
//       <ul>
       
//       </ul>
//     </div>
//   );
// };

// export default ResourceList;
