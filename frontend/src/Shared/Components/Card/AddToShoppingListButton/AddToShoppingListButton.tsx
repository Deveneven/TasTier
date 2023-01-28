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
import CustomizableAlert from '../../Alert/CustomizableAlert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {IconButton} from '@mui/material';

const AddToShoppingListButton = ({data}:any) => {
  const [listName, setListName] = useState('');
  const [open, setOpen] = useState(false);
  const [allOptions, setAllOptions] = useState<Array<String>>([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});

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
          if (response.success) {
            const names = response.text.map(function(item) {
              return item['name'];
            });
            setAllOptions(names);
          }
        });
  };

  const AddProductsToListApi = () => {
    if (allOptions.includes(listName) && listName.length > 0) {
      // jest to api  dodajace rodukty
      Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/add/recipe`,
          {list_name: listName, ingredients: data},
      )
          .then((response) => {
            if (response.success) {
              setAlert({display: true, text: 'sucessfuly added produts to your list', type: 'success'});
            } else {
              setAlert({display: true, text: 'Error adding produts to your list', type: 'error'});
            }
          });
    } else if (listName.length > 0) {
      // api tworzace liste
      Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/add`, listName)
          .then((response) => {
            if (response.success) {
              Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/add/recipe`,
                  {list_name: listName, ingredients: data},
              )
                  .then((response) => {
                    if (response.success) {
                      setAlert({display: true, text: 'sucessfuly added produts to your list', type: 'success'});
                    } else {
                      setAlert({display: true, text: 'Error adding produts to your list', type: 'error'});
                    }
                  });
            } else {
              setAlert({display: true, text: 'Error creating a new list', type: 'error'});
            }
          });
    }
  };
  return (
    <>
      <IconButton onClick={ () => {
        handleClickOpen();
        getListsFromApi();
      }}>
        <AddShoppingCartIcon />
      </IconButton>
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
          {allOptions && (
            <CustomAutocomplete
              freeSolo
              options={allOptions}
              value={listName}
              onChange={(event, newValue) => setListName(newValue)}
              filterSelectedOptions
              autoSelect
              label='List Name'
              placeholder='Select one of your shopping lists or name the new one' />
          )}
          {alert.display && (
            <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
          )}
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
