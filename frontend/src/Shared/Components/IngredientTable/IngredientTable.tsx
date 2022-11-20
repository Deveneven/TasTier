import React, {useEffect, useState} from 'react';
import './IngredientTable.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {IngredientDTO} from '../../DTOs/IngredientDTO';
import {Button, Grid, TextField} from '@mui/material';
import CustomAutocomplete from '../../Components/Autocomplete/CustomAutocomplete';
type IngredientTableProps = {
  data: Array<IngredientDTO>;
  isEditable: boolean;
};

const IngredientTable = (props: IngredientTableProps) => {
  const [caloriesSum, setCaloriesSum] = useState(0);
  const [testData, setTestData] = useState<Array<IngredientDTO>>(props.data);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  // const [unit, setUnit] = useState<string>('g');
  const [amount, setAmount] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!!testData) {
      const sum = testData.reduce((partSum, ingredient) => partSum + ingredient.Calories, 0);
      setCaloriesSum(sum);
    }
  }, [testData]);

  const deleteIngredient = (id: number) => {
    if (!!testData) {
      setTestData(testData.filter((item) => item.Id !== id));
    }
  };
  const editIngredient = (ingredient: IngredientDTO) => {
    if (!isEdit) {
      setIngredientName(ingredient.Name);
      setAmount(ingredient.Amount);
    }
    setIsEdit(!isEdit);
  };

  const AddIngredientToList = () => {
    console.log(amount);
    let i = testData.length;
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
      setTestData([...testData, ingrid]);
    }
    setIngredientName('');
    setBrandName('');
    setAmount(0);
    setIsEdit(false);
  };

  const showAddPanel = () => {
    setIngredientName('');
    setBrandName('');
    setAmount(0);
    setIsEdit(!isEdit);
  };
  return (
    <Grid
      container
      spacing={1}>
      <Grid item xs={12} md={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Calories (kcal)</TableCell>
                {props.isEditable && <TableCell></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {testData?.map((ingredient: IngredientDTO) => (
                <TableRow key={ingredient.Id}>
                  <TableCell>{ingredient.Name}</TableCell>
                  <TableCell>{ingredient.Amount}</TableCell>
                  <TableCell>{ingredient.Unit}</TableCell>
                  <TableCell>{ingredient.Calories}</TableCell>
                  {props.isEditable && (
                    <TableCell align='center'>
                      <IconButton onClick={() => deleteIngredient(ingredient.Id)}>
                        <DeleteIcon/>
                      </IconButton>
                      <IconButton onClick={() => editIngredient(ingredient)}>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='table-panel'>
            <span className='calories-Sum'>Total calories: {caloriesSum} kcal</span>
            <IconButton
              className='add-button'
              onClick={showAddPanel}>
              <AddIcon/>
            </IconButton>
          </div>
        </TableContainer>
      </Grid>
      {isEdit && (
        <>
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
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <span>Unit</span>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant='contained'
              onClick={AddIngredientToList}>
                Add
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default IngredientTable;
