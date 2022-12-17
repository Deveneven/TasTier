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
    if (data.success) {
      setDataAll(data.text);
    }
  };

  useEffect(() => {
    fetchData();
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
            <Grid item key={recipe.id} xs={12} md={6} >
              <CustomCard key={recipe.id} data={recipe} />
            </Grid>
          );
        })}
      </Grid>
    </BaseLayout >
  );
};
export default MainScreen;
