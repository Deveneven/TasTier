import React, {useEffect, useState} from 'react';
import './IngredientTable.scss';
import {
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
};

const IngredientTable = ({data}: IngredientTableProps) => {
  const [caloriesSum, setCaloriesSum] = useState(0);

  useEffect(() => {
    if (!!data) {
      const sum = data.reduce((partSum, ingredient) => partSum + ingredient.Calories, 0);
      setCaloriesSum(sum);
    }
  }, [data]);
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
            </TableRow>
          </TableHead>
          {!!data ?
            <TableBody>
              {data.map((ingredient: IngredientDTO) => (
                <TableRow key={ingredient.Id}>
                  <TableCell>{ingredient.Name}</TableCell>
                  <TableCell>{ingredient.Amount}</TableCell>
                  <TableCell>{ingredient.Unit}</TableCell>
                  <TableCell>{ingredient.Calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>:
           null}
        </Table>
        <div className='calories-Sum'>
          <span>Total calories: {caloriesSum} kcal</span>
        </div>
      </TableContainer>
    </div>
  );
};
export default IngredientTable;
