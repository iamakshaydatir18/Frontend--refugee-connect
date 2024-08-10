import { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Box, CardMedia } from '@mui/material';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const ViewAllResourceAndNearbyCamps = () => {
  const [resourceInView, setResourceInView] = useState(false);
  const [campsInView, setCampsInView] = useState(false);
  const navigate = useNavigate();

  const handleResourceClick = (resource: string) => {
    switch (resource) {
      case 'link-for-image1':
        navigate('/refugee/viewAllResource');
        break;
      case 'link-for-image2':
        navigate('/refugee/viewNearByCamps');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const resourceSection = document.getElementById('resourceSection');
    const campsSection = document.getElementById('campsSection');

    const handleScroll = () => {
      if (resourceSection) {
        const { top } = resourceSection.getBoundingClientRect();
        if (top < window.innerHeight * 0.75) {
          setResourceInView(true);
        }
      }

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

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {/* Resources section */}
          <Grid item xs={12} md={6} id="resourceSection">
            <Box sx={{
              display: 'flex',
              height: '100%', // Set height to 100%
              alignItems: 'center',
              animation: resourceInView ? 'slideInFromLeft 1s forwards' : '',
              '@keyframes slideInFromLeft': {
                '0%': { transform: 'translateX(-100%)', opacity: 0 },
                '100%': { transform: 'translateX(0)', opacity: 1 },
              },
            }}>
              <CardMedia
                component="img"
                sx={{ width: '50%', objectFit: 'contain' }}
                image="../src/images/ResourcePhoto.png"
                alt="Descriptive Alt Text for Image 1"
              />
              <Box sx={{ width: '50%', p: 2 }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  Resources
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.5 }}>
                  View All Resource simplifies access to crucial amenities like accommodation, food distribution centers, and medical clinics. Our user-friendly platform ensures swift access to vital services, facilitating support for those in need.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1.5 }}
                  onClick={() => handleResourceClick('link-for-image1')}
                >
                  View All Resources
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Container for resource statistics */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Resource Statistics
              </Typography>
              <Typography variant="body1" sx={{ mt: 1.5 }}>
                Our platform serves as a lifeline for individuals and families by offering a diverse range of resources, including shelter, food, and medical assistance. With our robust network and efficient distribution channels, we ensure that no one is left behind in times of need. Together, we're making a meaningful difference in the lives of refugees, providing them with the support and resources necessary for a brighter future. <br />
                <br /> 
                <Typography sx={{ fontWeight: 'bold' }}>
                  Total resources provided: 572 <br />
                  Total refugees benefitted: 3518
                </Typography>
              </Typography>
            </Box>
          </Grid>

          {/* Container for camp statistics */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, textAlign: 'center', height: '100%' }}> 
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              <br />Camp Statistics
              </Typography>
              <Typography variant="body1" sx={{ mt: 1.5 }}>
                Our platform has facilitated the establishment of numerous camps, providing refuge to thousands of displaced individuals. We ensure that these camps are equipped with essential facilities and resources to meet the needs of refugees, offering a safe haven during challenging times.
                <br /><br />
                <Typography sx={{ fontWeight: 'bold' }}>
                  Total camps established: 247 <br />
                  Total refugees housed: 4518
                </Typography>
              </Typography>
            </Box>
          </Grid>
          

          {/* Nearby Camps section */}
          <Grid item xs={12} md={6}>
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
                  onClick={() => handleResourceClick('link-for-image2')}
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
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </Box>
  );
};

export default ViewAllResourceAndNearbyCamps;
