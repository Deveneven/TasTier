import {Typography} from '@mui/material';
import React, {useContext} from 'react';
import UserContext from '../../../Contexts/UserContext';

const UserName = (props:any) => {
  const {user} = useContext(UserContext);
  if (user && user.nickname) {
    return (
      <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}} {...props} >
        {user.nickname}
      </Typography>);
  }
  if (user && user.name || user.lastname) {
    return (
      <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}} {...props} >
        {user.name} {user.lastname}
      </Typography>)
    ;
  }
  return ( <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}} {...props} >
  ...loading
  </Typography>);
};

export default UserName;
