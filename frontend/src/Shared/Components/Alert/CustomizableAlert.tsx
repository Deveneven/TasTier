import MuiAlert, {AlertProps} from '@mui/material/Alert';
import React from 'react';
import Countdown from 'react-countdown';
import {useNavigate} from 'react-router-dom';
import './CustomizableAlert.scss';
type Props = {
message: String;
setOpen;
type: 'warning' | 'success' |'error' | 'info';
time?: number;
redirectUri?: string;
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizableAlert({message, setOpen, type, time, redirectUri}:Props) {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const nav = () => {
    if (redirectUri) {
      navigate(redirectUri);
    }
  };
  return (
    <Alert onClose={handleClose} severity={type} sx={{width: '100%'}}>
      <div className='alert-message'>
        <span> {message} </span>
        {time && (
          <Countdown
            className='countdown'
            date={Date.now() + time}
            onComplete={nav}/>
        )}
      </div>
    </Alert>
  );
}
