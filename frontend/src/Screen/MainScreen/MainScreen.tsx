import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import CustomCard from '../../Shared/Components/Card/CustomCard';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import {UserDTO} from '../../Shared/DTOs/UserDTO';
import './MainScreen.scss';
import {IngredientDTO} from '../../Shared/DTOs/IngredientDTO';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';

const MainScreen = () => {
  const [dataAll, setDataAll] = useState<RecipeDTO[]>([]);
  useEffect(() => {
    console.log('Main screen');
    const user: UserDTO = {
      Name: 'Andrzej',
      LastName: 'Kowalski',
      Nickname: 'KowalSwojegoLosu',
      Avatar: '',
      Email: 'kowalski@tlen.pl',
      Id: 1234,
    };
    const ingList: Array<IngredientDTO> = [];
    for (let i = 0; i < 10; i++) {
      const ingrid: IngredientDTO = {
        Id: i,
        Amount: 100,
        Unit: 'g',
        Name: 'ryż',
        Calories: 210,
        Allergen: false,
      };
      ingList.push(ingrid);
    }
    const recipies: Array<RecipeDTO> = [];
    for (let i = 0; i < 10; i++) {
      const recipe: RecipeDTO = {
        Id: i,
        Name: 'Pancakes',
        Difficulty: 1,
        Time: '',
        Image: '',
        Description:
          'Jajka roztrzepać i wymieszać z mlekiem, następnie połączyć z pozostałymi składnikami na końcu dodać masło. Odstawić na 15 minut.',
        User: user,
        Date: new Date('2022/05/24'),
        Rating: 233,
        Ingredients: ingList,
      };
      recipies.push(recipe);
    }
    setDataAll(recipies);
  }, []);
  return (
    <BaseLayout>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{gap: '4rem'}}
      >
        {dataAll?.map((recipe: RecipeDTO) => {
          return (
            <Grid item key={recipe.Id} xs={12} md={6} >
              <CustomCard data={recipe} />
            </Grid>
          );
        })}
      </Grid>
    </BaseLayout >
  );
};
export default MainScreen;
