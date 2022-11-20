import React, {useEffect, useState} from 'react';
import './IngredientTable.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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

type IngredientTableProps = {
  data?: Array<IngredientDTO>;
  isEditable: boolean;
};

const IngredientTable = (props: IngredientTableProps) => {
  const [caloriesSum, setCaloriesSum] = useState(0);
  const [testData, setTestData] = useState<Array<IngredientDTO> | undefined>(props.data);

  useEffect(() => {
    if (!!testData) {
      const sum = testData.reduce((partSum, ingredient) => partSum + ingredient.Calories, 0);
      setCaloriesSum(sum);
    }
  }, [props.data, testData]);

  const deleteIngredient = (id: number) => {
    if (!!testData) {
      setTestData(testData.filter((item) => item.Id !== id));
    }
  };
  const editIngredient = (ingredient: IngredientDTO) => {

  };
  return (
    <div>
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
                  <TableCell>
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
        <div className="calories-Sum">
          <span>Total calories: {caloriesSum} kcal</span>
        </div>
      </TableContainer>
    </div>
  );
};
export default IngredientTable;
