import React, {useContext} from 'react';
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
// import {ShoppingListDTO} from '../../../Shared/DTOs/ShoppingListDTO';
// import {UserDTO} from '../../../Shared/DTOs/UserDTO';
import {Button, Divider, IconButton, TextField} from '@mui/material';
import IngredientTable from '../../../Shared/Components/IngredientTable/IngredientTable';
import {Api} from '../../../Utils/Api';
import {useParams} from 'react-router-dom';
import CustomizableAlert from '../../../Shared/Components/Alert/CustomizableAlert';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../../../Contexts/UserContext';
const ListScreen = () => {
  const params = useParams();
  const [list, setList] = useState<any>();
  const [friends, setFriends] = useState<any>();
  const [friendInput, setFriendInput] = useState<any>();
  const [error, setError] = useState({display: false, text: ''});
  const [ingredientError, setIngredientError] = useState({display: false, text: ''});
  const {user} = useContext(UserContext);
  // const [ingredients] = useState<any>();

  //   const onValueChange = (event: any) => {
  //     const {name, value} = !!event.target ? event.target : event;
  //     ingredients[name] = value;
  //   };

  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/shoppinglist/get/shoppinglist?Id_ShoppingList=${params.id}`)
        .then((response) => {
          if (response.success) {
            setList(response.text);
            setFriends(response.text.friends);
          }
        });
  }, [params.id]);
  const addFriend = () => {
    Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/add/friend`, {id_list: params.id, email: friendInput})
        .then((response) => {
          if (response.success) {
            setList(response.text);
            setFriends((prvsFriends) => [...prvsFriends, {id_user: response.text, email: friendInput}]);
          } else {
            setError({display: true, text: response.text});
          }
        });
  };
  const sendDeleteToApi = (name) => {
    Api.remove(`${process.env.REACT_APP_DB_API}/shoppinglist/delete/friend`, {id_list: params.id, email: name})
        .then((response) => {
          if (response.success) {
            setFriends(friends.filter((item) => item.id_user !== response.text));
          } else {
            setError({display: true, text: response.text});
          }
        });
  };
  const editIngredientInApi = (ingrid) => {
    return Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/edit/ingredient`,
        {ingredient: ingrid.name, id_list: params.id, amount: ingrid.amount})
        .then((response) => {
          if (response.success) {
            return true;
          } else {
            setIngredientError({display: true, text: response.text});
            return false;
          }
        });
  };
  const deleteIngredientInApi = (ingridName) => {
    return Api.remove(`${process.env.REACT_APP_DB_API}/shoppinglist/delete/ingredient`,
        {ingredient: ingridName, id_list: params.id})
        .then((response) => {
          if (response.success) {
            return true;
          } else {
            setIngredientError({display: true, text: response.text});
            return false;
          }
        });
  };
  const addIngredientInApi = (ingrid) => {
    return Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/add/ingredient`,
        {ingredient: ingrid.name, id_list: params.id, amount: ingrid.amount})
        .then((response) => {
          if (response.success) {
            return true;
          } else {
            setIngredientError({display: true, text: response.text});
            return false;
          }
        });
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          bgcolor: 'white',
          padding: '2rem',
        }}
      >
        <IconButton
          size="large"
          sx={{marginRight: 0, float: 'right'}}
          onClick={handleClickOpen}
        >
          <PersonPinIcon fontSize="large" />
        </IconButton>
        <Box
          sx={{
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
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
        </Box>
        {list && list.ingredientList && (
          <IngredientTable
            isEditable={true}
            data={list.ingredientList}
            editIngredientInApi={editIngredientInApi}
            addIngredientInApi={addIngredientInApi}
            deleteIngredientInApi={deleteIngredientInApi}
          />
        )}
        {ingredientError.display && (
          <ListItem>
            <CustomizableAlert setOpen={setIngredientError} message={ingredientError.text} type={'error'}/>
          </ListItem>
        )}
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>You share this grocery list with:</DialogTitle>
        <List sx={{pt: 0}}>
          {list && friends &&
            friends.map((friend: any) => {
              return (
                <ListItem button key={friend.id_user}>
                  <ListItemAvatar>
                    <Avatar sx={{width: 32, height: 32, marginTop: '0.25rem'}}>
                      {<PersonIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={friend.email} />
                  {user && user.email !== friend.email && (
                    <DeleteIcon
                      focusable
                      className="icon-hover"
                      onClick={() => {
                        sendDeleteToApi(friend.email);
                      }}
                    />
                  )}
                </ListItem>
              );
            })}
          <Divider />
          <ListItem>
            <TextField
              sx={{margin: 'auto'}}
              label="Friend's Mail"
              fullWidth
              onChange={(e) => {
                setFriendInput(e.target.value);
              }}
            />
          </ListItem>
          <ListItem>
            <Button onClick={addFriend} variant="contained" fullWidth>
Add Friend
            </Button>
          </ListItem>
          {error.display && (
            <ListItem>
              <CustomizableAlert setOpen={setError} message={error.text} type={'error'}/>
            </ListItem>
          )}
        </List>
      </Dialog>
    </Container>
  );
};

export default ListScreen;
