import {Button, Grid} from '@mui/material';
import React, {useContext, useState} from 'react';
import UserContext from '../../../Contexts/UserContext';
import CustomizableAlert from '../../../Shared/Components/Alert/CustomizableAlert';
import UserAvatar from '../../../Shared/Components/UserAvatar/UserAvatar';
import UserName from '../../../Shared/Components/UserName/UserName';
import {Api} from '../../../Utils/Api';

const UserImageChange = () => {
  const {user} = useContext(UserContext);
  const {updateUser} = useContext(UserContext);
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});

  const fileUpload = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(formData);
    Api.postImage(`${process.env.REACT_APP_DB_API}/settings/avatar/change`, formData).then((response) => {
      if (response.success) {
        setAlert({display: true, text: response.text.message, type: 'success'});
        updateUser('avatar', response.text.avatarURL);
      } else setAlert({display: true, text: response.text, type: 'error'});
    });
  };
  return (
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
        <UserName />
        <Button sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
          textAlign: {sm: 'left', xs: 'center'}}} component="label" >
Change profile image
          <input hidden accept="image/*" type="file" onChange={fileUpload}/>
        </Button>
      </Grid>
      {alert.display && (
        <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
      )}
    </Grid>
  );
};

export default UserImageChange;
