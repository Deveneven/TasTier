import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import CustomCard from '../../Shared/Components/Card/CustomCard';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import './MainScreen.scss';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import {Api} from '../../Utils/Api';

const MainScreen = () => {
  const [dataAll, setDataAll] = useState<RecipeDTO[]>([]);

  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/recipes`);
    console.log(data);
    if (data.success) {
      const recipes = data.text as RecipeDTO[];
      console.log(recipes);
      setDataAll(recipes);
    }
    console.log(dataAll);
  };

  useEffect(() => {
    fetchData();
    // const user: UserDTO = {
    //   Name: 'Andrzej',
    //   LastName: 'Kowalski',
    //   Nickname: 'KowalSwojegoLosu',
    //   Avatar: '',
    //   Email: 'kowalski@tlen.pl',
    //   Id: 1234,
    // };
    // const ingList: Array<IngredientDTO> = [];
    // for (let i = 0; i < 10; i++) {
    //   const ingrid: IngredientDTO = {
    //     Id: i,
    //     Amount: 100,
    //     Unit: 'g',
    //     Name: 'ryż',
    //     Calories: 210,
    //     Allergen: false,
    //   };
    //   ingList.push(ingrid);
    // }
    // const recipies: Array<RecipeDTO> = [];
    // for (let i = 0; i < 10; i++) {
    //   const recipe: RecipeDTO = {
    //     Id: i,
    //     Name: 'Pancakes',
    //     Difficulty: 1,
    //     Time: '',
    //     Image: '',
    //     Description:
    //       'Jajka roztrzepać i wy
    // mieszać z mlekiem, następnie połączyć z pozostałymi składnikami na końcu dodać masło. Odstawić na 15 minut.',
    //     User: user,
    //     Date: new Date('2022/05/24'),
    //     Rating: 233,
    //     Ingredients: ingList,
    //   };
    //   recipies.push(recipe);
    // }
    // setDataAll(recipies);
  }, []);
  return (
    <BaseLayout>
      <Grid
        key={'main-grid'}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{gap: '4rem'}}
      >
        {dataAll?.map((recipe: RecipeDTO) => {
          return (
            <Grid item key={recipe.Id} xs={12} md={6} >
              <CustomCard key={recipe.Id} data={recipe} />
            </Grid>
          );
        })}
      </Grid>
    </BaseLayout >
  );
};
export default MainScreen;
