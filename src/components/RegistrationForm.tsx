import  { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography, TextField, Button, RadioGroup, Radio, FormControlLabel, FormControl, Paper, Grid, Container, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRegistration } from '../util/refugee-services';
import { createUserRegistration } from '../util/user-services';
import backgroundVideo from '../images/animationVideo.mp4';
import backgroundImage from '../images/refugee.jpg';

const userValidationSchema = Yup.object({
  name: Yup.string().
  required('Full Name is required'),
  username: Yup.string()
    .min(8, "Username should be of at least 8 characters.")
    .max(15, "Username cannot be more than 15 characters.")
    .required('Username is required'),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required('Password is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone_no: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be number and 10 digits")
    .required('Contact number is required'),
  image: Yup.mixed().required("Image is required"),
});

const refugeeValidationSchema = Yup.object({
  username: Yup.string()
    .min(8, "Username should be of at least 8 characters.")
    .max(15, "Username cannot be more than 15 characters.")
    .required('Username is required'),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required('Password is required'),
  name: Yup.string().required('Name is required'),
  ethnicity: Yup.string().required('Ethnicity is required'),
  religion: Yup.string().required('Religion is required'),
  language: Yup.string().required('Language is required'),
  health: Yup.string().required('Health is required'),
  education: Yup.string().required('Education is required'),
  occupation: Yup.string().required('Occupation is required'),
  family_status: Yup.string().required('Family status is required'),
  previous_location: Yup.string().required('Previous location is required'),
  current_location: Yup.string().required('Current location is required'),
  legal_status: Yup.string().required('Legal status is required'),
  assistance_needed: Yup.string().required('Assistance needed is required'),
  age: Yup.number().typeError('Age must be a number').positive().integer().required('Age is required'),
  nationality: Yup.string().required('Nationality is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.date().required('Date of Birth is required'),
  address: Yup.string().required('Address is required'),
  phone_no: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be number and 10 digits")
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  blood_type: Yup.string().required('Blood type is required'),
  height: Yup.number().positive().required('Height must be a number'),
  weight: Yup.number().positive().required('Weight must be a number'),
  image: Yup.mixed().required("Image is required"),
});

const initialUserValues = {
  name: '',
  username: '',
  password: '',
  email: '',
  phone_no: '',
  image: null,
};

const initialRefugeeValues = {
  username: '',
  password: '',
  name: '',
  ethnicity: '',
  religion: '',
  language: '',
  health: '',
  education: '',
  occupation: '',
  family_status: '',
  previous_location: '',
  current_location: '',
  legal_status: '',
  assistance_needed: '',
  age: '',
  nationality: '',
  gender: '',
  dob: '',
  address: '',
  phone_no: '',
  email: '',
  blood_type: '',
  height: '',
  weight: '',
  image: null,
};

const RegistrationForm = () => {
  
  const [accountType, setAccountType] = useState('user');
  const [image, setImage] = useState<File>(); 
  const [imageName, setImageName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values: { role: string; image: null; }, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    toast.success("Registration Successful!");

    console.log("Image from form ", image);
    let response;

    if(image){
      if(accountType === 'refugee'){
        values.role = accountType;
         response = await createRegistration(values , image);
      }else{
        values.role = accountType;
        response = await createUserRegistration(values , image);
      }

    }else{
      alert("Enter correct Details and upload Image");
    }
    console.log(imageName);
    console.log(response);
    actions.setSubmitting(false);
    navigate('/refugee/login'); 
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh',overflow: 'hidden' }}>
      <Container maxWidth="lg" style={{ maxWidth: '90%', marginTop: '7%', marginBottom: '40px', position: 'relative', height: accountType === 'refugee' ? '72vh' : 'calc(100% - 40px)', overflow: 'auto' }}>
        <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px', position: 'relative', marginTop:'75px' }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Welcome to Registration Form
          </Typography>
          {/* Formik form */}
          <Formik
            initialValues={accountType === 'user' ? { ...initialUserValues, role: 'user' } : { ...initialRefugeeValues, role: 'refugee' }}
            validationSchema={accountType === 'user' ? userValidationSchema : refugeeValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  {/* Account type radio buttons */}
                  <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup
                        row
                        aria-label="accountType"
                        name="accountType"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                      >
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="refugee" control={<Radio />} label="Refugee" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {/* User fields */}
                  <Grid item xs={12} md={6}>
                        <Field as={TextField} name="name" label="Full Name" fullWidth margin="normal" />
                        <div style={{ color: 'red' }}>
                    <ErrorMessage name="name" component="div" className="field-error" />
                    </div>
                    </Grid>
                  <Grid item xs={12} md={6}>
                    <Field as={TextField} name="username" label="Username" fullWidth margin="normal" />
                    <div style={{ color: 'red' }}>
                    <div style={{ color: 'red' }}>
                    <ErrorMessage name="username" component="div" className="field-error" />
                    </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field as={TextField} type="password" name="password" label="Password" fullWidth margin="normal" />
                    <div style={{ color: 'red' }}>
                    <ErrorMessage name="password" component="div" className="field-error" />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field as={TextField} name="email" label="Email" fullWidth margin="normal" />
                    <div style={{ color: 'red' }}>
                    <ErrorMessage name="email" component="div" className="field-error" />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field as={TextField} name="phone_no" label="Phone Number" fullWidth margin="normal" />
                    <div style={{ color: 'red' }}><ErrorMessage name="phone_no" component="div" className="field-error" /></div>                  
                  </Grid>
                  {/* Image upload */}
                  <Grid item xs={12} md={6} style={{ marginTop: '1.2rem' }}>
                    <label htmlFor="userImage">Upload Image: </label>
                    <input
                      id="userImage"
                      name="image"
                      type="file"
                      onChange={(event) => {
                        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
                          const file = event.currentTarget.files[0];
                          setImage(file);
                          setFieldValue("image", file);
                          setImageName(file.name);
                        }
                      }}
                      style={{ /* display: 'none' */ }}
                    />
                    {/* <label htmlFor="userImage"> */}
                      {/* <Button variant="outlined" component="span" fullWidth> */}
                        {/* Upload Image */}
                      {/* </Button> */}
                    {/* </label> */}
                    {/* {imageName && <Typography variant="caption" style={{ marginTop: '0.5rem' }}>{imageName}</Typography>} */}
                    <div style={{ color: 'red' }}><ErrorMessage name="image" component="div" className="field-error" /></div>
                  </Grid>
                  {/* Refugee specific fields */}
                  {accountType === 'refugee' && (
                    <>
                       <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="ethnicity-label">Ethnicity</InputLabel>
                          <Field as={Select} name="ethnicity" labelId="ethnicity-label" displayEmpty>
                            <MenuItem value="" disabled>
                              Select Ethnicity
                            </MenuItem>
                            <MenuItem value="African">African</MenuItem>
                            <MenuItem value="Asian">Asian</MenuItem>
                            <MenuItem value="Caucasian">Caucasian</MenuItem>
                            <MenuItem value="Hispanic/Latino">Hispanic/Latino</MenuItem>
                            <MenuItem value="Native American">Native American</MenuItem>
                            <MenuItem value="Pacific Islander">Pacific Islander</MenuItem>
                            <MenuItem value="Middle Eastern">Middle Eastern</MenuItem>
                            <MenuItem value="Mixed Race">Mixed Race</MenuItem>
                          </Field>
                        </FormControl>
                        <div style={{ color: 'red' }}><ErrorMessage name="ethnicity" component="div" className="field-error" /></div>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="religion-label">Religion</InputLabel>
                          <Field as={Select} name="religion" labelId="religion-label" displayEmpty>
                            <MenuItem value="" disabled>
                              Select Religion
                            </MenuItem>
                            <MenuItem value="christianity">Christianity</MenuItem>
                            <MenuItem value="islam">Islam</MenuItem>
                            <MenuItem value="hinduism">Hinduism</MenuItem>
                            {/* Add more options as needed */}
                          </Field>
                        </FormControl>
                        <div style={{ color: 'red' }}><ErrorMessage name="religion" component="div" className="field-error" /></div>
                      </Grid>

                      <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="language-label">Language</InputLabel>
                        <Field as={Select} name="language" labelId="language-label" displayEmpty>
                          <MenuItem value="" disabled>
                            Select Language
                          </MenuItem>
                          <MenuItem value="English">English</MenuItem>
                          <MenuItem value="Spanish">Spanish</MenuItem>
                          <MenuItem value="French">French</MenuItem>
                          {/* Add more options as needed */}
                        </Field>
                      </FormControl>
                      <div style={{ color: 'red' }}><ErrorMessage name="language" component="div" className="field-error" /></div>
                    </Grid>

                    <Grid item xs={12} md={6}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="health-label">Health Condition</InputLabel>
        <Field as={Select} name="health" labelId="health-label" displayEmpty>
          <MenuItem value="" disabled>
            Select Health Condition
          </MenuItem>
          <MenuItem value="Excellent">Excellent</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Fair">Fair</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
          {/* Add more options as needed */}
        </Field>
      </FormControl>
      <div style={{ color: 'red' }}><ErrorMessage name="health" component="div" className="field-error" /></div>
    </Grid>

    <Grid item xs={12} md={6}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="education-label">Education</InputLabel>
        <Field as={Select} name="education" labelId="education-label" displayEmpty>
          <MenuItem value="" disabled>
            Select Education
          </MenuItem>
          <MenuItem value="No Formal Education">No Formal Education</MenuItem>
          <MenuItem value="Primary Education">Primary Education</MenuItem>
          <MenuItem value="Secondary Education">Secondary Education</MenuItem>
          <MenuItem value="Bachelors">Bachelors</MenuItem>
          <MenuItem value="Masters">Masters</MenuItem>
          <MenuItem value="Tertiary Education">Tertiary Education</MenuItem>
          <MenuItem value="Vocational Training">Vocational Training</MenuItem>
          {/* Add more options as needed */}
        </Field>
      </FormControl>
      <div style={{ color: 'red' }}><ErrorMessage name="education" component="div" className="field-error" /></div>
    </Grid>

    <Grid item xs={12} md={6}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="occupation-label">Occupation</InputLabel>
        <Field as={Select} name="occupation" labelId="occupation-label" displayEmpty>
          <MenuItem value="" disabled>
            Select Occupation
          </MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Employed">Employed</MenuItem>
          <MenuItem value="Unemployed">Unemployed</MenuItem>
          <MenuItem value="Self-employed">Self-employed</MenuItem>
          <MenuItem value="Retired">Retired</MenuItem>
          {/* Add more options as needed */}
        </Field>
      </FormControl>
      <div style={{ color: 'red' }}><ErrorMessage name="occupation" component="div" className="field-error" /></div>
    </Grid>

    <Grid item xs={12} md={6}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="family-status-label">Family Status</InputLabel>
        <Field as={Select} name="family_status" labelId="family-status-label" displayEmpty>
          <MenuItem value="" disabled>
            Select Family Status
          </MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
          <MenuItem value="Widowed">Widowed</MenuItem>
          <MenuItem value="Separated">Separated</MenuItem>
          {/* Add more options as needed */}
        </Field>
      </FormControl>
      <div style={{ color: 'red' }}>
      <ErrorMessage name="family_status" component="div" className="field-error" />
      </div>
    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field as={TextField} name="previous_location" label="Previous Location" fullWidth margin="normal" />
                      <div style={{ color: 'red' }}>
      <ErrorMessage name="previous_location" component="div" className="field-error" />
      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field as={TextField} name="current_location" label="Current Location" fullWidth margin="normal" />
                      <div style={{ color: 'red' }}>
      <ErrorMessage name="current_location" component="div" className="field-error" />
      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="legal-status-label">Legal Status</InputLabel>
        <Field as={Select} name="legal_status" labelId="legal-status-label" displayEmpty>
          <MenuItem value="" disabled>
            Select Legal Status
          </MenuItem>
          <MenuItem value="Citizen">Citizen</MenuItem>
          <MenuItem value="Permanent Resident">Permanent Resident</MenuItem>
          <MenuItem value="Refugee">Refugee</MenuItem>
          <MenuItem value="Asylum Seeker">Asylum Seeker</MenuItem>
          {/* Add more options as needed */}
        </Field>
      </FormControl>
      <div style={{ color: 'red' }}>
      <ErrorMessage name="legal_status" component="div" className="field-error" />
      </div>
    </Grid>


<Grid item xs={12} md={6}>
  <FormControl fullWidth margin="normal">
    <InputLabel id="assistance-needed-label">Assistance Needed</InputLabel>
    <Field as={Select} name="assistance_needed" labelId="assistance-needed-label" displayEmpty>
      <MenuItem value="" disabled>
        Select Assistance Needed
      </MenuItem>
      <MenuItem value="Housing">Housing</MenuItem>
      <MenuItem value="Food">Food</MenuItem>
      <MenuItem value="Healthcare">Healthcare</MenuItem>
      <MenuItem value="Education">Education</MenuItem>
      <MenuItem value="Employment">Employment</MenuItem>
      {/* Add more options as needed */}
    </Field>
  </FormControl>
  <div style={{ color: 'red' }}>
      <ErrorMessage name="assistance_needed" component="div" className="field-error" />
      </div>
</Grid>

                    <Grid item xs={12} md={6}>
                      <Field as={TextField} name="age" label="Age" fullWidth margin="normal" />
                      <div style={{ color: 'red' }}>
      <ErrorMessage name="age" component="div" className="field-error" />
      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field as={TextField} name="nationality" label="Nationality" fullWidth margin="normal" />
                      <div style={{ color: 'red' }}><ErrorMessage name="nationality" component="div" className="field-error" /></div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Field as={Select} name="gender" labelId="gender-label" displayEmpty>
                          <MenuItem value="" disabled>
                            Select Gender
                          </MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                        </Field>
                      </FormControl>
                      <div style={{ color: 'red' }}><ErrorMessage name="gender" component="div" className="field-error" /></div>
                  </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        name="dob"
                        type="date"
                        label="Date of Birth"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div style={{ color: 'red' }}><ErrorMessage name="dob" component="div" className="field-error" /></div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field as={TextField} name="address" label="Address" fullWidth margin="normal" />
                      <div style={{ color: 'red' }}><ErrorMessage name="address" component="div" className="field-error" /></div>
                    </Grid>
                    <Grid item xs={12} md={6}>
  <FormControl fullWidth margin="normal">
    <InputLabel id="blood-type-label">Blood Type</InputLabel>
    <Field as={Select} name="blood_type" labelId="blood-type-label" displayEmpty>
      <MenuItem value="" disabled>
        Select Blood Type
      </MenuItem>
      <MenuItem value="A+">A+</MenuItem>
      <MenuItem value="A-">A-</MenuItem>
      <MenuItem value="B+">B+</MenuItem>
      <MenuItem value="B-">B-</MenuItem>
      <MenuItem value="AB+">AB+</MenuItem>
      <MenuItem value="AB-">AB-</MenuItem>
      <MenuItem value="O+">O+</MenuItem>
      <MenuItem value="O-">O-</MenuItem>
      {/* Add more options as needed */}
    </Field>
  </FormControl>
  <div style={{ color: 'red' }}><ErrorMessage name="blood_type" component="div" className="field-error" /></div>
</Grid>

<Grid item xs={12} md={6}>
  <Field as={TextField} name="height" label="Height (inches)" fullWidth margin="normal" />
  <div style={{ color: 'red' }}><ErrorMessage name="height" component="div" className="field-error" /></div>
</Grid>
                    <Grid item xs={12} md={6}>
                      <Field as={TextField} name="weight" label="Weight (lbs)" fullWidth margin="normal" />
                      <div style={{ color: 'red' }}><ErrorMessage name="weight" component="div" className="field-error" /></div>
                    </Grid>
                      

                      {/* Other refugee specific fields */}
                    </>
                  )}
                
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={!isValid || !dirty}
                      style={{ marginTop: '2rem' }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <ToastContainer />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} style={{ position: 'fixed', right: 0, top: 0, bottom: 0 }}>
        <video autoPlay loop muted style={{ marginTop:'150px', width: '90%', height: '65%', objectFit: 'cover' }}>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Grid>
    </Grid>
  </Container>
  </div>
);}

export default RegistrationForm;
