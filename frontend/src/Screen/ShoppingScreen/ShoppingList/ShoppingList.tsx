import React from 'react';
import {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, styled, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AddListPopOut from './AddListPopOut';
import {Api} from '../../../Utils/Api';

const ShoppingList = () => {
  const [lists, setLists] = useState<any>([]);

  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/shoppinglist/get/userlists`)
        .then((response) => {
          if (response.success) {
            setLists(response.text);
          }
        });
  }, []);
  const deleteListFromAPI = (id) => {
    Api.remove(`${process.env.REACT_APP_DB_API}/shoppinglist/delete?id_list=${id}`)
        .then((response) => {
          if (response.success) {
            setLists(lists.filter((item) => item.id !== id));
          }
        });
  };
  const IconContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 'auto',
    },
  }));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <Container maxWidth="md" >
      <Box
        sx={{
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          padding: '2rem',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{textAlign: ' center', marginBottom: '4rem'}}
        >
          Your Groceries
        </Typography>
        {lists.length < 1 && (
          <Typography
            component="h1"
            variant="h4"
            sx={{textAlign: ' center', marginBottom: '4rem'}}
          >
            There are no lists created yet !
          </Typography>
        )}
        {lists.map((list) => {
          return (
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              key={list.id}
            >
              <Grid item md={10}>
                <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word'}}>
                  {list.name}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <IconContainer>
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    color="inherit"
                    onClick={() => {
                      navigate(`./edit/${list.id}`);
                    }}
                  >
                    <EditIcon
                      fontSize="medium"
                    />
                  </IconButton>
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    color="inherit"
                    onClick={() => {
                      deleteListFromAPI(list.id);
                    }}
                  >
                    <DeleteIcon
                      fontSize="medium"
                    />
                  </IconButton>
                </IconContainer>
              </Grid>
            </Grid>
          );
        })}
        <Button
          type="submit"
          variant="contained"
          sx={{margin: 'auto', mt: 4, mb: 2, width: '60%'}}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add List
        </Button>
      </Box>
      <AddListPopOut
        open={open}
        setOpen={setOpen}
        setLists={setLists}
        lists={lists}
      />
    </Container>
  );
};

export default ShoppingList;
