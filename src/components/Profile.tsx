import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
// Define interface for user profile data
interface UserProfileData {
    name: string;
    username: string;
    email: string;
    role: string;
    // Add other fields as needed
    age?: number;
    nationality?: string;
    gender?: string;
    dob?: string;
    address?: string;
    phone_no?: string;
    blood_type?: string;
    height?: number;
    weight?: number;
    image?: string;
    occupation?: string;
    family_status?: string;
    previous_location?: string;
    current_location?: string;
    ethnicity?: string;
    religion?: string;
    language?: string;
    health?: string;
    education?: string;
    legal_status?: string;
    assistance_needed?: string;
}

const ProfilePage = () => {
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [buttonHovered, setButtonHovered] = useState(false);
    const [editedData, setEditedData] = useState<UserProfileData | null>(null); // Store edited data separately
    const role = localStorage.getItem('role');
    const personId = localStorage.getItem('personId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userProfile;
                switch (role) {
                    case 'refugee':
                        userProfile = await axios.get(`http://localhost:4000/refugee/${personId}`);
                        break;
                    case 'user':
                        userProfile = await axios.get(`http://localhost:4000/user/${personId}`);
                        break;
                }
                const response = userProfile;
                setUserData(response?.data[0]);
                setEditedData(response?.data[0]); // Initialize editedData with fetched user data

            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();

    }, []);
 
    console.log("Data is ",editedData);
    const handleButtonHover = () => {
        setButtonHovered(!buttonHovered);
    };
 
    const handleEditProfile = () => {
        setEditMode(!editMode);
        // Reset editedData to current userData when entering edit mode
        if (!editMode) {
            setEditedData(userData);
        }
    };
 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData!,
            [name]: value,
        }));
    };
 
    const handleSaveProfile = async () => {
        try {
            // Perform save action, for example, send editedData to server
            // Here, I'll just update the UI for demonstration purpose
            console.log("edited data -",editedData);
            let response;
            if(role === 'user'){
                response = await axios.put(`http://localhost:4000/user/register`,editedData);
            }else{
                response = await axios.patch(`http://localhost:4000/refugee/register`,editedData);
            }
            console.log("user edit -", response);
            setUserData(editedData);
            setEditMode(false); // Exit edit mode
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };
 
    const handleCancelEdit = () => {
        setEditedData(userData); // Reset editedData to current userData
        setEditMode(false); // Exit edit mode
    };
 
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'auto', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {userData && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '80%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px', padding: '20px', backgroundColor: 'white' }}>
                    <div style={{ width: '70%' }}>
                        <h1 style={{ marginBottom: '20px', color: '#333' }}>Profile Information</h1>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '100%' }}>
                            <div style={{ width: '45%', marginBottom: '20px' }}>
                                <div style={{ marginBottom: '10px' }}><strong>Username:</strong> {userData.username}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Name:</strong> {editMode ? <input type="text" name="name" value={editedData?.name} onChange={handleInputChange} /> : userData.name}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Email:</strong> {userData.email}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Phone Number:</strong> {editMode ? <input type="text" name="phone_no" value={editedData?.phone_no} onChange={handleInputChange} /> : userData.phone_no}</div>
                               { role === 'refugee' &&  (<><div style={{ marginBottom: '10px' }}><strong>Occupation:</strong> {editMode ? <input type="text" name="occupation" value={editedData?.occupation} onChange={handleInputChange} /> : userData.occupation}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Address:</strong> {editMode ? <textarea name="address" value={editedData?.address} onChange={handleInputChange} /> : userData.address}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Previous Location:</strong> {editMode ? <input type="text" name="previous_location" value={editedData?.previous_location} onChange={handleInputChange} /> : userData.previous_location}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Religion:</strong> {editMode ? <input type="text" name="religion" value={editedData?.religion} onChange={handleInputChange} /> : userData.religion}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Language:</strong> {editMode ? <input type="text" name="language" value={editedData?.language} onChange={handleInputChange} /> : userData.language}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Education:</strong> {editMode ? <input type="text" name="education" value={editedData?.education} onChange={handleInputChange} /> : userData.education}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Date of Birth:</strong> {userData.dob}</div></> )
                                }
                            </div>
                           { role === 'refugee' && (<> <div style={{ width: '45%', marginBottom: '20px' }}>
                                <div style={{ marginBottom: '10px' }}><strong>Age:</strong> {editMode ? <input type="number" name="age" value={editedData?.age} onChange={handleInputChange} /> : userData.age}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Nationality:</strong> {editMode ? <input type="text" name="nationality" value={editedData?.nationality} onChange={handleInputChange} /> : userData.nationality}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Gender:</strong> {editMode ? <input type="text" name="gender" value={editedData?.gender} onChange={handleInputChange} /> : userData.gender}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Assistance Needed:</strong> {editMode ? <input type="text" name="assistance_needed" value={editedData?.assistance_needed} onChange={handleInputChange} /> : userData.assistance_needed}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Blood Type:</strong> {editMode ? <input type="text" name="blood_type" value={editedData?.blood_type} onChange={handleInputChange} /> : userData.blood_type}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Height:</strong> {editMode ? <input type="number" name="height" value={editedData?.height} onChange={handleInputChange} /> : userData.height}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Weight:</strong> {editMode ? <input type="number" name="weight" value={editedData?.weight} onChange={handleInputChange} /> : userData.weight}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Current Location:</strong> {editMode ? <input type="text" name="current_location" value={editedData?.current_location} onChange={handleInputChange} /> : userData.current_location}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Ethnicity:</strong> {editMode ? <input type="text" name="ethnicity" value={editedData?.ethnicity} onChange={handleInputChange} /> : userData.ethnicity}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Health:</strong> {editMode ? <input type="text" name="health" value={editedData?.health} onChange={handleInputChange} /> : userData.health}</div>
                                <div style={{ marginBottom: '10px' }}><strong>Legal Status:</strong> {editMode ? <input type="text" name="legal_status" value={editedData?.legal_status} onChange={handleInputChange} /> : userData.legal_status}</div>
                            </div></>)}
                        </div>
                        {!editMode ? (
                            <button
                                style={{
                                    width: '200px',
                                    padding: '10px',
                                    backgroundColor: buttonHovered ? '#0056b3' : '#007bff',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '50px', // Making the button round
                                    cursor: 'pointer',
                                    marginTop: '20px',
                                    alignSelf: 'center',
                                    transition: 'background-color 0.3s',
                                    fontFamily: 'Arial, sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                }}
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonHover}
                                onClick={handleEditProfile}
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <button
                                    style={{
                                        width: '100px',
                                        padding: '10px',
                                        backgroundColor: '#28a745',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '50px', // Making the button round
                                        cursor: 'pointer',
                                        marginRight: '20px',
                                        fontFamily: 'Arial, sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                    }}
                                    onClick={handleSaveProfile}
                                >
                                    Save
                                </button>
                                <button
                                    style={{
                                        width: '100px',
                                        padding: '10px',
                                        backgroundColor: '#dc3545',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '50px', // Making the button round
                                        cursor: 'pointer',
                                        fontFamily: 'Arial, sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                    }}
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                    <div style={{ width: '30%', marginLeft: '20px', textAlign: 'center' }}>
                        {userData && (
                            <img src={`http://localhost:4000/${userData.image}`} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default ProfilePage;
