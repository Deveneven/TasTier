/* eslint-disable comma-dangle */
/* eslint-disable indent */
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import './IngredientTable.scss';
import DeleteIcon from '@material-ui/icons/Delete';
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
  data: Array<IngredientDTO>;
};

const IngredientTable = ({data}: IngredientTableProps) => {
  const [caloriesSum, setCaloriesSum] = useState(0);
  const location = useLocation();
  const isEditable = location.pathname.includes('edit');
  const [testData, setTestData] = useState<Array<IngredientDTO>>(data);
  useEffect(() => {
    const sum = data.reduce(
      (partSum, ingredient) => partSum + ingredient.Calories,
      0
    );
    console.log(sum);
    console.log(testData);
    setCaloriesSum(sum);
  }, [data, testData]);
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
              {isEditable && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {testData.map((ingredient: IngredientDTO) => (
              <TableRow key={ingredient.Id}>
                <TableCell>{ingredient.Name}</TableCell>
                <TableCell>{ingredient.Amount}</TableCell>
                <TableCell>{ingredient.Unit}</TableCell>
                <TableCell>{ingredient.Calories}</TableCell>
                {isEditable && (
                  <TableCell>
                    <DeleteIcon
                      onClick={() => {
                        setTestData(
                          // eslint-disable-next-line arrow-parens
                          testData.filter(item => item.Id !== ingredient.Id)
                        );
                        console.log(ingredient.Id);
                        console.log(testData);
                      }}
                    />
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
