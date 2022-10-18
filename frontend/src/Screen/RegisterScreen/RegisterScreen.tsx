import React from 'react';
// import './RegisterScreen.scss';
import Grid from '@mui/material/Grid';
import {Avatar, Box, Button, TextField, Card} from '@mui/material';
import Typography from '@mui/material/Typography';
import {LockOutlined} from '@material-ui/icons';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';

const RegisterScreen = () => {
  const navigate = useNavigate();

  const register = () => {
    console.log('Rejestracja');
    navigate('../signin');
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
                id="username"
                label="username"
                name="username"
                autoComplete="username"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordRepeat"
                label="Repeat Password"
                type="password"
                id="passwordRepeat"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                onClick={register}
                sx={{mt: 3}}
              >
                Register
              </Button>
            </Box>
            <Typography component="h1" variant="h6">
              <Divider> OR </Divider>
            </Typography>
            <Button onClick={ () => navigate('../signin')}>
               Have an account Already ?
              <br />
               Register
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default RegisterScreen;
