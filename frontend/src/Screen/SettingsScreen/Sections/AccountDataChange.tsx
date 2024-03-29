import {Button} from '@mui/material';
import React, {useState, useContext} from 'react';
import CustomizableAlert from '../../../Shared/Components/Alert/CustomizableAlert';
import {Api} from '../../../Utils/Api';
import InputField from '../InputField';
import UserContext from '../../../Contexts/UserContext';

const AccountDataChange = () => {
  const {user} = useContext(UserContext);
  const {updateUser} = useContext(UserContext);
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});

  const [name, setName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const changeUserData = async () => {
    if (user.name !== name && (name.length > 2)) {
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/name/change`, name).then( (response) => {
        if (response.success) {
          setAlert({display: true, text: response.text, type: 'success'});
          updateUser('name', name);
        } else setAlert({display: true, text: response.text, type: 'error'});
      });
    };

    if (user.lastname !== lastname.length && (lastname.length > 2 )) {
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/lastname/change`, lastname).then( (response) => {
        if (response.success) {
          setAlert({display: true, text: response.text, type: 'success'});
          updateUser('lastname', lastname);
        } else setAlert({display: true, text: response.text, type: 'error'});
      });
    };

    if (user.nickname !== nickname.length ) {
      await Api.post(`${process.env.REACT_APP_DB_API}/settings/username/change`, nickname).then( (response) => {
        if (response.success) {
          setAlert({display: true, text: response.text, type: 'success'});
          updateUser('nickname', nickname);
        } else setAlert({display: true, text: response.text, type: 'error'});
      });
    };

    if (user.name === name && user.lastname === lastname && user.nickname === nickname) {
      setAlert({display: true, text: 'You did not change a thing in user settings', type: 'error'});
    }
  };
  return (
    <>
      <InputField value={user.name} label={'Name'} id={'name'} setParam={setName}
        description={'Allow users to find your account, by using your name and last name it will be easier to find you.'}
      />
      <InputField value={user.lastname} label={'Last Name'} id={'lastname'} setParam={setLastName}
        description={'Allow users to find your account, by using your name and last name it will be easier to find you.'}
      />
      {/* Tutaj edycja nazwy uzytkownika*/}
      <InputField value={user.nickname} label={'Nickname'} id={'`nickname`'} setParam={setNickname}
        description={'In most cases you can change your nickname every 14 days.'}
      />
      <Button
        variant="contained"
        onClick={changeUserData}
      >
Submit
      </Button>
      {alert.display && (
        <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
      )}
    </>
  );
};

export default AccountDataChange;
