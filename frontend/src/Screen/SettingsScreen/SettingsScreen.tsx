import React, {useState} from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ResetPasswordButton from '../../Shared/Components/ResetPasswordButton/ResetPasswordButton';
const SettingsScreen = () => {
  const [values, setValues] = useState({name: 'Biogram użytkownika'});
  const CHARACTER_LIMIT = 150;
  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value});
  };
  return (
    <BaseLayout>
      <Box
        maxWidth="md"
        sx={{
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          padding: '2rem',
        }}
      >
        <Grid
          container
          maxWidth="sm"
          direction="row"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          gap="2rem"
        >
          {/* Tutaj edycja zdjecia profilowego */}
          <Grid
            container
            margin="auto"
            sx={{gap: {xs: '1rem', sm: '2rem'}}} // alignItems: {xs: 'center', sm: 'left'}, justifyContent: {xs: 'center', sm: 'left'}
          >
            <Grid item md={3}
            >
              <Avatar sx={{width: 56, height: 56, float: {md: 'right', xs: 'left'}}} >
M
              </Avatar>
            </Grid>
            <Grid item md={8} sx={{textAlign: {xs: 'center', sm: 'left'}}} >
              <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}}>
                Nazwa Konta
              </Typography>
              <Button sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
                textAlign: {sm: 'left', xs: 'center'}}} component="label" >
Zmień zdjęcie profilowe
                <input hidden accept="image/*" type="file" />
              </Button>
            </Grid>
          </Grid>
          {/* Tutaj edycja imienia i nazwiska */}
          <Grid
            container
          >
            <Grid item md={3}
            >
              <Typography component="h4" variant="h6" sx={{marginBlock: '1.2rem', textAlign: {sm: 'right', xs: 'center'}}}>
                Imię i nazwisko
              </Typography>
            </Grid>
            <Grid item md={8} sx={{marginInline: {xs: '2rem', md: 'auto'}}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="shopping_list_name"
                label="Imię i nazwisko"
                name="shopping_list_name"
                size="small"
                defaultValue="Imię i nazwisko"/>
              <Typography component="h6" variant="caption"
                sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
                  color: 'var(--fnt-primary-color)',
                  textAlign: {sm: 'left', xs: 'center'}}} >
Pozwól ludziom odkryć Twoje konto, korzystając z swojego imienia i nazwiska łatwiej będzie im Cię odnaleźć.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
          >
            <Grid item md={3}
            >
              <Typography component="h4" variant="h6" sx={{marginBlock: '1.2rem', textAlign: {sm: 'right', xs: 'center'}}}>
                Nazwa użytkownika
              </Typography>
            </Grid>
            <Grid item md={8} sx={{marginInline: {xs: '2rem', md: 'auto'}}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nazwa użytkownika"
                name="username"
                size="small"
                defaultValue="Nazwa użytkownika"/>
              <Typography component="h6" variant="caption"
                sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
                  color: 'var(--fnt-primary-color)',
                  textAlign: {sm: 'left', xs: 'center'}}} >
W większości przypadków możesz zmienić swoją nazwę użytkownika z powrotem  jeszcze przez 14 dni.
              </Typography>
            </Grid>
          </Grid>
          {/* Biogram */}
          <Grid
            container
          >
            <Grid item md={3}
            >
              <Typography component="h4" variant="h6" sx={{marginBlock: '1.2rem', textAlign: {sm: 'right', xs: 'center'}}}>
                Biogram
              </Typography>
            </Grid>
            <Grid item md={8} sx={{marginInline: {xs: '2rem', md: 'auto'}, width: '100%'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Biogram użytkownika"
                name="username"
                size="small"
                multiline
                rows={8}
                maxRows={8}
                value={values.name}
                helperText={`${values.name.length}/${CHARACTER_LIMIT}`}
                onChange={handleChange('name')}
                inputProps={{
                  maxLength: CHARACTER_LIMIT,
                }}/>
            </Grid>
          </Grid>
          <Button
            variant="contained"
          >
Submit
          </Button>
          <Divider sx={{width: '100%'}}/>
          {/* Divier dzielacy opcje zmiany maila i hasla  */}
          <Grid
            container
            sx={{gap: {xs: '0.5rem', sm: '1rem'}}}
          >
            <Grid item md={3}
            >
              <Typography component="h4" variant="h6" sx={{marginBlock: '1.2rem',
                marginBottom: '0.8rem', textAlign: {sm: 'right', xs: 'center'}}}>
                Email
              </Typography>
            </Grid>
            <Grid item md={8} sx={{marginInline: {xs: '2rem', md: 'auto'}}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                size="small"
                defaultValue="email@gmail.com"/>
              <Typography component="h6" variant="caption"
                sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
                  color: 'var(--fnt-primary-color)',
                  textAlign: {sm: 'left', xs: 'center'}}} >
Be sure to use this option only when you would like to change your email adress linked to an account
              </Typography>
            </Grid>
            <Button
              variant="contained"
              sx={{margin: 'auto'}}
            >
Submit
            </Button>
          </Grid>
          <Divider sx={{width: '100%'}}/>
          <Grid
            container
            sx={{gap: {xs: '0.5rem', sm: '1rem'}}}
          >
            <Grid item md={3}
            >
              <Typography component="h4" variant="h6" sx={{marginBlock: '1.2rem',
                textAlign: {sm: 'right', xs: 'center'}}}>
                Password
              </Typography>
            </Grid>
            <Grid item md={8} sx={{marginInline: {xs: '2rem', md: 'auto'}}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="old_password"
                label="Old Password"
                name="old_password"
                size="small"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="new_password"
                label="New Password"
                name="new_password"
                size="small"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirm_new_password"
                label="Confirm New Password"
                name="confirm_new_password"
                size="small"
              />
              <Typography component="h6" variant="caption"
                sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
                  color: 'var(--fnt-primary-color)',
                  textAlign: {sm: 'left', xs: 'center'}}} >
Use this option only if you would like to change your current password, by filling the old password
 and new one you would like to change it for.
              </Typography>
              <ResetPasswordButton />
            </Grid>
            <Button
              variant="contained"
              sx={{margin: 'auto'}}
            >
Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};

export default SettingsScreen;
