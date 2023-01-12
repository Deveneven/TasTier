import Button from '@mui/material/Button';
import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CustomAutocomplete from '../../Autocomplete/CustomAutocomplete';
import {Api} from '../../../../Utils/Api';
const AddToShoppingListButton = ({data}:any) => {
  const [listName, setListName] = useState();
  const [open, setOpen] = useState(false);
  const [allOptions, setAllOptions] = useState<any>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  console.log(data);
  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  const textCenter = {
    textAlign: 'center',
    marginBlock: '1rem',
  };


  function getListsFromApi() {
    Api.get(`${process.env.REACT_APP_DB_API}/shoppinglist/get/userlists`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            const names = response.text.map(function(item) {
              return item['name'];
            });
            setAllOptions(names);
          }
        });
  };

  const AddProductsToListApi = () => {
    if (allOptions.includes(listName)) {
      // jest to api  dodajace rodukty
      Api.get(`${process.env.REACT_APP_DB_API}/shoppinglist/get/userlists`)
          .then((response) => {
            console.log(response);
            if (response.success) {
            }
          });
    } else {
      // api tworzace liste
      Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/add`, listName)
          .then((response) => {
            console.log(response);
            if (response.success) {
              // api dodajace produkty
            }
          });
    }
  };
  return (
    <>
      <Button onClick={ () => {
        handleClickOpen();
        getListsFromApi();
      }} variant='contained'>
Add to shopping list
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{textAlign: ' center', marginTop: '2rem !important'}}
        >
Add to Shopping list
        </Typography>
        <DialogContent>
          <DialogContentText>
  To reset your password, be sure to give an email that is registered for the account,
  and we will send you temporary password to log in and change it later on in user settings
          </DialogContentText>
          <CustomAutocomplete
            freeSolo
            options={allOptions}
            value={listName}
            onChange={(event, newValue) => setListName(newValue)}
            filterSelectedOptions
            label='Product Name'
            placeholder='Search for specific brand' />
          <Button variant="contained" sx={textCenter} fullWidth onClick={AddProductsToListApi}>
Add
          </Button>
          <Button
            variant="contained"
            sx={[textCenter, {float: 'right', display: {xs: 'block', md: 'none'}}]}
            onClick={handleClose}
          >
            {' '}
Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddToShoppingListButton;
