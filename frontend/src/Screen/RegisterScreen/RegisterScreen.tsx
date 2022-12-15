import React, {useState, useEffect} from 'react';
// import './RegisterScreen.scss';
import Grid from '@mui/material/Grid';
import {Avatar, Box, Button, Card, CircularProgress} from '@mui/material';
import Typography from '@mui/material/Typography';
import {LockOutlined} from '@material-ui/icons';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';
import TextForm from '../../Shared/Components/TextForm/TextForm';
import CustomizableAlert from '../../Shared/Components/Alert/CustomizableAlert';
import {Api} from '../../Utils/Api';
const RegisterScreen = () => {
  useEffect( () => {
    return () => setLoading(false);
  }, []);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({display: false, text: ''});
  const [registered, setRegistered] = useState({display: false, text: ''});

  const [loading, setLoading] = useState(false);

  const [nameIsValid, setNameIsValid] = useState({name: 'name', isValid: false});
  const [lastNameIsValid, setLastNameIsValid] = useState({name: 'lastName', isValid: false});
  const [emailIsValid, setEmailIsValid] = useState({name: 'email', isValid: false});
  const [passwordIsValid, setPasswordIsValid] = useState({name: 'password', isValid: false});
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState({name: 'confirmPassword', isValid: false});
  // console.log(process.env.REACT_APP_DB_API);
  //   console.log(nameIsValid);

  //   console.log(lastNameIsValid);

  //   console.log(emailIsValid);

  //   console.log(passwordIsValid);

  //   console.log(confirmPasswordIsValid);

  const register = () => {
    if (
      nameIsValid.isValid &&
      lastNameIsValid.isValid &&
      emailIsValid.isValid &&
      passwordIsValid.isValid &&
      confirmPasswordIsValid &&
      password === confirmPassword
    ) {
      setLoading(true);

      Api.post(
          `${process.env.REACT_APP_DB_API}/accounts/register`,
          {
            Name: name,
            LastName: lastName,
            Password: password,
            Email: email,
          },
      ).then( (response) => {
        console.log('response from register screen');
        console.log(response);
        if (response.success) {
          setRegistered({display: true, text: response.text});
        } else {
          setError({display: true, text: response.text});
        }
      })
          .finally( () => {
            setLoading(false);
          });
    }
    console.log('Rejestracja');
    // navigate('../signin');
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
              Register
            </Typography>
            <Box
              sx={{mb: 2}}
            >
              <TextForm
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="Name"
                minLength={3}
                maxLength={20}
                regex={/^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()\[\]<>{}])[\S])+$/gm}
                checkIsValid={setNameIsValid}
                onChange={ (e) => {
                  setName(e.target.value);
                }}
              />
              <TextForm
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="Last Name"
                minLength={3}
                maxLength={20}
                regex={/^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()\[\]<>{}])[\S])+$/gm}
                checkIsValid={setLastNameIsValid}
                onChange={ (e) => {
                  setLastName(e.target.value);
                }}
              />
              <TextForm
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                minLength={3}
                maxLength={20}
                regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g} // do podwojnego przejrzenia regex
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
                minLength={8}
                maxLength={20}
                regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/}
                checkIsValid={setPasswordIsValid}
                onChange={ (e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextForm
                margin="normal"
                required
                fullWidth
                name="passwordRepeat"
                label="Repeat Password"
                type="password"
                id="passwordRepeat"
                autoComplete="current-password"
                minLength={8}
                maxLength={20}
                regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/}
                checkIsValid={setConfirmPasswordIsValid}
                onChange={ (e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {registered.display && (
                <CustomizableAlert setOpen={setRegistered} message={registered.text} type={'success'}/>
              )}
              {error.display && (
                <CustomizableAlert setOpen={setError} message={error.text} type={'error'}/>
              )}
              <Button
                fullWidth
                variant="contained"
                onClick={register}
                sx={{mt: 3, position: 'relative'}}
                disabled={loading}
              >
                Register
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
            <Button onClick={ () => navigate('../signin')}>
               Have an account Already ?
              <br />
               Sign in
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default RegisterScreen;
