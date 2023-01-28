import {Button, Grid, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import CustomizableAlert from '../../../Shared/Components/Alert/CustomizableAlert';
import ResetPasswordButton from '../../../Shared/Components/ResetPasswordButton/ResetPasswordButton';
import {Api} from '../../../Utils/Api';

const PasswordChange = () => {
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});

  const [userNewPass, setUserNewPass] = useState('');
  const [userNewPassConf, setUserNewPassConf] = useState('');

  const changeUserPass = async () => {
    if ( userNewPass === userNewPassConf) {
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/password/change`, userNewPass).then( (response) => {
        if (response.success) setAlert({display: true, text: response.text, type: 'success'});
        else setAlert({display: true, text: response.text, type: 'error'});
      });
    } else {
      setAlert({display: true, text: 'Passwords do not match', type: 'error'});
    }
  };
  return (
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
          id="new_password"
          label="New Password"
          name="new_password"
          size="small"
          type="password"
          onChange={(e) => {
            setUserNewPass(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirm_new_password"
          label="Confirm New Password"
          name="confirm_new_password"
          size="small"
          type="password"
          onChange={(e) => {
            setUserNewPassConf(e.target.value);
          }}
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
        onClick={changeUserPass}
      >
Submit
      </Button>
      {alert.display && (
        <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
      )}
    </Grid>
  );
};

export default PasswordChange;
