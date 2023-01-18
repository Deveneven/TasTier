import React from 'react';
import {RecipeDTO} from '../../DTOs/RecipeDTO';
import BaseLayout from '../BaseLayout/BaseLayout';
import CustomCard from '../Card/CustomCard';
type Props = {
    dataAll?: RecipeDTO[];
    recipeSingle? : RecipeDTO;
children?;
};

const RecipesList = (props: Props) => {
  return (
    <BaseLayout>
      {props.children}
      {props.dataAll && props.dataAll?.length > 0 ? props.dataAll?.map((recipe: RecipeDTO) => {
        return (
          <CustomCard key={recipe.id} data={recipe} />
        );
      }):
 props.recipeSingle && ( <CustomCard key={props.recipeSingle?.id} data={props.recipeSingle} />)
      }
    </BaseLayout >
  );
};

export default RecipesList;
