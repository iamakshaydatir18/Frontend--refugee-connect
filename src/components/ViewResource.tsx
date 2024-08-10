
// viewResource.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MapComponent from './Map/Map';
import { updateResourceAsync, removeResourceAsync } from '../store/resource/resource-reducer-actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store'; // Import the AppDispatch type
import { useNavigate } from 'react-router-dom';

// Ensure this matches your Redux store's Resource type
interface Resource {
  id: string;
  name: string;
  description: string;
  contentType: string;
  createdDate: Date; // Change this to Date if Redux expects Date
  location: string;
  isAvailable: boolean;
  image: string;
  userId: string;
  _id: string;
  __v: number;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff, #e0e0e0, #333);
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
  position: relative;
  z-index: 1;
`;

const CardContainer = styled.div`
  margin-top: 50px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 48%;
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
`;

const Attribute = styled.div<{ disabled?: boolean }>`
  width: 50%;
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
    width: calc(100% - 16px);
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
  margin-top: 50px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 48%;
  height: 675px;
`;

const MapHeader = styled.div`
  background-color: #8b4513;
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
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  width: auto;
  height: auto;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
`;

// (Other styled components here)

const ResourceDetailPage: React.FC = () => {
  const [resource, setResource] = useState<Resource | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams<{ id: string }>();
  const role = localStorage.getItem('role');
  const personId = localStorage.getItem('personId');
  const dispatch = useDispatch<AppDispatch>(); // Use the AppDispatch type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/resource/${id}`);
        const data = response.data[0];
        // Convert createdDate from string to Date
        const resourceData: Resource = {
          ...data,
          createdDate: new Date(data.createdDate),
        };
        setResource(resourceData);
      } catch (error) {
        console.error('Error fetching resource:', error);
      }
    };

    fetchResource();
  }, [id]);

  const handleSave = async () => {
    if (resource) {
      console.log("After edit save resource- ", JSON.stringify(resource));
      // Ensure createdDate is a Date object
      const updatedResource: Resource = {
        ...resource,
        createdDate: new Date(resource.createdDate), // Convert to Date if needed
      };
      await dispatch(updateResourceAsync(updatedResource));
      setEditMode(prevMode => !prevMode);
    }
  };

  const handleEdit = () => {
    setEditMode(prevMode => !prevMode);
  };

  const deleteResource = async () => {
    if (resource) {
      console.log("Delete resource- ", JSON.stringify(resource));
      await dispatch(removeResourceAsync(resource.id));
      navigate('/refugee/viewAllResource');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResource(prevResource => prevResource ? {
      ...prevResource,
      [name]: name === 'isAvailable' ? value === 'true' : value,
    } : undefined);
  };

  return (
    <PageContainer>
      <Overlay />
      {resource ? (
        <PageContent>
          <CardContainer>
            <CardHeader>
              <h2>RESOURCE DETAILS</h2>
            </CardHeader>
            <CardBody>
              <Image src={`http://localhost:4000/${resource.image}`} alt="Resource" />
              <AttributeContainer>
                <Attribute disabled={!editMode}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={resource.name}
                    disabled={!editMode}
                    onChange={handleInputChange}
                  />
                </Attribute>
                {/* Other fields */}
              </AttributeContainer>
            </CardBody>
            <CardFooter>
              {editMode ? (
                (role === 'admin' || personId === resource.userId) && <button onClick={handleSave}>Save</button>
              ) : (
                (role === 'admin' || personId === resource.userId) && <button onClick={handleEdit}>Edit</button>
              )}
              <Link to="../viewAllResource"><button>Back</button></Link>
              <div>
                { (role === 'admin' || personId === resource.userId) && <button onClick={deleteResource}>Delete</button>}
              </div>
            </CardFooter>
          </CardContainer>
          <MapContainer>
            <MapHeader>
              <h2>EXPLORE THE LOCATION</h2>
            </MapHeader>
            <MapContent>
              {!editMode && <MapComponent location={resource.location} />}
            </MapContent>
          </MapContainer>
        </PageContent>
      ) : (
        <div>Loading...</div>
      )}
    </PageContainer>
  );
};

export default ResourceDetailPage;
