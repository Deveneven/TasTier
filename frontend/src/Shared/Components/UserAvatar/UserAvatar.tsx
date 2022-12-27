import {Avatar} from '@mui/material';
import React from 'react';

const UserAvatar = (props:any) => {
  if (props.user && props.user.avatar) {
    return (<Avatar sx={{width: 32, height: 32}} {...props} src={props.user.avatar} alt={`${props.user.name} ${props.user.lastname}`} />);
  }
  if (props.user && !props.user.avatar) {
    return (<Avatar sx={{width: 32, height: 32}} {...props}> {props.user?.name.substring(0, 1).toUpperCase()}</Avatar>);
  }
  return (<Avatar sx={{width: 32, height: 32}}> U </Avatar>);
};

export default UserAvatar;
