import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
const RegisterPopOut = (props:any) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const textCenter = {
    textAlign: 'center',
    margin: 'auto',
  };

  return (
    <div>
      <Button variant={props.variant} onClick={handleClickOpen}>
        {props.buttonText}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={textCenter}>
          Create Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
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
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
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
              type="passwordRepeat"
              id="passwordRepeat"
              autoComplete="current-password"
            />
          </DialogContentText>
          <Button variant="contained" sx={textCenter} fullWidth>
            {' '}
            Register{' '}
          </Button>
        </DialogContent>
        <DialogActions sx={textCenter}>
          Already have an account?
          <Button autoFocus onClick={handleClose}>
            Log in!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterPopOut;
