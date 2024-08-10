import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Container,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useSpring, animated } from 'react-spring';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { addResourceAsync } from '../../store/resource/resource-reducer-actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store'; // Import AppDispatch type

// Validation Schema
const resourceValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  contentType: Yup.string().required('Content Type is required'),
  location: Yup.string().required('Location is required'),
  isAvailable: Yup.boolean().required('Availability is required'),
});

// Initial Values
const initialResourceValues = {
  name: '',
  description: '',
  contentType: '',
  location: '',
  isAvailable: false,
  photo: null,
};

// Styled component for overlay
const Overlay = styled.div`
  background: linear-gradient(rgba(255,255,255,0.6), rgba(224,224,224,0.6), rgba(51,51,51,0.6));
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ResourceAdditionPage = () => {
  const [showImage, setShowImage] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoName, setPhotoName] = useState(''); // State to store the photo name
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    try {
      console.log('Resource values:', values);
      console.log('Selected Photo:', selectedPhoto);
      actions.setSubmitting(false);
      toast.success('Resource added successfully!');

      await dispatch(addResourceAsync(values, selectedPhoto)); // Dispatch with correct type
      navigate('/refugee/viewAllResource');
    } catch (error) {
      console.error('Error creating resource:', error);
      actions.setSubmitting(false);
      toast.error('Error creating resource!');
      alert("Error in creating resource. Please try again...");
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -50px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });

  const imageUrl = "../src/images/addResource.jpg";

  return (
    <Overlay>
      <Container maxWidth="lg" style={{ marginTop: '100px', marginBottom: '40px', position: 'relative', height: 'calc(100% - 40px)' }}>
        <Grid container spacing={3} style={{ height: '100%' }}>
          <Grid item xs={12} md={6}>
            <animated.div style={{ ...formAnimation, height: '100%' }}>
              <Paper elevation={3} style={{ padding: '20px', position: 'relative', height: '85%' }}>
                <Typography variant="h4" align="center" color="primary" gutterBottom>
                  Add Resource
                </Typography>
                <Formik
                  initialValues={initialResourceValues}
                  validationSchema={resourceValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isValid, dirty, setFieldValue }) => (
                    <Form style={{ height: '100%' }}>
                      <Grid container spacing={2} style={{ height: '100%' }}>
                        <Grid item xs={12}>
                          <Field as={TextField} name="name" label="Name *" fullWidth />
                          <ErrorMessage name="name" component="div" className="error" />
                        </Grid>
                        <Grid item xs={12}>
                          <Field as={TextField} name="description" label="Description *" fullWidth />
                          <ErrorMessage name="description" component="div" className="error" />
                        </Grid>
                        <Grid item xs={12}>
                          <Field as={TextField} name="contentType" label="Content Type *" fullWidth />
                          <ErrorMessage name="contentType" component="div" className="error" />
                        </Grid>
                        <Grid item xs={12}>
                          <Field as={TextField} name="location" label="Location *" fullWidth />
                          <ErrorMessage name="location" component="div" className="error" />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field as={Switch} type="checkbox" name="isAvailable" color="primary" />}
                            label="Available"
                          />
                          <ErrorMessage name="isAvailable" component="div" className="error" />
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            id="photo"
                            name="photo"
                            type="file"
                            onChange={(event) => {
                              const file = event.currentTarget.files && event.currentTarget.files[0];
                              if (file) {
                                setFieldValue("photo", file);
                                setSelectedPhoto(file);
                                setPhotoName(file.name); // Update the photo name
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="photo">
                            <Button variant="outlined" component="span" fullWidth>
                              Upload Photo
                            </Button>
                          </label>
                          {photoName && <Typography variant="body2" color="textSecondary">{photoName}</Typography>} {/* Display file name */}
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!isValid || !dirty}
                          >
                            Add Resource
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </animated.div>
          </Grid>
          <Grid item xs={12} md={6} style={{ position: 'relative' }}>
            {showImage && (
              <Paper
                elevation={3}
                style={{
                  padding: '20px',
                  width: '100%',
                  height: '85%',
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

export default ResourceAdditionPage;
