import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Api} from '../../../Utils/Api';


const AddListPopOut = ({open, setOpen, setLists, lists} : any) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const textCenter = {
    textAlign: 'center',
    margin: 'auto',
    marginTop: '2rem',
  };

  const [listName, setListName] = React.useState('');

  const submitList = () => {
    if (listName.length > 0) {
      Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/add`, listName)
          .then((response) => {
            if (response.success) {
              setLists((prvsLists) => [...prvsLists, {name: listName, id: response.text}]);
              setOpen(false);
            }
          });
    };
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={textCenter}>
          <Typography
            sx={{textAlign: ' center', margin: '2rem'}}
          >
                   Create Shopping List
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="shopping_list_name"
            label="Shopping list name"
            name="shopping_list_name"
            autoComplete="Shopping list name"
            autoFocus
            onChange={(e) => {
              setListName(e.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={textCenter}
            fullWidth
            onClick={submitList}
          >
            {' '}
            Add{' '}
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
    </div>
  );
};

export default AddListPopOut;
