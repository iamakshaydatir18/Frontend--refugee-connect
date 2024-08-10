
import { Link } from 'react-router-dom';

const FoodDistributionCenter = () => {
//   const history = useHistory();

  // Dummy data for Food Distribution Center
  const foodDistributionCenter = {
    name: 'Food Distribution Center A',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: '123 Main Street, City, Country',
    isAvailable: true,
    capacity: 100,
    storageConditions: 'Dry and cool',
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{foodDistributionCenter.name}</h2>
      <p className="mb-2">{foodDistributionCenter.description}</p>
      <p className="mb-2"><strong>Location:</strong> {foodDistributionCenter.location}</p>
      <p className="mb-2"><strong>Availability:</strong> {foodDistributionCenter.isAvailable ? 'Available' : 'Not Available'}</p>
      <p className="mb-2"><strong>Capacity:</strong> {foodDistributionCenter.capacity}</p>
      <p className="mb-4"><strong>Storage Conditions:</strong> {foodDistributionCenter.storageConditions}</p>
      <Link to=".."><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button></Link>
    </div>
  );
};

export default FoodDistributionCenter;
