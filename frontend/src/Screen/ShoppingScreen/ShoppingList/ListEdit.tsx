/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
import React from 'react';
import {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import {ShoppingListDTO} from '../../../Shared/DTOs/ShoppingListDTO';
import {UserDTO} from '../../../Shared/DTOs/UserDTO';

const ListScreen = ({listId, lists, setLists}) => {
  console.log(listId);
  const [list, setList] = useState<ShoppingListDTO>();

  useEffect(() => {
    const temp = lists.filter(l => l.Id == listId.id);
    console.log(lists.filter(l => l.Id == listId.id));
    setList(temp[0]);
    console.log(lists);
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="md" sx={{marginTop: '8rem'}}>
      <Box
        sx={{
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto',
          padding: '2rem',
          justifyContent: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{textAlign: ' center', margin: 'auto'}}
        >
          {list && list.Name}
        </Typography>
        <IconButton
          size="large"
          sx={{marginRight: 0}}
          onClick={handleClickOpen}
        >
          <PersonPinIcon fontSize="large" />
        </IconButton>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>You share this grocery list with:</DialogTitle>
        <List sx={{pt: 0}}>
          {list &&
            list.Friends?.map((friend: UserDTO) => {
              console.log(friend);
              return (
                <ListItem button key={friend.Id}>
                  <ListItemAvatar>
                    <Avatar sx={{width: 32, height: 32, marginTop: '0.25rem'}}>
                      {<PersonIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={friend.Name} />
                </ListItem>
              );
            })}
        </List>
      </Dialog>
    </Container>
  );
};

export default ListScreen;

{
  /* {list.Friends &&
            list.Friends.map(key => (
              <ListItem button key={key}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={key} />
              </ListItem>
            ))} */
}
