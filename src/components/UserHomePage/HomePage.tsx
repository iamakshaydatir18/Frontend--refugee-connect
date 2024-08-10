import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { Box, CardMedia } from '@mui/material';
import Footer from '../RefugeeHomePage/Footer';
import { useNavigate } from 'react-router-dom';
import UserStories from '../UserStories';


const UserHomePage = () => {
    // Define the animation properties using useSpring
    const fadeInStyle = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 2000 },
    });
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const [campsInView, setCampsInView] = useState(false);


    useEffect(() => {
     
        const campsSection = document.getElementById('campsSection');
    
        const handleScroll = () => {
    
          if (campsSection) {
            const { top } = campsSection.getBoundingClientRect();
            if (top < window.innerHeight * 0.75) {
              setCampsInView(true);
            }
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);


    function handleClick(value : string){

        switch(value){
            case  'view':  navigate('/user/viewAllResource'); break;
            case 'add' : navigate('/user/addResource'); break;
            case 'donate': window.location.href='https://donate.stripe.com/test_7sIcOV4mm0hEc9O000'; break;
            default:break;
        }
    }

    return (<>
       <Container style={{ overflowY: 'auto', overflowX: 'hidden', padding: '0px', maxWidth: '100vw', backgroundColor: 'lightgrey'}}>
            <div style={{marginTop:'100px', marginLeft:'70px', width: '90%'}}>
                <UserStories/>
            </div>
            <Grid container spacing={4} style={{ height: '100%' }}>
                {/* Resource section */}
                <Grid item xs={12} md={12} style={{ marginTop: '100px' }}>
                    {/* Outer container with padding for the resource section */}
                    <Container style={{ padding: '20px', maxWidth: '90%', border: '1px solid #dcdcdc', borderRadius: '20px', backgroundColor: 'white' }}>
                        <Grid container spacing={4} style={{ alignItems: 'center' }}>
                            {/* Resource image */}
                            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <animated.img
                                    src="../src/images/UserHomeResource.png"
                                    alt="Resource"
                                    style={{ maxWidth: '85%', maxHeight: '80%', ...fadeInStyle }}
                                />
                            </Grid>
                            {/* Resource text */}
                            <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '10%' }}>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    gutterBottom
                                    style={{ fontWeight: 'bold' }}
                                >
                                    What is a Resource?
                                </Typography>
                                <Typography
                                    variant="body1"
                                    align="center"
                                    paragraph
                                >
                                    A resource could refer to various types of materials, services, or facilities that are available to support individuals or communities in need. These resources can include food, shelter, medical supplies, educational materials, or any other essential items or services.
                                </Typography>
                                <Typography
                                    variant="body1"
                                    align="center"
                                    paragraph
                                    style={{ fontWeight: 'bold' }}
                                >
                                    Have extra resources at hand?
                                </Typography>
                                <Typography
                                    variant="body1"
                                    align="center"
                                    paragraph
                                >
                                    Consider contributing them to make a positive impact! By adding your surplus to our community, you can share your abundance and help those who could benefit from your generosity.
                                </Typography>
                                <Grid
                                    container
                                    justifyContent="center"
                                    spacing={2}
                                    style={{ marginTop: '12px' }}
                                >
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary" onClick={ () => handleClick('view')}
                                        >
                                            View All Resources
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={ () => handleClick('add')} >
                                            Add New Resource
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                { role === 'admin' &&  <Grid item xs={12} md={6}>
            <Box sx={{
              display: 'flex',
              height: '100%', // Set height to 100%
              alignItems: 'center',
              animation: campsInView ? 'slideInFromRight 1s forwards' : '',
              '@keyframes slideInFromRight': {
                '0%': { transform: 'translateX(100%)', opacity: 0 },
                '100%': { transform: 'translateX(0)', opacity: 1 },
              },
            }}>
              <Box sx={{ width: '50%', p: 2, order: { xs: 2, md: 1 } }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  Nearby Camps
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.5 }}>
                  Easily find nearby camps through our platform. Click for detailed information on locations and amenities.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1.5 }}
                  onClick={() => navigate('/refugee/viewNearByCamps')}
                >
                  View Nearby Camps
                </Button>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: '50%', objectFit: 'contain', order: { xs: 1, md: 2 } }}
                image="../src/images/UserHomeResource.png"
                alt="Descriptive Alt Text for Image 2"
              />
            </Box>
          </Grid>}
                {/* Donation section */}
                <Grid item xs={12} md={12} style={{ marginTop: '20px' }}> {/* Added marginTop */}
                    {/* Outer container with padding for the donation section */}
                    <Container style={{ padding: '20px', maxWidth: '90%', border: '1px solid #dcdcdc', borderRadius: '20px', backgroundColor: 'white', marginBottom: '55px' }}>
                        <Grid container spacing={4} style={{ alignItems: 'center' }}>
                            {/* Donation text */}
                            <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
                                    Donate to Help
                                </Typography>
                                <Typography variant="body1" align="center" paragraph>
                                    Your donation can make a significant difference in the lives of those in need. By contributing, you are helping provide essential resources such as food, shelter, and medical supplies to people who require assistance. Together, we can create a positive impact on the community.
                                </Typography>
                                <Button variant="contained" color="primary" style={{ marginTop: '16px' }}
                                 onClick={ () => handleClick('donate')}>
                                    Donate Now
                                </Button>
                            </Grid>
                            {/* Donation image */}
                            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <animated.img
                                    src="../src/images/DonateUs.jpg"
                                    alt="Donate"
                                    style={{ maxWidth: '90%', maxHeight: '85%', ...fadeInStyle }}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </Container>
         <div style={{marginTop: '-40px'}}>
            <Footer/>
        </div>
        </>
    );
};

export default UserHomePage;
