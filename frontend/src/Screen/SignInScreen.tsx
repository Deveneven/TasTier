import React from 'react';
import './SignInScreen.scss';
import Grid from '@mui/material/Grid';
import {Avatar, Box, Button, Card, Link, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Facebook, LockOutlined} from '@material-ui/icons';

function SignInScreen() {
  return (
    <Grid container>
      <Grid item md={5} xs={12}>
        <Card
          sx={{
            marginTop: '10px',
            paddingTop: '10px',
            paddingBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h4">
            TasTier
          </Typography>
          <Typography component="h1" variant="h6">
            Sign in
          </Typography>
          <Box
            sx={{
              marginTop: '10px',
            }}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>
          </Box>
          <Typography component="h1" variant="h6">
            or
          </Typography>
          <Button variant="text" startIcon={<Facebook />}>
            Login with Facebook
          </Button>
          <Link href="#"
            underline='none'
          >
            {'Dont have an account? Sign Up'}
          </Link>
        </Card>
      </Grid>
      <Grid item md={7} xs={0}></Grid>
    </Grid>
  );
}
export default SignInScreen;
