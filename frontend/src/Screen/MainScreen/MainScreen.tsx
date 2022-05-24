import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import CustomCard from '../../Shared/Components/Card/Card';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import {UserDTO} from '../../Shared/DTOs/UserDTO';
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

    const recipe: RecipeDTO = {
      Id: 0,
      Name: 'Pancakes',
      Difficulty: 1,
      Time: '',
      Image: '',
      Description:
        // eslint-disable-next-line max-len
        'Jajka roztrzepać i wymieszać z mlekiem, następnie połączyć z pozostałymi składnikami na końcu dodać masło. Odstawić na 15 minut',
      User: user,
      Date: new Date('2022/05/24'),
      Rating: 233,
    };
    for (let i = 0; i < 10; i++) {
      recipe.Id = i;
      setDataAll((v) => [...v, recipe]);
    }
  }, []);
  return (
    <Grid container spacing={2}>
      {dataAll?.map((recipe: RecipeDTO) => {
        return <CustomCard key={recipe.Id} data={recipe} />;
      })}
    </Grid>
  );
};
export default MainScreen;
