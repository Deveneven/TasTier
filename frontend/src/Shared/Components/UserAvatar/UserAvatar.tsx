import {Avatar} from '@mui/material';
import React, {useContext} from 'react';
import UserContext from '../../../Contexts/UserContext';

const UserAvatar = (props:any) => {
  const {user} = useContext(UserContext);
  if (user && user.avatar) {
    return (<Avatar sx={{width: 32, height: 32}} {...props} src={user.avatar} alt={`${user.name} ${user.lastname}`} />);
  }
  if (user && !user.avatar) {
    return (<Avatar sx={{width: 32, height: 32}} {...props}> {user?.name.substring(0, 1).toUpperCase()}</Avatar>);
  }
  return (<Avatar sx={{width: 32, height: 32}}> U </Avatar>);
};

export default UserAvatar;
