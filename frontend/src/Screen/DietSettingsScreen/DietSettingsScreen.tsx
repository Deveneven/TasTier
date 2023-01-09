import React, {useContext} from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FavCousinesMenu from './FavCousinesMenu';
import DietsMenu from './DietsMenu';
import UserContext from '../../Contexts/UserContext';
import UserAvatar from '../../Shared/Components/UserAvatar/UserAvatar';
import UserName from '../../Shared/Components/UserName/UserName';
import UserAllergensTable from './IngridientTableApiComponents/UserAllergensTable';
import UserFavoriteIngridients from './IngridientTableApiComponents/UserFavoriteIngridients';
import UserLeastFavoriteIngridients from './IngridientTableApiComponents/UserLeastFavoriteIngridients';

const DietSettingsScreen = () => {
  const {user} = useContext(UserContext);
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
            <UserAvatar user={user} sx={{width: 56, height: 56, float: {md: 'right', xs: 'left'}}} />
          </Grid>
          <Grid item md={10} sx={{textAlign: {xs: 'center', sm: 'left'}, marginBlock: 'auto'}} >
            <UserName/>
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
            <UserAllergensTable />
          </Grid>
          <Grid item md={5}
            sx={{width: 'min(600px, 100%)', margin: {sm: 'auto', md: '0 auto'}}}
          >
            <DietsMenu inputName={'Your Diet:'} label={'Diets'}/>
            <FavCousinesMenu inputName={'Your favorite cousine:'} label={'Cousines'}
            />
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
            {/* < IngredientTableDiets buttonName={'ingredient'} tableName={'Your favorite Ingredients'}/> */}
            <UserFavoriteIngridients />
          </Grid>
          <Grid item md={5}
            sx={{width: 'min(600px, 100%)', margin: 'auto'}}>
            <UserLeastFavoriteIngridients />
            {/* < IngredientTableDiets buttonName={'ingredient'} tableName={'Your least favorite Ingredients'}/> */}
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};

export default DietSettingsScreen;
