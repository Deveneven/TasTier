import React, {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

type IngredientTableDietsProps = {
tableName: string;
buttonName: string;
};
const IngredientTableDiets = ({tableName, buttonName}:IngredientTableDietsProps) => {
  const [testData, setTestData] = useState<Array<any> | undefined>(
      [{Name: 'Ingredient1'}, {Id: 1, Name: 'Ingredient2'}, {Id: 2, Name: 'Ingredient3'}, {Id: 3, Name: 'Ingredient4'}],
  );

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>{tableName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testData?.map((ingredient: any) => (
              <TableRow key={ingredient.Id}>
                <TableCell sx={{margin: 'auto'}}>
                  {ingredient.Name}
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    focusable
                    className="icon-hover"
                    onClick={() => {
                      setTestData(
                          testData.filter((item) => item.Id !== ingredient.Id),
                      );
                      console.log(ingredient.Id);
                      console.log(testData);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            {!(testData && testData.length > 0) && (
              <TableRow>
                <TableCell sx={{margin: 'auto'}}>
                  No {tableName} added yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Button
          fullWidth
          sx={{mt: 3, marginInline: 'auto', textAlign: 'center'}}>
         Add {buttonName} <AddCircleIcon sx={{marginBlock: '0 !important', marginInline: '1rem', color: 'hsl(28, 100%, 50%)'}}/>
        </Button>
      </TableContainer>
    </div>
  );
};

export default IngredientTableDiets;
