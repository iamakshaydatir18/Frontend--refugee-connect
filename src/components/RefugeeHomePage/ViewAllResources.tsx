import { useEffect, useState } from 'react';
import { Grid, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/root-reducers';
import { useSelector, useDispatch } from 'react-redux';
import { getAllResourceAsync } from '../../store/resource/resource-reducer-actions';
import Footer from './Footer';
import { AppDispatch } from '../../store/store'; // Import AppDispatch

const ResourcePage = () => {
    const navigate = useNavigate();
    const resources = useSelector((state: RootState) => state.resources.resources);
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type for dispatch
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchAllStory = async () => {
            await dispatch(getAllResourceAsync());
            setIsLoaded(true); // Set loaded state to trigger animation
        };

        fetchAllStory();
    }, [dispatch]);

    const handleResourceClick = (resource: {
        id: string;
        name: string;
        description: string;
        contentType: string;
        createdDate: Date;
        userId: string;
        location: string;
        image: string;
        isAvailable: boolean;
    }) => {
        navigate(`/refugee/viewResource/${resource.id}`);
        console.log(resource);
    };

    return (
        <div>
            <Container
                maxWidth={false}
                disableGutters
                style={{
                    paddingLeft: '35px',
                    paddingRight: '35px',
                    paddingTop: '100px',
                    paddingBottom: '60px',
                    minHeight: '100vh', // Set minimum height to fill viewport
                    display: 'flex', // Use flex display to fill viewport
                    flexDirection: 'column', // Align children in column
                    justifyContent: 'space-between', // Align children with space between
                    background: 'linear-gradient(to bottom, #f0f0f0, #333333)',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'opacity 1s ease, transform 1s ease',
                }}
            >
                <Typography variant="h4" align="center" style={{ marginBottom: '20px', fontWeight: 'bold', color: 'white' }}>
                    Explore Resources
                </Typography>
                <Grid container spacing={4}>
                    {resources.map((resource: any) => (
                        <Grid item xs={12} sm={6} md={3} key={resource.id}>
                            <div
                                style={{
                                    border: '2px solid #ccc',
                                    backgroundColor: 'white',
                                    paddingTop: '12px',
                                    paddingLeft: '12px',
                                    paddingRight: '12px',
                                    paddingBottom: '20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.zIndex = '5000';
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.transform = 'scale(1.24)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.zIndex = '1';
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                                onClick={() => handleResourceClick(resource)}
                            >
                                {/* Display resource image */}
                                <img
                                    src={`http://localhost:4000/${resource.image}`}
                                    alt={resource.name}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                                {/* Display resource title */}
                                <Typography variant="h6" style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                    {resource.name}
                                </Typography>
                                {/* Display resource type */}
                                <Typography variant="body2" style={{ color: 'gray' }}>
                                    {resource.contentType}
                                </Typography>
                                {/* Display resource created date */}
                                <Typography variant="body2" style={{ color: 'gray' }}>
                                    Created Date: {new Date(resource.createdDate).toLocaleDateString()}
                                </Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <div style={{ marginTop: '-35px' }}>
                <Footer />
            </div>
        </div>
    );
};

export default ResourcePage;
