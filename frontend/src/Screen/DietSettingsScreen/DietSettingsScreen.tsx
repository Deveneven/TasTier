import React, {useContext, useEffect, useState} from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IngredientTableDiets from './IngredientTableDiets';
import {Api} from '../../Utils/Api';
import FavCousinesMenu from './FavCousinesMenu';
import DietsMenu from './DietsMenu';
import UserContext from '../../Contexts/UserContext';
import UserAvatar from '../../Shared/Components/UserAvatar/UserAvatar';
import UserName from '../../Shared/Components/UserName/UserName';

const DietSettingsScreen = () => {
  const {user} = useContext(UserContext);
  const [diets, setDiets] = useState<string[]>();
  const [cousines, setCousines] = useState<string[]>();
  const [dietsOptionValue, setDietsOptionValue] = React.useState<{id:number, name:string}>({id: 0, name: 'filledComponent'});
  const [cousinesOptionValue, setCousinesOptionValue] = React.useState<string[]>([]);

  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/diet/get`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setDiets(response.text);
          }
        });
  }, []);
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/cousine/get`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setCousines(response.text);
          }
        });
  }, []);
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
        {diets && cousines && (
          <>
            <Grid
              container
              margin="auto"
              sx={{gap: '1rem'}}
            >
              <Grid item md={1}
              >
                {/* <Avatar sx={{width: 56, height: 56, margin: 'auto'}}>
M
                </Avatar> */}
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
                < IngredientTableDiets buttonName={'allergen'} tableName={'Your allergens'}/>
              </Grid>
              <Grid item md={5}
                sx={{width: 'min(600px, 100%)', margin: {sm: 'auto', md: '0 auto'}}}
              >
                <DietsMenu inputName={'Your Diet:'} label={'Diets'}
                  options={diets}
                  dietsOptionValue={dietsOptionValue}
                  setDietsOptionValue={setDietsOptionValue}/>
                <FavCousinesMenu inputName={'Your favorite cousine:'} label={'Cousines'}
                  options={cousines}
                  cousinesOptionValue={cousinesOptionValue}
                  setCousinesOptionValue={setCousinesOptionValue}
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
                < IngredientTableDiets buttonName={'ingredient'} tableName={'Your favorite Ingredients'}/>
              </Grid>
              <Grid item md={5}
                sx={{width: 'min(600px, 100%)', margin: 'auto'}}>
                < IngredientTableDiets buttonName={'ingredient'} tableName={'Your least favorite Ingredients'}/>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </BaseLayout>
  );
};

export default DietSettingsScreen;
