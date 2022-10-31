import Button from '@mui/material/Button';
import React, {useState, useRef} from 'react';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
const ResetPasswordButton = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

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
    marginBlock: '1rem',
  };

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{padding: '0 !important', marginTop: '0.5rem !important'}}>
        Forgot Password ?
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{textAlign: ' center', marginTop: '2rem'}}
        >
                  Reset your password
        </Typography>
        <DialogContent>
          <DialogContentText>
To reset your password, be sure to give an email that is registered for the account,
and we will send you temporary password to log in and change it later on in user settings
          </DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
          />
          <Button variant="contained" sx={textCenter} fullWidth >
            Reset
          </Button>
          <Button
            variant="contained"
            sx={[textCenter, {float: 'right', display: {xs: 'block', md: 'none'}}]}
            onClick={handleClose}
          >
            {' '}
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResetPasswordButton;
