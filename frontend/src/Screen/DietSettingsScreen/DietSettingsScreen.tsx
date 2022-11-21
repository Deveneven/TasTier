import React from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IngredientTableDiets from './IngredientTableDiets';
import MultiSelectMenu from './MultiSelectMenu';
import Button from '@mui/material/Button';

const DietSettingsScreen = () => {
  const [options] = React.useState<string[]>([
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ]);
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
          justifyContent="space-between"
          sx={{gap: {xs: '1rem', sm: '2rem'}}}
        >
          <Grid item md={5}
          >
            < IngredientTableDiets buttonName={'allergen'} tableName={'Your allergens'}/>
          </Grid>
          <Grid item md={5} >
            <MultiSelectMenu inputName={'Your Diet:'} label={'Diets'} options={options}/>
            <MultiSelectMenu inputName={'Your favorite cousine:'} label={'Cousines'} options={options}/>
          </Grid>
        </Grid>
        <Grid
          container
          margin="auto"
          justifyContent="space-between"
          sx={{gap: {xs: '1rem', sm: '2rem'}}}
        >
          <Grid item md={5}
          >
            < IngredientTableDiets buttonName={'ingredient'} tableName={'Your favorite Ingredients'}/>
          </Grid>
          <Grid item md={5}>
            < IngredientTableDiets buttonName={'ingredient'} tableName={'Your least favorite Ingredients'}/>
          </Grid>
        </Grid>
        <Button variant="contained" sx={{width: '300px', margin: 'auto'}}>
Save
        </Button>
      </Box>
    </BaseLayout>
  );
};

export default DietSettingsScreen;
