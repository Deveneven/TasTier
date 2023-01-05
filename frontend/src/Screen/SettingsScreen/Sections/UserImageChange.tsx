import {Button, Grid, Typography} from '@mui/material';
import React from 'react';
import UserAvatar from '../../../Shared/Components/UserAvatar/UserAvatar';

const UserImageChange = ({user}:any) => {
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
        <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}}>
          {user.name} {user.lastname}
        </Typography>
        <Button sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
          textAlign: {sm: 'left', xs: 'center'}}} component="label" >
Change profile image
          <input hidden accept="image/*" type="file" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserImageChange;
