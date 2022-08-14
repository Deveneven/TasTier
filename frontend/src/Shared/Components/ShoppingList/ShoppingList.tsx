/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-key */
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, styled} from '@mui/material';
const ShoppingList = () => {
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

  const lists = [
    'List title number 1',
    'List title number 2',
    'List title number 3',
    'List title number 4',
  ];

  return (
    <Container maxWidth="md" sx={{marginTop: '8rem'}}>
      <Box
        sx={{
          bgcolor: 'white',
          height: '40vh',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // space-evenly;
          margin: 'auto',
          padding: '2rem',
        }}
      >
        <Typography component="h1" variant="h4" sx={{textAlign: ' center'}}>
          Your Groceries
        </Typography>
        {lists.map(list => {
          return (
            <Grid
              container
              spacing={4}
              direction="row"
              alignItems="center"
              justifyContent="center"
              margin="auto"
              width="100%"
            >
              <Grid item md={10} sx={{marginRight: 'auto'}}>
                <Typography component="h4" variant="h6">
                  {list}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <IconContainer>
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    color="inherit"
                  >
                    <EditIcon fontSize="medium" />
                  </IconButton>
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    color="inherit"
                  >
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </IconContainer>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Container>
  );
};

export default ShoppingList;
