import {Avatar, Typography} from '@mui/material';
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
  if (user && user.name && user.lastname) {
    console.log('drugi if userAvatar');
    console.log(user);
    return (
      <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}} {...props} >
        {user.name} {user.lastname}
      </Typography>)
    ;
  }
  return (<Avatar sx={{width: 32, height: 32}}> U </Avatar>);
};

export default UserName;
