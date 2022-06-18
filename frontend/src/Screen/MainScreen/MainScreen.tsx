import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import CustomCard from '../../Shared/Components/Card/Card';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import {UserDTO} from '../../Shared/DTOs/UserDTO';
import './MainScreen.scss';
import {IngredientDTO} from '../../Shared/DTOs/IngredientDTO';
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
          // eslint-disable-next-line max-len
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
    <Grid
      container
      spacing={4}
      direction='column'
      alignItems='center'
      justifyContent='center'>
      {dataAll?.map((recipe: RecipeDTO) => {
        return (
          <Grid item key={recipe.Id} xs={12} md={6}>
            <CustomCard data={recipe} />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default MainScreen;
