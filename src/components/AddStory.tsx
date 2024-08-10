import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Paper, Box, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStoryAsync } from '../store/story/story-reducer-actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Facebook, Twitter, LinkedIn, YouTube } from '@mui/icons-material';
import { AppDispatch } from '../store/store'; // Import AppDispatch

const AddStoryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type for dispatch
  const [fileError, setFileError] = useState('');
  const [file, setFile] = useState<File | null | undefined>();

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'File size is too large', value => value && value.size <= 5242880), // 5MB file size limit
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = {
        title: values.title,
        description: values.description,
        refugeeId: localStorage.getItem('personId'),
        image: '', // Image will be handled separately
      };
      try {
        await dispatch(addStoryAsync(formData, file));

        toast.success('Story added successfully');
        setTimeout(() => {
          navigate('/refugee/refugeeHomePage');
          resetForm();
        }, 4000);
      } catch (error) {
        toast.error('Failed to add story');
        console.error('Error adding story:', error);
      }
    },
  });

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    const file = files && files.length > 0 ? files[0] : null;
    setFile(file);
    if (file) {
      formik.setFieldValue('image', file);
      setFileError('');
    } else {
      formik.setFieldValue('image', null);
      setFileError('Please select an image file');
    }
  };

  return (
    <>
      <Container maxWidth="lg" style={{ marginBottom: '60px', marginTop: '80px' }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginLeft: '110px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h4" align="center" gutterBottom>Add Your Story</Typography>
              <form onSubmit={formik.handleSubmit} style={{ flex: 1 }}>
                <Grid container spacing={2} direction="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Title *"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Description *"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                    />
                  </Grid>
                  <Grid item>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="contained-button-file"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Upload Image *
                      </Button>
                    </label>
                    {formik.values.image && typeof formik.values.image === 'object' && 'name' in formik.values.image && (
                      <Typography variant="body2" gutterBottom>
                        {(formik.values.image as File).name}
                      </Typography>
                    )}
                    {fileError && (
                      <Typography variant="body2" color="error">{fileError}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box style={{ backgroundColor: '#4DB6AC', padding: '20px', marginTop: '20px', height: '100%', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '50px' }}>
              <Typography variant="h4" align="center" gutterBottom>Share Your Story!</Typography>
              <Typography variant="subtitle1" align="center">
                "Hope Amidst Hardship: A Refugee's Inspiring Journey" <br />

                In a war-torn land, a refugee's story unfolds. Forced to flee their homeland, they embark on a perilous journey seeking safety. Facing hardship and despair, they find resilience in acts of kindness and solidarity. Through determination and courage, they forge a path to a brighter future, inspiring us all to embrace hope in the face of adversity.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container><br /> <br /> <br />
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '30px 0', width: '120%' }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} justifyContent="space-between" alignItems="center">
            {/* Support our work section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Support Our Work
              </Typography>
              <Typography variant="body2" gutterBottom>
                Get involved and support our cause.
              </Typography>
              <Button variant="outlined" color="inherit">
                Donate
              </Button>
            </Grid>

            {/* Global Voices for Refugee section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Global Voices for Refugee
              </Typography>
              {/* Add your social media icons */}
              <IconButton color="inherit"><Facebook /></IconButton>
              <IconButton color="inherit"><Twitter /></IconButton>
              <IconButton color="inherit"><LinkedIn /></IconButton>
              <IconButton color="inherit"><YouTube /></IconButton>
            </Grid>

            {/* Stay informed section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Stay Informed
              </Typography>
              <Typography variant="body2" gutterBottom>
                Sign up for our newsletter.
              </Typography>
              <Button variant="outlined" color="inherit">
                Subscribe
              </Button>
            </Grid>
          </Grid>
          <Typography variant="caption" align="center" display="block" gutterBottom style={{ marginTop: '20px', borderTop: '1px solid #fff', paddingTop: '20px' }}>
            Privacy Policy <br />
            © RefugeeConnect 2024
          </Typography>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* Add your logo */}
            <img src="../src/images/logo.png" alt="Your Logo" style={{ height: '50px', width: 'auto' }} />
          </div>
        </Container>
      </footer>
      <ToastContainer />
    </>
  );
};

export default AddStoryForm;
