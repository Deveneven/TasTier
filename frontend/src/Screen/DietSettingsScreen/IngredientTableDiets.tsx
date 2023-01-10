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
import CustomAutocomplete from '../../Shared/Components/Autocomplete/CustomAutocomplete';
import {Api} from '../../Utils/Api';
type IngredientTableDietsProps = {
tableName: string;
buttonName: string;
allOptions : any;
userOptions : any;
setUserOptions :any;
deleteProp: any;
};

const IngredientTableDiets = ({tableName, buttonName, allOptions, userOptions, setUserOptions, deleteProp}:IngredientTableDietsProps) => {
  const [productName, setProductName] = useState<String>('');
  const sendDeleteToApi = (name) => {
    Api.remove(`${process.env.REACT_APP_DB_API}/diet/${deleteProp}/delete`, name)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setUserOptions(userOptions.filter((item) => item !== name));
          }
        });
  };

  const sendUpdateToApi = (name) => {
    if (!userOptions.includes(name)) {
      Api.post(`${process.env.REACT_APP_DB_API}/diet/${deleteProp}/add`, name)
          .then((response) => {
            console.log(response);
            if (response.success) {
              setUserOptions((testData) => ([...testData, productName] ));
            }
          });
    }
  };
  return (
    <div>
      <TableContainer sx={{padding: '0 !important'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>{tableName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOptions?.map((ingredient: any) => (
              <TableRow key={ingredient}>
                <TableCell sx={{margin: 'auto'}}>
                  {ingredient}
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    focusable
                    className="icon-hover"
                    onClick={() => {
                      sendDeleteToApi(ingredient);
                      console.log(userOptions);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            {!(userOptions && userOptions.length > 0) && (
              <TableRow>
                <TableCell sx={{margin: 'auto'}}>
                  No {tableName} added yet
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align="center" colSpan={2} >
                <CustomAutocomplete
                  freeSolo
                  options={allOptions}
                  value={productName}
                  onChange={(event, newValue) => setProductName(newValue)}
                  filterSelectedOptions
                  label='Product Name'
                  placeholder='Search for specific brand' />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          fullWidth
          sx={{mt: 3, marginInline: 'auto', textAlign: 'center'}}
          onClick= {() => {
            if (!productName) return;
            sendUpdateToApi(productName);
          }}>
         Add {buttonName} <AddCircleIcon sx={{marginBlock: '0 !important', marginInline: '1rem', color: 'hsl(28, 100%, 50%)'}}/>
        </Button>
      </TableContainer>
    </div>
  );
};

export default IngredientTableDiets;
