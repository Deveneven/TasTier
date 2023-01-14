import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Api} from '../../../Utils/Api';
import CustomizableAlert from '../../../Shared/Components/Alert/CustomizableAlert';


const AddListPopOut = ({open, setOpen, setLists, lists} : any) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});
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
      const names = lists.map(function(item) {
        return item['name'];
      });
      if (!names.includes(listName)) {
        Api.post(`${process.env.REACT_APP_DB_API}/shoppinglist/add`, listName)
            .then((response) => {
              if (response.success) {
                setLists((prvsLists) => [...prvsLists, {name: listName, id: response.text}]);
                setOpen(false);
              }
            });
      } else {
        setAlert({display: true, text: 'Lists have to be diffrent name', type: 'error'});
      }
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
            sx={[textCenter, {marginBottom: '0.5rem'}]}
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
          {alert.display && (
            <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddListPopOut;
