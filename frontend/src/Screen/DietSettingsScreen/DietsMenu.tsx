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
type DietsMenuProps = {
inputName:string;
label: string;
options : any;
dietsOptionValue : {id:number, name:string};
setDietsOptionValue : any;
};

const DietsMenu = ({inputName, label, options, dietsOptionValue, setDietsOptionValue} : DietsMenuProps) => {
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});
  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    console.log(event.target);
    setDietsOptionValue(event.target.value);
  };
  const saveUserDietsToDatabase = () => {
    const dietId = dietsOptionValue.id;
    Api.post(`${process.env.REACT_APP_DB_API}/diet/diet/set`, dietId).then((response) => {
      if (response.success) setAlert({display: true, text: response.text, type: 'success'});
      else setAlert({display: true, text: response.text, type: 'error'});
    });
  };
  return (
    <Container sx={{marginBottom: '4rem', textAlign: 'center'}}>
      <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: {xs: 'center', sm: 'left'}}}>
        {inputName}
      </Typography>
      <FormControl sx={{width: 'min(600px, 100%)', marginBottom: '1rem'}}>
        <InputLabel id="diets-name-label">{label}</InputLabel>
        <Select
          labelId="diets-name-label"
          id="diets-name"
          value={dietsOptionValue}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => ( <MenuItem key={option.id} value={option}>{option.name}</MenuItem>))}
        </Select>
      </FormControl>
      {alert.display && (
        <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
      )}
      <Button variant="contained" sx={{margin: 'auto', width: 'min(400px, 80%)', marginTop: '2rem'}} onClick={saveUserDietsToDatabase}>
Save
      </Button>
    </Container>
  );
};

export default DietsMenu;
