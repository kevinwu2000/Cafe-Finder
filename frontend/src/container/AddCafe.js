import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCafeForm from '../component/AddCafeForm';
import BusinessHourForm from '../component/BusinessHourForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CREATE_RESTAURANT_MUTATION } from '../graphql/index';
import { useMutation } from '@apollo/client';
import { message } from 'antd';
import '../css/addCafe.css';

const steps = ['Basic Info', 'Business Hours'];

message.config({
  top: 80,
});

const theme = createTheme();

function AddCafe() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const { id, name, userid } = useParams();

  const [cafeName, setCafeName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [businessHour, setBusinessHour] = useState([
    { name: 'Monday_Open', body: '09:00' },
    { name: 'Monday_Close', body: '21:00' },
    { name: 'Tuesday_Open', body: '09:00' },
    { name: 'Tuesday_Close', body: '21:00' },
    { name: 'Wednesday_Open', body: '09:00' },
    { name: 'Wednesday_Close', body: '21:00' },
    { name: 'Thursday_Open', body: '09:00' },
    { name: 'Thursday_Close', body: '21:00' },
    { name: 'Friday_Open', body: '09:00' },
    { name: 'Friday_Close', body: '21:00' },
    { name: 'Saturday_Open', body: '09:00' },
    { name: 'Saturday_Close', body: '21:00' },
    { name: 'Sunday_Open', body: '09:00' },
    { name: 'Sunday_Close', body: '21:00' },
  ]);

  const [createrestaurant] = useMutation(CREATE_RESTAURANT_MUTATION);

  const displayMessage = (status, msg) => {
    const content = {
      content: msg,
      duration: 1.5,
    };
    if (status === 'error') message.error(content);
    else message.success(content);
  };

  const handleNext = () => {
    if (cafeName !== '' && address !== '') {
      setActiveStep(activeStep + 1);
    } else {
      displayMessage('error', 'Please fill out the required fields');
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddCafeForm
            cafeName={cafeName}
            setCafeName={setCafeName}
            phoneNum={phoneNum}
            setPhoneNum={setPhoneNum}
            city={city}
            setCity={setCity}
            district={district}
            setDistrict={setDistrict}
            address={address}
            setAddress={setAddress}
          />
        );
      case 1:
        return <BusinessHourForm businessHour={businessHour} setBusinessHour={setBusinessHour} />;
      default:
        throw new Error('Unknown step');
    }
  };

  const handleonClick = () => {
    createrestaurant({
      variables: {
        name: cafeName,
        information: [
          { name: 'Phone Number', body: phoneNum },
          { name: 'City', body: city },
          { name: 'District', body: district },
          { name: 'Address', body: address },
          ...businessHour,
        ],
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          background: 'linear-gradient(to right, #FFF8E1, #FFECB3)',
          color: '#333',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          padding: '10px 20px',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              letterSpacing: '1px',
            }}
          >
            Add New Cafe
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/search/${name}/${userid}`)}
            sx={{
              backgroundColor: '#FB8C00',
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#FF9800',
              },
            }}
          >
            Back to Search
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="sm"
        className="container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '90vh',
          textAlign: 'center',
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: '8px',
            background: 'linear-gradient(to bottom, #FFF8E1, #FFF3E0)',
            width: '100%',
          }}
        >
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your Cafe Review.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleonClick();
                    navigate('/search/' + name + '/' + userid);
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Complete
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Done' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default AddCafe;
