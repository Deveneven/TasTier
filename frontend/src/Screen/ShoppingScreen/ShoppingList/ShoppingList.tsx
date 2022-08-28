/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-key */
import React from 'react';
import {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, styled, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AddListPopOut from './AddListPopOut';
const ShoppingList = ({lists, setLists}) => {
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
    <Container maxWidth="md" sx={{marginTop: '8rem'}}>
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
        {lists.map(list => {
          return (
            <Grid
              container
              spacing={4}
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Grid item md={10} sx={{marginRight: 'auto'}}>
                <Typography component="h4" variant="h6">
                  {list.name}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <IconContainer>
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    color="inherit"
                  >
                    <EditIcon
                      fontSize="medium"
                      onClick={() => {
                        navigate(`./edit/${list.id}`);
                      }}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    color="inherit"
                  >
                    <DeleteIcon
                      fontSize="medium"
                      onClick={() => {
                        console.log(lists.filter(item => item.id == list.id));
                        setLists(lists.filter(item => item.id !== list.id));
                      }}
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
