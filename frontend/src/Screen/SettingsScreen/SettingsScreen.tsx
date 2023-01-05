import React, {useContext} from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import PasswordChange from './Sections/PasswordChange';
import EmailChange from './Sections/EmailChange';
import AccountDataChange from './Sections/AccountDataChange';
import UserImageChange from './Sections/UserImageChange';
import UserContext from '../../Contexts/UserContext';
const SettingsScreen = () => {
  const {user} = useContext(UserContext);
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
          { user && (
            <>
              {/* Tutaj edycja zdjecia profilowego */}
              <UserImageChange />
              {/* Tutaj edycja imienia i nazwiska */}
              <AccountDataChange />
              {/* Divier dzielacy opcje zmiany maila i hasla  */}
              <Divider sx={{width: '100%'}}/>
              {/* Tutaj edycja maila uzytkownika */}
              <EmailChange />
              {/* Divier dzielacy opcje zmiany maila i hasla  */}
              <Divider sx={{width: '100%'}}/>
              {/* Tutaj edycja hasla uzytkownika */}
              <PasswordChange />
            </>
          )}
        </Grid>
      </Box>
    </BaseLayout>
  );
};

export default SettingsScreen;
