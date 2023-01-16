import React from 'react';
import {RecipeDTO} from '../../DTOs/RecipeDTO';
import BaseLayout from '../BaseLayout/BaseLayout';
import CustomCard from '../Card/CustomCard';
type Props = {
    dataAll: RecipeDTO[];
};

const RecipesList = (props: Props) => {
  return (
    <BaseLayout>
      {props.dataAll?.map((recipe: RecipeDTO) => {
        return (
          <CustomCard key={recipe.id} data={recipe} />
        );
      })}
    </BaseLayout >
  );
};

export default RecipesList;
