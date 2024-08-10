import RegistrationForm from './components/RegistrationForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import LoginPage from './components/LoginPage';
import MainHomePage from './components/MainHomePage';
import RefugeeHomePage from './components/RefugeeHomePage/index';
import RootLayout from './pages/NavBar';
import Accommodation from './components/RefugeeHomePage/Accomodation';
import FoodDistributionCenter from './components/RefugeeHomePage/FoodDistributionCenter';
import AddStoryForm from './components/AddStory';
import UserStories from './components/UserStories';
import ViewAllResources from './components/RefugeeHomePage/ViewAllResources';
import ViewAllCamp from './components/RefugeeHomePage/ViewAllCamp';
import ViewCamp from './components/RefugeeHomePage/ViewCamp.tsx';
import ViewResource from './components/ViewResource.tsx'
import ResourceAdditionPage from './components/UserHomePage/AddResource.tsx';
import CampAdditionPage from './components/AdminHomePage/AddCamp.tsx';
import MapComponentView from './components/Map/Mapdirections.tsx';
import UserHomePage from './components/UserHomePage/HomePage.tsx';
import ProfilePage from './components/Profile.tsx';



const route = createBrowserRouter([
  { 
    path:'/refugee',
    element:<RootLayout/>,
    errorElement:<Error></Error>,
    children:[
      { path:'', element:<MainHomePage/>,},
      { path:'refugeeHomePage', element:<RefugeeHomePage/>,},
      {  path:'login', element:<LoginPage/> },
      { path:'signup', element:<RegistrationForm/> },
      { path:'viewAllResource', element:<ViewAllResources />},
      { path:'viewNearByCamps', element:<ViewAllCamp />},
      { path:'accommodation', element:<Accommodation/> },
      { path:'food-distribution', element:<FoodDistributionCenter/> },
      { path:'addStory', element:<AddStoryForm/> },
      { path:'story', element:<UserStories/> },
      { path:'viewResource/:id', element:<ViewResource/> },
      { path:'addResource', element:<ResourceAdditionPage/> },
      { path:'addCamp', element:<CampAdditionPage/> },
      { path:'camp/:id', element:<ViewCamp/> },
      { path:'resource/mapView/:startingLatitude/:startingLongitude/:endingLatitude/:endingLongitude' , element : <MapComponentView/>}
    ]
  },
  { 
    path:'/user',
    element:<RootLayout/>,
    errorElement:<Error></Error>,
    children:[
      { path:'userHomePage', element:<UserHomePage/>},
      { path:'viewAllResource', element:<ViewAllResources/>},
      { path:'addResource', element:<ResourceAdditionPage/>},
      { path:'MyProfile', element:<ProfilePage/>},
    ]
  },
  
    
]);

function App() {

  console.log('App is rendering with RegistrationForm');
  return (<RouterProvider router={route} />);  

}

export default App;