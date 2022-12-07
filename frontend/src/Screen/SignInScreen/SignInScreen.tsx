import React, {useEffect, useState} from 'react';
import './SignInScreen.scss';
import Grid from '@mui/material/Grid';
import {Avatar, Box, Button, Card, CircularProgress} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Facebook, LockOutlined} from '@material-ui/icons';
import GoogleIcon from '@mui/icons-material/Google';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';
import ResetPasswordButton from '../../Shared/Components/ResetPasswordButton/ResetPasswordButton';
import TextForm from '../../Shared/Components/TextForm/TextForm';
import {Api} from '../../Utils/Api';
import CustomizableAlert from '../../Shared/Components/Alert/CustomizableAlert';

const SignInScreen = () => {
  useEffect( () => {
    return () => setLoading(false);
  }, []);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailIsValid, setEmailIsValid] = useState({name: 'email', isValid: false});
  const [passwordIsValid, setPasswordIsValid] = useState({name: 'password', isValid: false});
  const [error, setError] = useState(false);

  const signIn = async () => {
    console.log('Logowanie');
    // localStorage.setItem('loggedState', 'loggedIn');
    // navigate('/');
    if (emailIsValid && passwordIsValid) {
      setLoading(true);
      await Api.post(`${process.env.REACT_APP_DB_API}/accounts/login`, {
        login: email,
        password: password,
      }).then( (response) => {
        if (!!response) {
          setLoading(false);
          localStorage.addItem('TastierId', 'tutaj bedzie id usera');
          localStorage.addItem('TastierId', 'tutaj bedzie reset key');
          navigate('/');
        } else {
          setError(true);
          setLoading(false);
        }
      });
    }
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
              <TextForm
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g}
                checkIsValid={setEmailIsValid}
                onChange={ (e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextForm
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                checkIsValid={setPasswordIsValid}
                onChange={ (e) => {
                  setPassword(e.target.value);
                }}
              />
              {error && (
                <CustomizableAlert setOpen={setError} message={'An Error has occured, try again later ! '} type={'error'}/>
              )}
              <ResetPasswordButton />
              <Button
                fullWidth
                variant="contained"
                onClick={signIn}
                sx={{mt: 3, position: 'relative'}}
              >
                Sign In
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: '#black',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
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
