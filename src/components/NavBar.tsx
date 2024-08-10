import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Select, MenuItem, SelectChangeEvent, ThemeProvider, createTheme, Switch, FormControlLabel, Slide, useScrollTrigger } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { loginOut } from '../util/login';
import i18n from '../i18n';
import Modal from './Model/model';

// Dynamic Theme
const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    ...(mode === 'dark' ? {
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#000000',
        paper: '#424242',
      },
    } : {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    }),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          marginLeft: '16px', // Add spacing between buttons
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontFamily: 'cursive', // Change font style for "Refugee Connect"
        },
      },
    },
  },
});

export default function StylishNavBar() {
  
  const [language, setLanguage] = React.useState("English");
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('dark');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const trigger = useScrollTrigger();
  const [showModal, setShowModal] = React.useState(false);

  const handleLogout = async() => {
    // Perform your log-out logic here, e.g., clear user session, redirect, etc.
    console.log('Logged out!');
    await loginOut();
    navigate('/refugee');

    setShowModal(false); // Hide the modal after confirming
  };

  const openModal = () => {
    console.log("open Model....");
    setShowModal(true); // Show the modal when clicking "Log Out"
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal when clicking "No"
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    //console.log(event.target.value);
    //console.log(language);
    (event.target.value === "English")?setLanguage('English'):setLanguage('Marathi')
    i18n.changeLanguage(event.target.value);
  };

  async function handleLogInLogOut() {

    navigate('/refugee/login');
  
  }


  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.checked ? 'light' : 'dark');
  };

  const theme = React.useMemo(() => getTheme(themeMode), [themeMode]);

  const handleDonateClick = (resource: string) => {
    switch (resource) {
      case 'Donate':
        window.location.href = 'https://donate.stripe.com/test_7sIcOV4mm0hEc9O000'
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <img src="../src/images/logo.png" alt="Refugee Connect Logo" height="40" />
                <Typography variant="h6" component="div" sx={{ fontFamily: 'cursive', ml: 1 }}>
                  Refugee Connect
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Link to="/refugee"><Button color="secondary" variant="contained" sx={{ mr: 2 }}>Home</Button></Link>
              {token && role == "refugee" && <Link to="addStory"><Button color="inherit" sx={{ mr: 2 }}>Add Story</Button></Link>}
              {token && role == "refugee" && <Link to="addResource"><Button color="inherit" sx={{ mr: 2 }}>Add Resource</Button></Link>}
              {token && role == "refugee" && <Link to="addCamp"><Button color="inherit" sx={{ mr: 2 }}>Add Camp</Button></Link>}
              <Button color="inherit" sx={{ mr: 2 }}>Contact</Button>
              <Button color="inherit" sx={{ mr: 2 }} onClick={() => handleDonateClick('Donate')}>Donate</Button>
              <Select
                value={language}
                onChange={handleLanguageChange}
                sx={{ width: 100, marginRight: 2, bgcolor: 'background.paper' }}
                size="small"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Marathi">Marathi</MenuItem>
              </Select>
              {token && role && <Button color="secondary" onClick={openModal} sx={{ mr: 2 }}>
                Log Out
              </Button>}
              {!token && !role && <Button color="secondary" onClick={handleLogInLogOut} sx={{ mr: 2 }}>
                Log In
              </Button>}
              {!token && !role && (
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ mr: 2 }}
                  onClick={() => navigate('/refugee/signup')}
                >
                  Sign Up
                </Button>
              )}
              <FormControlLabel
                control={<Switch checked={themeMode === 'light'} onChange={handleThemeChange} />}
                label="Theme"
              />
            </Toolbar>
          </AppBar>
        </Slide>
      </ThemeProvider>
      {/* Modal component placed here */}
      <Modal
  show={showModal}
  onConfirm={handleLogout}
  onCancel={closeModal}
  message="Are you sure you want to log out?"
/>

    </>
  );
}
