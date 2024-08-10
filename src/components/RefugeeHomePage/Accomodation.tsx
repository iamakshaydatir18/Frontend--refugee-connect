
import { Link } from 'react-router-dom';

const Accommodation = () => {
//   const history = Link();

  // Dummy data for Accommodation
  const accommodation = {
    capacity: 50,
    isOccupied: false,
    costPerMonth: 500.00,
    facilities: ['WiFi', 'Kitchen', 'Laundry'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Accommodation Details</h2>
      <p className="mb-2"><strong>Capacity:</strong> {accommodation.capacity}</p>
      <p className="mb-2"><strong>Occupied:</strong> {accommodation.isOccupied ? 'Yes' : 'No'}</p>
      <p className="mb-2"><strong>Cost Per Month:</strong> ${accommodation.costPerMonth}</p>
      <p className="mb-2"><strong>Facilities:</strong></p>
      <ul className="list-disc pl-4 mb-2">
        {accommodation.facilities.map((facility, index) => (
          <li key={index}>{facility}</li>
        ))}
      </ul>
      <p className="mb-4"><strong>Description:</strong> {accommodation.description}</p>
      <Link to=".."><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button></Link>
    </div>
  );
};

export default Accommodation;
