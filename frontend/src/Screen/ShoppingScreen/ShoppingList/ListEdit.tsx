/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
import React from 'react';
import {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import {IngredientDTO} from '../../../Shared/DTOs/IngredientDTO';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, styled, Button} from '@mui/material';
import IngredientTable from '../../../Shared/Components/IngredientTable/IngredientTable';
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
          flexDirection: 'column',
          margin: 'auto',
          padding: '2rem',
          justifyContent: 'space-around',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
            padding: '2rem',
            justifyContent: 'center',
            width: '100%',
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
        {/* tu wkleic  */}
        {list && (
          <IngredientTable
            data={list.IngredientsList}
            // setLists={setLists}
            // lists={lists}
            // id={listId}
          />
        )}
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
  /* {list &&
          list.IngredientsList?.map((ingredient: IngredientDTO) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                width="100%"
                margin="auto"
                border="2px solid black"
              >
                <Grid item md={9} sx={{paddingLeft: '1rem'}}>
                  <Typography component="h4" variant="h6">
                    {ingredient.Name}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography component="h4" variant="h6">
                    {ingredient.Amount} {ingredient.Unit}
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Container>
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      color="inherit"
                    >
                      <DeleteIcon
                        fontSize="medium"
                        // onClick={() => {
                        //   console.log(lists.filter(item => item.Id == list.Id));
                        //   setLists(lists.filter(item => item.Id !== list.Id));
                        // }}
                      />
                    </IconButton>
                  </Container>
                </Grid>
              </Grid>
            );
          })} */
}
