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
    const ingrid: IngredientDTO = {
      Id: 0,
      Amount: 100,
      Unit: 'g',
      Name: 'ryż',
      Calories: 210,
      Allergen: false,
    };
    const recipe: RecipeDTO = {
      Id: 0,
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
    };
    const ingList: Array<IngredientDTO> = [];
    for (let i = 0; i < 10; i++) {
      ingrid.Id = i;
      ingList.push(ingrid);
    }
    for (let i = 0; i < 10; i++) {
      recipe.Id = i;
      recipe.Ingredients = ingList;
      setDataAll((v) => [...v, recipe]);
    }
  }, []);
  return (
    <Grid container spacing={4} className="main">
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
