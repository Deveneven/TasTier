import React, {useState, useEffect} from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {Api} from '../../Utils/Api';
import PasswordChange from './Sections/PasswordChange';
import EmailChange from './Sections/EmailChange';
import AccountDataChange from './Sections/AccountDataChange';
import UserImageChange from './Sections/UserImageChange';
const SettingsScreen = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/accounts/user`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setUser(response.text);
          }
        });
  }, []);

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
        {user && (
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
            <UserImageChange user={user} />
            {/* Tutaj edycja imienia i nazwiska */}
            <AccountDataChange user={user}/>
            {/* Divier dzielacy opcje zmiany maila i hasla  */}
            <Divider sx={{width: '100%'}}/>
            {/* Tutaj edycja maila uzytkownika */}
            <EmailChange userMail={user.email}/>
            {/* Divier dzielacy opcje zmiany maila i hasla  */}
            <Divider sx={{width: '100%'}}/>
            {/* Tutaj edycja hasla uzytkownika */}
            <PasswordChange />
          </Grid>
        )}
      </Box>
    </BaseLayout>
  );
};

export default SettingsScreen;
