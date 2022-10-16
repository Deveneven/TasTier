import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import React from 'react';

type Props = {
message: String;
open: boolean;
setOpen;
type: 'warning' | 'success' |'error' | 'info';
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizableSnackbar({message, open, setOpen, type}:Props) {
  const handleClose = () => {
    setOpen(false);
  };
  return (

    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{width: '100%'}}>
        {message}
      </Alert>
    </Snackbar>
  );
}
