import MuiAlert, {AlertProps} from '@mui/material/Alert';
import React from 'react';

// przerobić snackbar na sam alert
type Props = {
message: String;
setOpen;
type: 'warning' | 'success' |'error' | 'info';
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizableAlert({message, setOpen, type}:Props) {
  const handleClose = () => {
    setOpen(false);
  };
  return (

    <Alert onClose={handleClose} severity={type} sx={{width: '100%'}}>
      {message}
    </Alert>
  );
}
