import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography, TextField, Button, Paper, Grid, Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useSpring, animated } from 'react-spring';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { addCampAsync } from '../../store/camp/camp-reducer-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store'; // Import AppDispatch

// Validation Schema for Camp
const campValidationSchema = Yup.object({
  campName: Yup.string().required('Camp Name is required'),
  campCapacity: Yup.number().required('Camp Capacity is required').positive().integer(),
  campLocation: Yup.string().required('Camp Location is required'),
  campCurrentOccupancy: Yup.number().required('Current Occupancy is required').positive().integer(),
  campImage: Yup.mixed().required('Camp Image is required'), // Update to accept file input
  campManagementName: Yup.string().required('Management Name is required'),
  Infrastructure: Yup.string().required('Infrastructure is required'),
});

// Initial Values for Camp
const initialCampValues = {
  campName: '',
  campCapacity: '',
  campLocation: '',
  campCurrentOccupancy: '',
  campImage: '', // Updated to accept file input
  campManagementName: '',
  Infrastructure: '',
  supportingOrganizations: '',
};

// Styled component for overlay
const Overlay = styled.div`
  background: linear-gradient(rgba(255,255,255,0.6), rgba(224,224,224,0.6), rgba(51,51,51,0.6)); /* Overlay to enhance readability */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CampAdditionPage = () => {
  const [showImage, setShowImage] = useState(false);
  const [imageName, setImageName] = useState('');
  const [image, setImage] = useState<File | null>(null); 
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type for dispatch
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    try {
      console.log('Camp values:', values);
      actions.setSubmitting(false);
      console.log(JSON.stringify(values));
      console.log("Image is - ", image);
      values.personId = localStorage.getItem('personId');
      await dispatch(addCampAsync(values, image));
      toast.success('Camp added successfully!');
      navigate('/refugee/viewNearByCamps');
    } catch (error) {
      console.error('Error creating camp:', error);
      toast.error('Error creating camp!');
      alert("Error in creating camp. Please try Again");
      actions.setSubmitting(false);
    }
  };

  // Animation for the form
  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -50px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });

  // Image URL
  const imageUrl = "../src/images/camp.jpg";
  return (
    <Overlay>
      <Container maxWidth="lg" style={{ marginTop: '7%', marginBottom: '40px', position: 'relative' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6} lg={6}>
            <animated.div style={formAnimation}>
              <Paper elevation={3} style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
                <Typography variant="h4" align="center" color="primary" gutterBottom>
                  Add Camp
                </Typography>
                <Formik
                  initialValues={initialCampValues}
                  validationSchema={campValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isValid, dirty, setFieldValue }) => (
                    <Form>
                      <Grid container spacing={2}>
                        {/* Detailed Form Fields */}
                        <Grid item xs={12} sm={6}>
                          <Field as={TextField} name="campName" label="Camp Name *" fullWidth />
                          <ErrorMessage name="campName" render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field as={TextField} name="campCapacity" label="Camp Capacity *" fullWidth />
                          <ErrorMessage name="campCapacity" render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field as={TextField} name="campLocation" label="Camp Location *" fullWidth />
                          <ErrorMessage name="campLocation" render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field as={TextField} name="campCurrentOccupancy" label="Current Occupancy *" fullWidth />
                          <ErrorMessage name="campCurrentOccupancy" render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field as={TextField} name="campManagementName" label="Management Name *" fullWidth />
                          <ErrorMessage name="campManagementName" render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field as={TextField} name="Infrastructure" label="Infrastructure *" fullWidth />
                          <ErrorMessage name="Infrastructure" render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </Grid>
                        <Grid item xs={12}>
                          <Field as={TextField} name="supportingOrganizations" label="Supporting Organizations *" fullWidth />
                          <ErrorMessage name="supportingOrganizations" render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            id="campImage"
                            name="campImage"
                            type="file"
                            onChange={(event) => {
                              if (event.currentTarget.files && event.currentTarget.files.length > 0) {
                                const file = event.currentTarget.files[0];
                                setImage(file);
                                setFieldValue("campImage", file);
                                setImageName(file.name);
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="campImage">
                            <Button variant="outlined" component="span" fullWidth>
                              Upload Image
                            </Button>
                          </label>
                          {imageName && <div style={{ fontSize: '12px', color: 'gray', textAlign: 'center' }}>{imageName}</div>}
                          <ErrorMessage name="campImage" render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!isValid || !dirty}
                          >
                            Add Camp
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </animated.div>
          </Grid>
          {/* Image Card Grid Item */}
          <Grid item xs={12} md={6} lg={6}>
            {showImage && (
              <Paper
                elevation={3}
                style={{
                  padding: '20px',
                  height: '78vh',
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </Overlay>
  );
};

export default CampAdditionPage;
