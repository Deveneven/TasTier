import {Button} from '@mui/material';
import React, {useState} from 'react';
import CustomizableAlert from '../../../Shared/Components/Alert/CustomizableAlert';
import InputField from '../InputField';
import {Api} from '../../../Utils/Api';
const EmailChange = ({userMail}: any) => {
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});

  const [email, setEmail] = useState('');
  const changeUserMail = async () => {
    console.log('to jest change email');
    if ( userMail !== email) {
      console.log('maile nie jest taki sam');
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/email/change`, email).then( (response) => {
        console.log('ChangeDataResponse:');
        console.log(response);
        if (response.success) setAlert({display: true, text: response.text, type: 'success'});
        else setAlert({display: true, text: response.text, type: 'error'});
      });
    }
  };

  return (
    <>
      <InputField value={userMail} label={'Email'} id={'email'} setParam={setEmail}
        description={'Be sure to use this option only when you would like to change your email adress linked to an account.'}
      />
      <Button
        variant="contained"
        sx={{margin: 'auto'}}
        onClick={changeUserMail}
      >
Submit
      </Button>
      {alert.display && (
        <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
      )}
    </>);
};

export default EmailChange;
