import {Grid} from '@mui/material';
import React, {useState} from 'react';
import IngredientTable from '../../../Shared/Components/IngredientTable/IngredientTable';
import {IngredientDTO} from '../../../Shared/DTOs/IngredientDTO';

const AddIngredientsList = (props: any) => {
  const [ingredients] = useState<IngredientDTO[]>([]);

  const onChange = (event) => {
    if (props.onChange && props.checkIsValid) {
      props.onChange(event);
      console.log(event.value.length);
      props.checkIsValid({name: props.name, isValid: event.value.length > 0});
    }
  };
  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <IngredientTable
          isEditable={true}
          data={ingredients}
          onChange={onChange}/>
      </Grid>
    </Grid>
  );
};
export default AddIngredientsList;
