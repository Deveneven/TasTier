import React from 'react';
import './SignInScreen.scss';
import Grid from '@mui/material/Grid';
import {Card, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';

function SignInScreen() {
  return (
    <Grid container>
      <Grid item md={5} xs={12}>
        <Card
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
              Sign in
          </Typography>
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
        </Card>
      </Grid>
      <Grid item md={7} xs={0}></Grid>
    </Grid>
  );
}
export default SignInScreen;
