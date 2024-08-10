import { useEffect, useState } from 'react';
import { Grid, Typography, Container } from '@mui/material';
import { RootState } from '../../store/root-reducers';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCampAsync } from '../../store/camp/camp-reducer-actions';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { AppDispatch } from '../../store/store'; // Import AppDispatch

const CampPage = () => {
    const camps = useSelector((state: RootState) => state.camp.camps);
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type for dispatch
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const handleCampClick = (campId: string) => {
        console.log("Inside camp solo view.....", campId);
        navigate(`/refugee/camp/${campId}`);
    };

    useEffect(() => {
        const fetchAllStory = async () => {
            await dispatch(getAllCampAsync());
            setIsLoaded(true);
        };

        fetchAllStory();
    }, [dispatch]);

    console.log("Input camps ", camps);

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
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'linear-gradient(to bottom, #f0f0f0, #333333)',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'opacity 1s ease, transform 1s ease',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    style={{ marginBottom: '20px', fontWeight: 'bold', color: 'white' }}
                >
                    Explore Camps
                </Typography>
                <Grid container spacing={4}>
                    {camps.map((camp) => (
                        <Grid item xs={12} sm={6} md={3} key={camp.campId}>
                            <div
                                style={{
                                    border: '1px solid #ccc',
                                    backgroundColor: 'white',
                                    padding: '10px',
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
                                onClick={() => handleCampClick(camp.campId)}
                            >
                                <img
                                    src={`http://localhost:4000/${camp.campImage}`}
                                    alt={camp.campName}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                                <Typography
                                    variant="h6"
                                    style={{ marginTop: '10px', fontWeight: 'bold' }}
                                >
                                    {camp.campName}
                                </Typography>
                                <Typography variant="body2" style={{ color: 'gray' }}>
                                    Location: {camp.campLocation}
                                </Typography>
                                <Typography variant="body2" style={{ color: 'gray' }}>
                                    Capacity: {camp.campCapacity}
                                </Typography>
                                <Typography variant="body2" style={{ color: 'gray' }}>
                                    Management: {camp.campManagementName}
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

export default CampPage;
