import {Button, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import IngredientTable from '../../../Shared/Components/IngredientTable/IngredientTable';
import {IngredientDTO} from '../../../Shared/DTOs/IngredientDTO';

const AddIngredientsList = () => {
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]);
  let i = 0;
  useEffect(()=>{
    console.log('Use effect ingredient list');
  }, []);
  const AddIngredientToList = () => {
    const ingrid: IngredientDTO = {
      Id: i,
      Amount: 100,
      Unit: 'g',
      Name: 'ryż',
      Calories: 210,
      Allergen: false,
    };
    i++;
    setIngredients([...ingredients, ingrid]);
  };
  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <IngredientTable data={ingredients}/>
      </Grid>
      <Grid item>
        <Button onClick={AddIngredientToList}>Add</Button>
      </Grid>
    </Grid>
  );
};
export default AddIngredientsList;
