import React from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IngredientTableDiets from './IngredientTableDiets';
const DietSettingsScreen = () => {
  return (
    <BaseLayout>
      <Box
        maxWidth="lg"
        sx={{
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          padding: '2rem',
          justifyContent: {xs: 'center'},
          gap: '4rem',
        }}
      >
        <Grid
          container
          margin="auto"
          sx={{gap: '1rem'}}
        >
          <Grid item md={1}
            sx={{margin: {xs: 'auto', sm: '0'}}}
          >
            <Avatar sx={{width: 56, height: 56}}>
M
            </Avatar>
          </Grid>
          <Grid item md={10} sx={{textAlign: {xs: 'center', sm: 'left'}, marginBlock: 'auto'}} >
            <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: {xs: 'center', sm: 'left'}}}>
                John Doe diet preferences
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          margin="auto"
          sx={{gap: {xs: '1rem', sm: '2rem'}}}
        >
          <Grid item md={5}
          >
            < IngredientTableDiets buttonName={'allergen'} tableName={'Your allergens'}/>
          </Grid>
          <Grid item md={5} sx={{textAlign: {xs: 'center', sm: 'left'}, margin: 'auto'}} >
            <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}}>
                John Doe diet preferences
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};

export default DietSettingsScreen;
