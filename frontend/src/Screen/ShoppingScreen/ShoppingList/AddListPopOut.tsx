import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

type AddListPopOutProps = {
open: boolean;
setOpen;
setLists;
lists;
  };

const AddListPopOut = ({open, setOpen, setLists, lists} : AddListPopOutProps) => {
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
    {Id: 1, Name: 'Test', Avatar: 'A'},
  ]);

  const deleteUserFromSharedList = (userToDelete) => {
    setUsersSharedList(
        usersSharedList.filter((user) => user.Id !== userToDelete.Id),
    );
  };
  const [user, setUser] = React.useState('');
  const [listName, setListName] = React.useState('');
  const addUserFromSharedList = () => {
    setUsersSharedList((prevUsers) => [
      ...prevUsers,
      {
        Id: usersSharedList.length + 1,
        Name: user,
        Avatar: user.slice(0, 1).toUpperCase(),
      },
    ]);
  };
  const submitList = () => {
    if (listName !== null) {
      setLists((prevLists) => [
        ...prevLists,
        {
          Id: lists.length + 1,
          Name: listName,
          Friends: usersSharedList,
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
          <Typography
            component="h1"
            variant="h4"
            sx={{textAlign: ' center', margin: '2rem'}}
          >
                   Create Shopping List
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="shopping_list_name"
            label="Shopping list name"
            name="shopping_list_name"
            autoComplete="Shopping list name"
            autoFocus
            onChange={(e) => {
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
            onChange={(e) => {
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
                  There are no users added to share the list yet !
              </Typography>
            )}
            {usersSharedList.map((data) => {
              return (
                <Chip
                  key={data.Id}
                  avatar={<Avatar>{data.Avatar}</Avatar>}
                  label={data.Name}
                  variant="outlined"
                  onDelete={() => {
                    deleteUserFromSharedList(data);
                  }}
                />
              );
            })}
          </Stack>
          <Button
            variant="contained"
            sx={textCenter}
            fullWidth
            onClick={submitList}
          >
            {' '}
            Add{' '}
          </Button>
          <Button
            variant="contained"
            sx={[textCenter, {float: 'right', display: {xs: 'block', md: 'none'}}]}
            onClick={handleClose}
          >
            {' '}
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddListPopOut;
