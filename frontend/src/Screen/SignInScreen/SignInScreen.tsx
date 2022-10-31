import React from 'react';
import './SignInScreen.scss';
import Grid from '@mui/material/Grid';
import {Avatar, Box, Button, TextField, Card} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Facebook, LockOutlined} from '@material-ui/icons';
import GoogleIcon from '@mui/icons-material/Google';
import Divider from '@mui/material/Divider';
// import RegisterPopOut from '../../Shared/Components/RegisterPopOut/RegisterPopOut'; Chyba pop-ouut do rejestracji jest zbedny
import {useNavigate} from 'react-router-dom';
import ResetPasswordButton from '../../Shared/Components/ResetPasswordButton/ResetPasswordButton';
const SignInScreen = () => {
  const navigate = useNavigate();

  const signIn = () => {
    console.log('Logowanie');
    localStorage.setItem('loggedState', 'loggedIn');
    navigate('/');
  };
  return (
    <div>
      <Grid container className='signin-container'>
        <Grid item md={5} xs={12} className='signin-container-menu'>
          <Card
            className="signin-container-menu_card"
          >
            <Avatar sx={{bgcolor: 'secondary.main'}} className="icon-center">
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h3">
              TasTier
            </Typography>
            <Typography component="h1" variant="h6">
              Sign in
            </Typography>
            <Box
              sx={{mb: 2}}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ResetPasswordButton />
              <Button
                fullWidth
                variant="contained"
                onClick={signIn}
                sx={{mt: 3}}
              >
                Sign In
              </Button>
            </Box>
            <Typography component="h1" variant="h6">
              <Divider> OR </Divider>
            </Typography>
            <Button startIcon={<Facebook style={{color: 'white'}}/>}
              sx={[{backgroundColor: '#2374E1',
                color: 'white', width: '100%'}, {
                '&:hover': {
                  backgroundColor: '#1864c9',
                },
              }]} >
              Sign in with Facebook
            </Button>
            <Button startIcon={<GoogleIcon style={{color: 'white'}}/>}
              sx={[{backgroundColor: '#DC6356',
                color: 'white', width: '100%'}, {
                '&:hover': {
                  backgroundColor: '#db4a39',
                },
              }]} >
             Sign in with Google
            </Button>
            <Button onClick={ () => navigate('../register')}>
               Dont have an account ?
              <br />
               Register
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default SignInScreen;
