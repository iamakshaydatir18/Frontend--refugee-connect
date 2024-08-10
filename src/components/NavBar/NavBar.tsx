import React, { useState } from 'react';
import './NavBar.css'; // Assuming the CSS styles are in a separate file
import logo from '../../images/logo.png'
import { Link, useNavigate } from "react-router-dom";
import Modal from '../Model/model';
import { loginOut } from '../../util/login';
import i18n from '../../i18n';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NavBar = () => {

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const imagePath = localStorage.getItem('image');
  const username = localStorage.getItem('username');
  const [language, setLanguage] = useState('English');

  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  async function handleLogInLogOut() {
    navigate('/refugee/login');
  }

  const handleLogout = async () => {
    // Perform your log-out logic here, e.g., clear user session, redirect, etc.
    console.log('Logged out!');
    await loginOut();
    navigate('/refugee');

    setShowModal(false); // Hide the modal after confirming
  };

  async function handleHome() {

    console.log('Inside homne...');

    switch (role) {
      case 'refugee': navigate('/refugee/refugeeHomePage'); break;
      case 'user': navigate('/user/userHomePage'); break;
      case 'admin': navigate('/user/userHomePage'); break;
      default: navigate('/refugee'); break;
    }

  }


  const handleDonateClick = (resource: string) => {
    console.log(" inside donate....");

    switch (resource) {
      case 'Donate':
        window.location.href = 'https://donate.stripe.com/test_7sIcOV4mm0hEc9O000'
        break;
      default:
        break;
    }
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
    (event.target.value === "English") ? setLanguage('English') : setLanguage('Marathi')
    i18n.changeLanguage(event.target.value);
  };

  const {t} = useTranslation('common');

  return (<>
    <nav className="nav">
      <div className="nav-left">
        <a href="#" className="nav-brand">
          <img src={logo} alt="UIVerse Logo" />
        </a>
        <ul className="nav-menu">
          <li>
            <a className="nav-link" onClick={handleHome}>{t('NavBarHome')}</a>
          </li>
          <li>
            <a href="#" className="nav-link">{t('NavBarContact')}</a>
          </li>
          <li>
            {/* <div className="dropdown-container">
              <a href="#" className="nav-link">
                {language}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="#F2F2F2" d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                </svg>
              </a> */}
            {/* Dropdown menu */}
            {/* <div className="dropdown-menu grid">
                <a href="#" onClick={() => handleLanguageChange('Marathi')}><span>Marathi</span></a>
                <a href="#" onClick={() => handleLanguageChange('Hindi')}><span>Hindi</span></a>
              </div> */}
            <div style={{backgroundColor: '#212121'}}>
              <Select
                value={language}
                onChange={handleLanguageChange}
                sx={{
                  width: 100,
                  margin: '0px',
                  //marginRight: 2,
                  backgroundColor: '#212121', // Background color
                  color: '#5966f3', // Text color
                  //borderRadius: '0.5rem',
                }}
                size="small"
              >
                <MenuItem
                  value="English"
                  style={{
                    marginTop: '-8px',
                    backgroundColor: '#292929', // Background color
                    color: '#5966f3', // Text color
                    //padding: '1rem',
                    //borderRadius: '0.5rem',
                  }}
                >
                  English
                </MenuItem>
                <MenuItem
                  value="Marathi"
                  style={{
                    marginBottom: '-8px',
                    backgroundColor: '#292929', // Background color
                    color: '#5966f3', // Text color
                    //padding: '1rem',
                   // borderRadius: '0.5rem',
                  }}
                >
                  Marathi
                </MenuItem>
              </Select>
            </div>

          </li>
        </ul>
      </div>

      <div className="nav-right">

      { token && role === 'admin' && <Link to="/refugee/addResource"><a className="nav-link" > Add Resource </a></Link>}
      { token && role === 'admin' && <Link to="/refugee/addCamp"><a className="nav-link" > Add Camp </a></Link>}
      { token && role === 'admin' || role === 'refugee' && <Link to="/refugee/addStory"><a className="nav-link" > Add Story </a></Link>}
        <a className="nav-link btn-primary" onClick={() => handleDonateClick('Donate')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M12 19v-7m0 0V5m0 7H5m7 0h7" stroke="#F2F2F2" fill="none"></path>
          </svg>
          {t('NavBarDonate')}
        </a>

        <button className="nav-link btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M9 18.542a62.872 62.872 0 0 1-3.94-.313 1.676 1.676 0 0 1-1.404-2.195c.171-.513.343-1.018.389-1.561l.375-4.497a7.608 7.608 0 0 1 15.162 0l.375 4.499c.045.543.217 1.048.388 1.56a1.675 1.675 0 0 1-1.405 2.194c-1.31.145-2.624.25-3.94.313m-6 0V19a3 3 0 1 0 6 0v-.459m-6 0a62.83 62.83 0 0 0 6 0" stroke="#F2F2F2" fill="none"></path>
          </svg>
        </button>

        <ul className="nav-menu">
          <li>
            {!token && !role && <a className="nav-link" onClick={handleLogInLogOut}>{t('NavBarLogin')}</a>}
          </li>
          {!token && !role && <li> <a onClick={() => navigate('/refugee/signup')} className="nav-link">{t('NavBarSignup')}</a> </li>}
        </ul>

        {token && role && <div className="dropdown-container">
          <a href="#" className="nav-link btn-profile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="#F2F2F2" d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
            <span>{role && token && username}</span>
            <div className="profile-pic">
              {role && token && <img src={`http://localhost:4000/${imagePath}`} alt="Profile Pic" />}
            </div>
          </a>
          <div className="dropdown-menu profile-dropdown">
          <Link to="/user/MyProfile"> <a>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#D1D5DB" d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
              </svg>
            <span>Your Profile</span>
            </a></Link>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#D1D5DB" d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 a6"></path>
              </svg>
              <span>Send Feedback</span>
            </a>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16.363636363636363" viewBox="0 0 33 27" fill="none">
                <path d="M27.9541 2.81323C25.818 1.81378 23.5339 1.08742 21.146 0.673828C20.8527 1.20404 20.5101 1.91719 20.2739 2.4845C17.7354 2.10275 15.2203 2.10275 12.7286 2.4845C12.4924 1.91719 12.142 1.20404 11.861 0.673828C9.46857 1.08742 7.18446 1.81378 5.04833 2.81323C3.54422 3.40482 2.54311 4.24997 2.07243 5.20416C2.07243 5.20416 2.11076 5.66364 2.50314 5.66364C4.76447 4.94022 7.064 4.73307 9.36363 5.20416C10.4227 5.38453 11.4653 5.66364 12.4885 5.98205C13.7641 6.43014 14.9688 7.01038 16.1461 7.47034C17.161 7.87248 18.2025 8.12295 19.2159 8.35813C19.7606 8.4791 20.3004 8.6018 20.841 8.74376C21.7655 9.00442 22.6671 9.33421 23.5741 9.77931C23.5235 9.211 23.353 8.64058 22.9591 8.08133C21.5287 5.79668 19.5005 3.82303 17.0725 3.28499C16.1844 3.08741 15.2677 3.10497 14.3531 3.38148C14.4666 4.20071 14.4654 5.01685 14.5766 5.84267C15.8399 5.73307 16.4813 6.14298 17.3683 6.43014C17.7413 6.55647 18.1145 6.68448 18.4893 6.8409C19.6233 7.32715 20.7254 7.93655 21.7889 8.65888C22.6544 9.23986 23.3312 10.0637 23.8936 10.8079C24.2984 11.3783 24.7283 11.9315 25.2391 12.4915C26.7139 14.0952 29.126 14.5487 31.2867 13.9913C31.5965 13.7712 31.7667 13.5783 31.9935 13.3941C32.5503 12.938 32.6665 12.6347 32.9947 12.3084C33.012 12.1836 33.0047 12.0595 33 11.9415C32.9963 11.8144 32.9847 11.6896 32.9656 11.5715C32.8493 11.0226 32.6925 10.4754 32.5022 9.92988C32.2441 9.21449 31.9026 8.53815 31.571 7.84799C30.7424 6.11966 29.315 4.51093 27.9641 2.81323Z" fill="#F2F2F2" stroke="#F2F2F2"></path>
              </svg>
              <span>Need Help?</span>
            </a>
            <a onClick={openModal} ><span>Log Out</span></a>
          </div>
        </div>}


      </div>
    </nav>
    <Modal
      show={showModal}
      onConfirm={handleLogout}
      onCancel={closeModal}
      message="Are you sure you want to log out?"
    />
  </>
  );
};

export default NavBar;
