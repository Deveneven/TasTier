import {Button, Grid, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CustomAutocomplete from '../../../Shared/Components/Autocomplete/CustomAutocomplete';
import IngredientTable from '../../../Shared/Components/IngredientTable/IngredientTable';
import {IngredientDTO} from '../../../Shared/DTOs/IngredientDTO';

const AddIngredientsList = () => {
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  // const [unit, setUnit] = useState<string>('g');
  const [amount, setAmount] = useState<number>(0);

  useEffect(()=>{
    console.log('Use effect ingredient list');
  }, []);

  const AddIngredientToList = () => {
    console.log(amount);
    let i = ingredients.length;
    // check in database for calories
    if (!!ingredientName) {
      console.log('Bylem tu');
      const ingrid: IngredientDTO = {
        Id: i++,
        Amount: amount,
        Unit: 'g',
        Name: ingredientName,
        Calories: 210,
        Allergen: false,
      };
      setIngredients([...ingredients, ingrid]);
    }
    setIngredientName('');
    setBrandName('');
    setAmount(0);
  };
  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <IngredientTable data={ingredients}/>
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomAutocomplete
          freeSolo
          options={['banan', 'jogurt', 'chleb']}
          value={ingredientName}
          onChange={(event, newValue) => setIngredientName(newValue)}
          filterSelectedOptions
          label='Search for ingredient'
          placeholder='Ingredient name'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomAutocomplete
          freeSolo
          options={['jogobela', 'zott', 'schar']}
          value={brandName}
          onChange={(event, newValue) => setBrandName(newValue)}
          filterSelectedOptions
          label='Brand name'
          placeholder='Search for specific brand'
        />
      </Grid>
      <Grid item xs={10} md={1}>
        <TextField
          required
          variant='outlined'
          fullWidth
          label='Amount'
          name='amount'
          type='number'
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </Grid>
      <Grid item xs={2} md={1}>
        <span>Unit</span>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button onClick={AddIngredientToList}>Add</Button>
      </Grid>
    </Grid>
  );
};
export default AddIngredientsList;
