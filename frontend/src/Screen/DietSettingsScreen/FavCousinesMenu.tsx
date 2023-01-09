import React, {useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import {Button, Container} from '@mui/material';
import {Api} from '../../Utils/Api';
import CustomizableAlert from '../../Shared/Components/Alert/CustomizableAlert';
type FavCousinesMenuProps = {
inputName:string;
label: string;
options : any;
cousinesOptionValue : any;
setCousinesOptionValue : any;
};

const FavCousinesMenu = ({inputName, label, options, cousinesOptionValue, setCousinesOptionValue} : FavCousinesMenuProps) => {
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    console.log(event.target.value);
    const {
      target: {value},
    } = event;
    setCousinesOptionValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const sendCousinesToDatabase = () => {
    const tmpIntArray : number[] = [];
    cousinesOptionValue.map((cousine) => {
      return tmpIntArray.push(cousine.id);
    });
    Api.post(`${process.env.REACT_APP_DB_API}/diet/cousine/set`, tmpIntArray)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setAlert({display: true, text: response.text, type: 'success'});
          } else setAlert({display: true, text: response.text, type: 'error'});
        });
  };
  return (
    <Container sx={{margin: 'auto !important', textAlign: 'center'}}>
      <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: {xs: 'center', sm: 'left'}}}>
        {inputName}
      </Typography>
      <FormControl sx={{width: 'min(600px, 100%)'}}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={cousinesOptionValue}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
        >
          {options.map((option) => ( <MenuItem key={option.id} value={option}>{option.name}</MenuItem>))}
        </Select>
      </FormControl>
      <Button variant="contained" sx={{margin: 'auto', width: 'min(400px, 80%)', marginTop: '2rem'}} onClick={sendCousinesToDatabase}>
Save
      </Button>
      {alert.display && (
        <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
      )}
    </Container>
  );
};

export default FavCousinesMenu;
