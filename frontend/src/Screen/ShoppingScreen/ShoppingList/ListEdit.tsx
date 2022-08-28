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
const ListScreen = ({listId, lists, setLists}) => {
  console.log(listId);
  const [list, setList] = useState();

  useEffect(() => {
    const temp = lists.filter(l => l.id == listId.id);
    console.log(temp[0]);
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
          {list && list['name']}
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
        {/* <List sx={{pt: 0}}>
          {list['friends'].friends &&
            list['friends'].friends!.map(email => (
              <ListItem button key={email}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>
            ))}
        </List> */}
      </Dialog>
    </Container>
  );
};

export default ListScreen;
