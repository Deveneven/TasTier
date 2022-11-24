import {Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import IngredientTable from '../../../Shared/Components/IngredientTable/IngredientTable';
import {IngredientDTO} from '../../../Shared/DTOs/IngredientDTO';

const AddIngredientsList = () => {
  const [ingredients] = useState<IngredientDTO[]>([]);

  useEffect(()=>{
    console.log('Use effect ingredient list');
  }, []);

  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <IngredientTable
          isEditable={true}
          data={ingredients}/>
      </Grid>
    </Grid>
  );
};
export default AddIngredientsList;
