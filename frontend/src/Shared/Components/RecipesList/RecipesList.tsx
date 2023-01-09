import React from 'react';
import Grid from '@mui/material/Grid';
import {RecipeDTO} from '../../DTOs/RecipeDTO';
import BaseLayout from '../BaseLayout/BaseLayout';
import CustomCard from '../Card/CustomCard';
type Props = {
    dataAll: RecipeDTO[];
};

const RecipesList = (props: Props) => {
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
        {props.dataAll?.map((recipe: RecipeDTO) => {
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

export default RecipesList;
