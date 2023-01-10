import {Grid} from '@mui/material';
import React, {useState} from 'react';
import IngredientTable from '../../../Shared/Components/IngredientTable/IngredientTable';
import {IngredientDTO} from '../../../Shared/DTOs/IngredientDTO';

const AddIngredientsList = (props: any) => {
  const [ingredients] = useState<IngredientDTO[]>([]);

  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <IngredientTable
          isEditable={true}
          data={ingredients}
          onChange={props.onChange}/>
      </Grid>
    </Grid>
  );
};
export default AddIngredientsList;
