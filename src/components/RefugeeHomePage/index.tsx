
import UserStories from '../UserStories';
import ViwAllResourceAndNearbyCamps from './NewResource';
import HeaderSection from './Header';
import backgroundImage from '../../images/backgroundImage2.png'

const ResourceHomePage = () => {
  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <HeaderSection />
      <UserStories/>
      <ViwAllResourceAndNearbyCamps />
    </div>
  );
};

export default ResourceHomePage;
