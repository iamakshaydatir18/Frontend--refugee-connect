import React from 'react';
import { Container, Grid, Button, Typography, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { useSpring, animated, config } from 'react-spring';
import styled, { keyframes } from 'styled-components';


const WelcomeText = styled(Typography)`
    fontFamily: 'cursive';
`;

// Define background gradient
const BackgroundGradient = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 400% 400%;
    animation: ${keyframes`
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    `} 30s ease infinite;
    z-index: -1;
`;

const AdminHomePage = () => {
    // Animation for card fade-in
    const fadeInStyle = useSpring({
        to: { opacity: 1, transform: 'translateY(0)' },
        from: { opacity: 0, transform: 'translateY(20px)' },
        config: config.gentle
    });

    // Animation for card hover
    const [hoverState, setHoverState] = React.useState({
        refugee: false,
        camp: false,
        medical: false
    });

    const handleCardHover = (card: 'refugee' | 'camp' | 'medical', isHovering: boolean) => {
        setHoverState((prevState) => ({
            ...prevState,
            [card]: isHovering
        }));
    };

    // Helper function to handle navigation
    const navigate = (url: string) => {
        window.location.href = url;
    };

    return (
        <Container maxWidth={false} style={{ height: '100vh', overflow: 'auto', padding: '20px 20px 0', marginTop: '80px' }}>
            <BackgroundGradient />
            <WelcomeText variant="h2" align="center" gutterBottom>
                Welcome Admin
            </WelcomeText>
            <Grid container spacing={4} justifyContent="center">
                
                {/* Refugee Management Card */}
                <Grid item xs={12} sm={6} lg={4}>
                    <animated.div
                        style={{
                            ...fadeInStyle,
                            transform: hoverState.refugee ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onMouseEnter={() => handleCardHover('refugee', true)}
                        onMouseLeave={() => handleCardHover('refugee', false)}
                    >
                        <Card
                            style={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out'
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image="../src/images/AdminRefugee.jpg"  
                                alt="Refugee Management"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Refugee Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Add or view refugee records and manage their data effectively. Ensure timely assistance and support.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => navigate('/add-refugee')}>
                                    Add Refugee
                                </Button>
                                <Button size="small" color="primary" onClick={() => navigate('/view-refugees')}>
                                    View Refugees
                                </Button>
                            </CardActions>
                        </Card>
                    </animated.div>
                </Grid>

                {/* Camp Management Card */}
                <Grid item xs={12} sm={6} lg={4}>
                    <animated.div
                        style={{
                            ...fadeInStyle,
                            transform: hoverState.camp ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onMouseEnter={() => handleCardHover('camp', true)}
                        onMouseLeave={() => handleCardHover('camp', false)}
                    >
                        <Card
                            style={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out'
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image="../src/images/AdminCamp.jpg" 
                                alt="Camp Management"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Camp Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Set up new camps and monitor existing ones, ensuring facilities are adequate for the refugees' needs.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => navigate('/add-camp')}>
                                    Add Camp
                                </Button>
                                <Button size="small" color="primary" onClick={() => navigate('/view-camps')}>
                                    View Camps
                                </Button>
                            </CardActions>
                        </Card>
                    </animated.div>
                </Grid>

                {/* Medical Management Card */}
                <Grid item xs={12} sm={6} lg={4}>
                    <animated.div
                        style={{
                            ...fadeInStyle,
                            transform: hoverState.medical ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onMouseEnter={() => handleCardHover('medical', true)}
                        onMouseLeave={() => handleCardHover('medical', false)}
                    >
                        <Card
                            style={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out'
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image="../src/images/AdminMedical.jpg" 
                                alt="Medical Management"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Medical Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Oversee medical appointments and maintain health records for timely care and assistance to refugees.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => navigate('/manage-medical-appointments')}>
                                    Manage Appointments
                                </Button>
                            </CardActions>
                        </Card>
                    </animated.div>
                </Grid>

            </Grid>
        </Container>
    );
};

export default AdminHomePage;
