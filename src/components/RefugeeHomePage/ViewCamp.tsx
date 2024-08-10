
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MapComponent from '../Map/Map';
import { useDispatch } from 'react-redux';
import { updateCampAsync, removeCampAsync } from '../../store/camp/camp-reducer-actions';
import { AppDispatch } from '../../store/store'; // Import AppDispatch type

// Your styled-components...
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff, #e0e0e0, #333); /* Gradient background */
  padding: 20px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PageContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative; /* Added position relative for overlay */
  z-index: 1; /* Ensure content appears above the overlay */
`;

const CardContainer = styled.div`
  margin-top: 50px; /* Add top margin */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 48%; /* Adjusted width for better alignment */
`;

const CardHeader = styled.div`
  background-color: #007bff;
  padding: 24px;
  color: #fff;
  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    text-align: center; 
  }
`;

const CardBody = styled.div`
  padding: 32px;
`;

const AttributeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Align attributes with space between */
`;

const Attribute = styled.div<{ disabled?: boolean }>`
  width: calc(50% - 10px);
  margin-bottom: 20px;
  label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
    display: block;
  }
  span {
    color: #333;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  input {
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    ${props => props.disabled && `
      background-color: #f5f5f5;
      cursor: not-allowed;
    `}
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #f5f5f5;
`;

const MapContainer = styled.div`
  margin-top: 50px; /* Add top margin */
  background-color: #fff; /* Set background color to white */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 48%; /* Adjusted width for better alignment */
  height: 675px;
`;

const MapHeader = styled.div`
  background-color: #8b4513; /* Changed background color to reddish brown */
  padding: 24px;
  color: #fff;
  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    text-align: center; 
  }
`;

const MapContent = styled.div`
  padding: 20px;
`;

const Image = styled.img`
  max-width: 100%; /* Ensures image is not wider than its container */
  max-height: 200px; /* Set a maximum height for the image */
  object-fit: cover; /* Ensures the aspect ratio is preserved */
  width: auto; /* Ensures image maintains original width unless it exceeds max-width */
  height: auto; /* Ensures image maintains original height unless it exceeds max-height */
  border-radius: 4px; /* Optional: Rounds the corners of the image */
  display: block; /* Ensures the image is treated as a block element */
  margin: 0 auto; /* Centers the image horizontally */
`;

const CampDetailPage: React.FC = () => {
  const [camp, setCampDetail] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const role = localStorage.getItem('role');
  const personId = localStorage.getItem('personId');
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/camp/${id}`);
        setCampDetail(response.data);
      } catch (error) {
        console.error('Error fetching camp detail:', error);
      }
    };

    fetchCampDetail();
  }, [id]);

  const handleEdit = async (value: string) => {
    if (value === 'Save') {
      console.log("Inside camp store...", JSON.stringify(camp));
      await dispatch(updateCampAsync(camp));
      navigate('/refugee/viewNearByCamps');
    }
    setEditMode(prevMode => !prevMode);
  };

  const deleteCamp = async () => {
    console.log("Inside camp store...", JSON.stringify(camp));
    await dispatch(removeCampAsync(camp.campId));
    navigate('/refugee/viewNearByCamps');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCampDetail((prevCamp: any) => {
      const updatedCamp = {
        ...prevCamp,
        [name]: value,
      };
      console.log(`New state:`, updatedCamp); // Check the updated state
      return updatedCamp;
    });
  };

  return (
    <PageContainer>
      <Overlay />
      {camp ? (
        <PageContent>
          <CardContainer>
            <CardHeader>
              <h2>{editMode ? 'Edit Camp Details' : 'Camp Detail'}</h2>
            </CardHeader>
            <CardBody>
              <Image src={`http://localhost:4000/${camp.campImage}`} alt="Resource" />
              <AttributeContainer>
                <Attribute disabled={!editMode}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="campName"
                    defaultValue={camp.campName || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                  />
                </Attribute>
                <Attribute disabled={!editMode}>
                  <label>Capacity:</label>
                  <input
                    type="number"
                    name="campCapacity"
                    defaultValue={camp.campCapacity || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                  />
                </Attribute>
                <Attribute disabled={!editMode}>
                  <label>Location:</label>
                  <input
                    type="text"
                    name="campLocation"
                    defaultValue={camp.campLocation || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                  />
                </Attribute>
                <Attribute disabled={!editMode}>
                  <label>Current Occupancy:</label>
                  <input
                    type="number"
                    name="campCurrentOccupancy"
                    defaultValue={camp.campCurrentOccupancy}
                    disabled={!editMode}
                    onChange={handleInputChange}
                  />
                </Attribute>
                <Attribute disabled={!editMode}>
                  <label>Management Name:</label>
                  <input
                    type="text"
                    name="campManagementName"
                    defaultValue={camp.campManagementName || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                  />
                </Attribute>
                <Attribute disabled={!editMode}>
                  <label>Infrastructure:</label>
                  <input
                    type="text"
                    name="Infrastructure"
                    defaultValue={camp.Infrastructure || ''}
                    disabled={!editMode}
                    onChange={handleInputChange}
                  />
                </Attribute>
              </AttributeContainer>
            </CardBody>
            <CardFooter>
              <Link to="../viewNearByCamps"><button>Back</button></Link>
              { (role === 'admin' || personId === camp.personId ) && <button onClick={() => handleEdit(editMode ? 'Save' : 'Edit')}>{editMode ? 'Save' : 'Edit'}</button>}
              {(role === 'admin' || personId === camp.personId )  && <button onClick={deleteCamp}>Delete</button>}
            </CardFooter>
          </CardContainer>
          <MapContainer>
            <MapHeader>
              <h2>See the location</h2>
            </MapHeader>
            <MapContent>
              { !editMode && <MapComponent location={camp.campLocation} />}
            </MapContent>
          </MapContainer>
        </PageContent>
      ) : (
        <div>Loading...</div>
      )}
    </PageContainer>
  );
};

export default CampDetailPage;
