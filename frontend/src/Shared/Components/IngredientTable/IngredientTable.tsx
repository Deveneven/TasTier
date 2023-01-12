import React, {useEffect, useState} from 'react';
import './IngredientTable.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  IconButton,
  MenuItem,
  Select,
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
import {MetricsDTO} from '../../DTOs/MetricsDTO';
import {Api} from '../../../Utils/Api';
import {TableIngredientDTO} from '../../DTOs/TableIngredientDTO';

type IngredientTableProps = {
  data: Array<IngredientDTO>;
  isEditable: boolean;
  onChange?: any;
};

const IngredientTable = (props: IngredientTableProps) => {
  const [caloriesSum, setCaloriesSum] = useState(0);
  const [testData, setTestData] = useState<Array<IngredientDTO>>(props.data);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [unit, setUnit] = useState<number>(0);
  const [amount, setAmount] = useState(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [units, setUnits] = useState<MetricsDTO[]>([]);
  const [allIngredients, setAllIngredients] = useState<TableIngredientDTO[]>([]);

  useEffect(() => {
    if (!!testData) {
      const sum = testData.reduce((partSum, ingredient) => partSum + ingredient.calories, 0);
      setCaloriesSum(sum);
    }
    if (!!props.onChange) {
      props.onChange({name: 'ingredients', value: testData});
    }
  }, [testData]);

  const deleteIngredient = (id: number) => {
    if (!!testData) {
      setTestData(testData.filter((item) => item.id !== id));
    }
  };
  const editIngredient = (ingredient: IngredientDTO) => {
    if (!isEdit) {
      setIngredientName(ingredient.name);
      setAmount(ingredient.amount);
    }
    setIsEdit(!isEdit);
  };

  const AddIngredientToList = () => {
    const existedIndex = testData.findIndex((elem) => elem.name == ingredientName);
    if (existedIndex !== -1) {
      testData[existedIndex].amount = amount;
      testData[existedIndex].unit = unit;
    } else if (!!ingredientName) {
      const ingredient = allIngredients.find((elem) => elem.name ==ingredientName);
      // TO DO: Liczenie kalorii
      // TO DO: Określenie czy jest to składnik alergiczny
      if (!!ingredient) {
        const ingrid: IngredientDTO = {
          id: ingredient.id_ingredient,
          amount: amount,
          unit: unit,
          name: ingredient.name,
          calories: 210,
          allergen: false,
        };
        setTestData([...testData, ingrid]);
      }
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

  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/ingredients/all`);
    if (data.success) {
      setAllIngredients(data.text);
    }
  };

  useEffect(() => {
    const metrics = localStorage.getItem('metrics');
    if (!!metrics) {
      setUnits(JSON.parse(metrics));
    }
    if (props.isEditable) {
      console.log(`IS EDITABLE: ${props.isEditable}`);
      fetchData();
    }
  }, []);

  const selectUnit = (e) => {
    setUnit(e.target.value);
  };

  const getUnitName = (ingredient) => {
    const unitName = units.find((x) => x.id == ingredient.unit)?.name;
    return unitName ?? ingredient.unit;
  };
  // TO DO: Zabezpieczenie przed dodaniem pustego
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
                <TableRow key={ingredient.id}>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.amount}</TableCell>
                  <TableCell>{getUnitName(ingredient)}</TableCell>
                  <TableCell>{ingredient.calories}</TableCell>
                  {props.isEditable && (
                    <TableCell align='center'>
                      <IconButton onClick={() => deleteIngredient(ingredient.id)}>
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
            {props.isEditable && (
              <IconButton
                color='primary'
                className='add-button'
                onClick={showAddPanel}>
                <AddIcon/>
              </IconButton>
            )}
          </div>
        </TableContainer>
      </Grid>
      {isEdit && (
        <>
          <Grid item xs={12} md={4}>
            <CustomAutocomplete
              disablePortal
              options={allIngredients.map((x) => {
                return x.name;
              })}
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
            <Select
              defaultValue={1}
              onChange={selectUnit}>
              {units?.map((unit: MetricsDTO) => {
                return (
                  <MenuItem
                    key={unit.id}
                    value={unit.id}>
                    {unit.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant='contained'
              onClick={AddIngredientToList}>
              {isEdit ? 'Edit' : 'Add'}
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default IngredientTable;
