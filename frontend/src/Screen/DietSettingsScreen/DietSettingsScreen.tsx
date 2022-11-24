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
          padding: {md: '2rem', xs: '1rem'},
          justifyContent: {xs: 'center'},
          gap: {xs: '2rem', md: '4rem'},
        }}
      >
        <Grid
          container
          margin="auto"
          sx={{gap: '1rem'}}
        >
          <Grid item md={1}
          >
            <Avatar sx={{width: 56, height: 56, margin: 'auto'}}>
M
            </Avatar>
          </Grid>
          <Grid item md={10} sx={{textAlign: {xs: 'center', sm: 'left'}, marginBlock: 'auto'}} >
            <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: 'left'}}>
                John Doe diet preferences
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          margin="auto"
          justifyContent="space-between"
          sx={{gap: {xs: '2rem', md: '1rem'}, flexDirection: {xs: 'column-reverse', md: 'row'}}}
        >
          <Grid item md={5}
            sx={{width: 'min(600px, 100%)', margin: 'auto'}}
          >
            < IngredientTableDiets buttonName={'allergen'} tableName={'Your allergens'}/>
          </Grid>
          <Grid item md={5}
            sx={{width: 'min(600px, 100%)', margin: {sm: 'auto', md: '0 auto'}}}
          >
            <MultiSelectMenu inputName={'Your Diet:'} label={'Diets'} options={options}/>
            <MultiSelectMenu inputName={'Your favorite cousine:'} label={'Cousines'} options={options}/>
          </Grid>
        </Grid>
        <Grid
          container
          margin="auto"
          justifyContent="space-between"
          sx={{gap: {xs: '2rem', md: '2rem'}}}
        >
          <Grid item md={5}
            sx={{width: 'min(600px, 100%)', margin: 'auto'}}
          >
            < IngredientTableDiets buttonName={'ingredient'} tableName={'Your favorite Ingredients'}/>
          </Grid>
          <Grid item md={5}
            sx={{width: 'min(600px, 100%)', margin: 'auto'}}>
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
