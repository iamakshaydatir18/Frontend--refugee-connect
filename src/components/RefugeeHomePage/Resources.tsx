import { Grid, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ResourceSection = () => {
  const history = useNavigate();

  const handleResourceClick = (resource : any) => {
    // Navigate to the respective page based on the clicked resource
    switch (resource) {
      case 'Accommodation':
        history('/refugee/accommodation');
        break;
      case 'Food Distribution Center':
        history('/refugee/food-distribution');
        break;
      case 'Medical Clinic':
        history('/refugee/medical-clinic');
        break;
      default:
        break;
    }
  };

  // Settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ overflowY: 'scroll', maxHeight: '100vh' }}>
      <Container  disableGutters>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center',marginTop: '70px', marginBottom: '20px' }}>
          <span>Stories of the </span>
          <span style={{fontSize:'80px', fontFamily: 'cursive', color: 'red' }}>Refugee:</span>
        </Typography>
        
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>
          The Cries and the Crisis
        </Typography>
        {/* Replace with background image path */}
        <img src="../src/images/Example2.jpeg" alt="Resource Section Background" className="absolute inset-0 object-cover w-full h-full opacity-25" style={{width: '60%', margin: '20px auto' }} />
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center'}}>
              Resource Main Section
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="overflow-auto max-h-80vh"> {/* Add scrollbar */}
              <Slider {...sliderSettings}>
                <div>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <Card>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Accommodation
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Details about accommodation...
                          </Typography>
                          <Button variant="contained" color="primary" onClick={() => handleResourceClick('Accommodation')}>
                            Go to Accommodation
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Food Distribution Center
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Details about food distribution center...
                          </Typography>
                          <Button variant="contained" color="primary" onClick={() => handleResourceClick('Food Distribution Center')}>
                            Go to Food Distribution Center
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Medical Clinic
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Details about medical clinic...
                          </Typography>
                          <Button variant="contained" color="primary" onClick={() => handleResourceClick('Medical Clinic')}>
                            Go to Medical Clinic
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </div>
              </Slider>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ResourceSection;
