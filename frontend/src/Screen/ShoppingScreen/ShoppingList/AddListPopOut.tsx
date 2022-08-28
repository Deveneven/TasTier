/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
const AddListPopOut = ({open, setOpen, setLists, lists}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const textCenter = {
    textAlign: 'center',
    margin: 'auto',
    marginTop: '2rem',
  };
  const [usersSharedList, setUsersSharedList] = React.useState([
    {key: 0, label: 'Test', avatar: 'A'},
  ]);

  const deleteUserFromSharedList = userToDelete => {
    setUsersSharedList(
      usersSharedList.filter(user => user.key !== userToDelete.key)
    );
  };
  const [user, setUser] = React.useState('');
  const [listName, setListName] = React.useState('');
  const addUserFromSharedList = () => {
    setUsersSharedList(prevUsers => [
      ...prevUsers,
      {
        key: usersSharedList.length + 1,
        label: user,
        avatar: user.slice(0, 1).toUpperCase(),
      },
    ]);
  };
  const submitList = () => {
    if (listName !== null) {
      setLists(prevLists => [
        ...prevLists,
        {
          id: lists.length + 1,
          name: listName,
          friends: usersSharedList,
        },
      ]);
      handleClose();
    }
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={textCenter}>
          Create Shopping List
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              margin="normal"
              required
              fullWidth
              id="shopping_list_name"
              label="Shopping list name"
              name="shopping_list_name"
              autoComplete="Shopping list name"
              autoFocus
              onChange={e => {
                setListName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="User"
              label="Share list with the user"
              name="User"
              autoComplete="User"
              onChange={e => {
                console.log(e.target.value);
                setUser(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      addUserFromSharedList();
                    }}
                  >
                    <Button variant="contained">Add</Button>
                  </InputAdornment>
                ),
              }}
            />
            <Stack
              direction="row"
              sx={{
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                margin: 'center',
                gap: '0.5rem',
              }}
            >
              {usersSharedList.length < 1 && (
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{textAlign: ' center', margin: '2rem'}}
                >
                  There are no lists created yet !
                </Typography>
              )}
              {usersSharedList.map(data => {
                return (
                  <Chip
                    key={data.key}
                    avatar={<Avatar>{data.avatar}</Avatar>}
                    label={data.label}
                    variant="outlined"
                    onDelete={() => {
                      deleteUserFromSharedList(data);
                    }}
                  />
                );
              })}
            </Stack>
          </DialogContentText>
          <Button
            variant="contained"
            sx={textCenter}
            fullWidth
            onClick={submitList}
          >
            {' '}
            Add{' '}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddListPopOut;
