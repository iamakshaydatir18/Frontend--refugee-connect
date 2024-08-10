import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import loginPageImage from '../images/LoginPage.jpg';
import { login } from '../util/login';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  // Define state variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Define a function to handle form submission
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Add your login logic here, e.g., sending a request to your authentication server
    console.log('Username:', username);
    console.log('Password:', password);

    const result = await login(username , password);

    if (result === 'success') {
      toast.success("Log In Successful!");

      setTimeout(() => {
          const role = localStorage.getItem('role');
          switch (role) {
              case 'refugee':  
                  navigate('/refugee/refugeeHomePage'); 
                  break;
              case 'user': 
                  navigate('/user/userHomePage'); 
                  break;
              case 'admin': navigate('/user/userHomePage'); break;
              default:
                navigate('/refugee');
                  break;
          }
      }, 3000); // 3 seconds delay
  } else {
      toast.error("incorrect username and password!! Please try again!!!!!");
  }
  };

  return (<>
  <ToastContainer />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${loginPageImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      {/* Paper component for the login form with shadow */}
      <Paper
        sx={{
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          width: '400px',
          textAlign: 'center',
          opacity: 0.8,
        }}
      >
        {/* Title */}
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <TextField
            label="Username"
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
            margin="normal"
            fullWidth
            required
          />

          {/* Password input */}
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            margin="normal"
            fullWidth
            required
          />

          {/* Submit button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '25%' }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
    </>
  );
};

export default LoginPage;
