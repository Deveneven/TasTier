import React, {useState, useEffect} from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ResetPasswordButton from '../../Shared/Components/ResetPasswordButton/ResetPasswordButton';
import InputField from './InputField';
import {Api} from '../../Utils/Api';
import UserAvatar from '../../Shared/Components/UserAvatar/UserAvatar';
import CustomizableAlert from '../../Shared/Components/Alert/CustomizableAlert';
const SettingsScreen = () => {
  const [values, setValues] = useState({name: 'Biogram użytkownika'});
  const CHARACTER_LIMIT = 150;
  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value});
  };
  const [user, setUser] = useState<any>();
  const [userComparator, setUserComparator] = useState<any>();

  // const [avatar, setAvatar] = useState();
  const [messageData, setMessageData] = useState({display: false, text: ''});
  const [errorData, setErrorData] = useState({display: false, text: ''});

  const [messageMail, setMessageMail] = useState({display: false, text: ''});
  const [errorMail, setErrorMail] = useState({display: false, text: ''});

  const [messagePass, setMessagePass] = useState({display: false, text: ''});
  const [errorPass, setErrorPass] = useState({display: false, text: ''});
  const changeUserData = async () => {
    console.log(user);
    if (user.name !== userComparator.name) {
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/name/change`, {name: user.name}).then( (response) => {
        console.log('ChangeDataResponse:');
        console.log(response);
        if (response.success) setMessageData({display: true, text: response.text});
        else setErrorData({display: true, text: response.text});
      });
    };

    if (user.lastname !== userComparator.lastname) {
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/lastname/change`, {lastname: user.lastname}).then( (response) => {
        console.log('ChangeDataResponse:');
        console.log(response);
        if (response.success) setMessageData({display: true, text: response.text});
        else setErrorData({display: true, text: response.text});
      });
    };

    if (user.nickname !== userComparator.nickname) {
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/username/change`, {username: user.nickname}).then( (response) => {
        console.log('ChangeDataResponse:');
        console.log(response);
        if (response.success) setMessageData({display: true, text: response.text});
        else setErrorData({display: true, text: response.text});
      });
    };

    if (user === userComparator) {
      setErrorData({display: true, text: 'You did not change a thing in user settings'});
    }
  };
  const changeUserMail = async () => {
    console.log('to jest change email');
    if ( user.email !== userComparator.email) {
      console.log('maile nie jest taki sam');
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/email/change`, {email: user.email}).then( (response) => {
        console.log('ChangeDataResponse:');
        console.log(response);
        if (response.success) setMessageMail({display: true, text: response.text});
        else setErrorMail({display: true, text: response.text});
      });
    }
  };
  const [userNewPass, setUserNewPass] = useState('');
  const [userNewPassConf, setUserNewPassConf] = useState('');

  const changeUserPass = async () => {
    if ( userNewPass === userNewPassConf) {
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/password/change`, {password: userNewPass}).then( (response) => {
        console.log('ChangeDataResponse:');
        console.log(response);
        if (response.success) setMessagePass({display: true, text: response.text});
        else setErrorPass({display: true, text: response.text});
      });
    } else {
      setErrorPass({display: true, text: 'Passwords do not match'});
    }
  };
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/accounts/user`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setUser(response.text);
            setUserComparator(response.text);
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
        {user && userComparator && (
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
                <UserAvatar user={user} sx={{width: 56, height: 56, float: {md: 'right', xs: 'left'}}} />
              </Grid>
              <Grid item md={8} sx={{textAlign: {xs: 'center', sm: 'left'}}} >
                <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}}>
                  {userComparator.name} {userComparator.lastname}
                </Typography>
                <Button sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
                  textAlign: {sm: 'left', xs: 'center'}}} component="label" >
Change profile image
                  <input hidden accept="image/*" type="file" />
                </Button>
              </Grid>
            </Grid>
            {/* Tutaj edycja imienia i nazwiska */}
            <InputField value={user.name} label={'Name'} id={'name'} setUser={setUser}
              description={'Allow users to find your account, by using your name and last name it will be easier to find you.'}
            />
            <InputField value={user.lastname} label={'Last Name'} id={'lastname'} setUser={setUser}
              description={'Allow users to find your account, by using your name and last name it will be easier to find you.'}
            />
            {/* Tutaj edycja nazwy uzytkownika*/}
            <InputField value={user.nickname} label={'Nickname'} id={'nickname'} setUser={setUser}
              description={'In most cases you can change your nickname every 14 days.'}
            />
            {/* Biogram  do przerobienia, bo nie wiem jak bedzie wygladala walidacja*/}
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
              onClick={changeUserData}
            >
Submit
            </Button>
            {errorData.display && (
              <CustomizableAlert setOpen={setErrorData} message={errorData.text} type={'error'}/>
            )}
            {messageData.display && (
              <CustomizableAlert setOpen={setMessageData} message={messageData.text} type={'success'}/>
            )}
            {/* Divier dzielacy opcje zmiany maila i hasla  */}
            <Divider sx={{width: '100%'}}/>
            {/* Tutaj edycja maila uzytkownika */}
            <InputField value={user.email} label={'email'} id={'email'} setUser={setUser}
              description={'Be sure to use this option only when you would like to change your email adress linked to an account.'}
            />
            <Button
              variant="contained"
              sx={{margin: 'auto'}}
              onClick={changeUserMail}
            >
Submit
            </Button>
            {errorMail.display && (
              <CustomizableAlert setOpen={setErrorMail} message={errorMail.text} type={'error'}/>
            )}
            {messageMail.display && (
              <CustomizableAlert setOpen={setMessageMail} message={messageMail.text} type={'success'}/>
            )}
            {/* Divier dzielacy opcje zmiany maila i hasla  */}
            <Divider sx={{width: '100%'}}/>
            {/* Tutaj edycja hasla uzytkownika */}
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
              {errorPass.display && (
                <CustomizableAlert setOpen={setErrorPass} message={errorPass.text} type={'error'}/>
              )}
              {messagePass.display && (
                <CustomizableAlert setOpen={setMessagePass} message={messagePass.text} type={'success'}/>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </BaseLayout>
  );
};

export default SettingsScreen;
