import React, {useState, useEffect} from 'react';
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
};

const DietsMenu = ({inputName, label} : DietsMenuProps) => {
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});

  const [isDateLoaded, setIsDateLoaded] = useState(false);
  const [dietsOptionValue, setDietsOptionValue] = useState<any>('');
  const [diets, setDiets] = useState<any[]>();

  // get list of diets from api
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/diet/get`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setDiets(response.text);
          }
        });
  }, []);

  // get user diets from api
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/diet/user`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            if (response.text.name) {
              setDietsOptionValue(response.text.name);
            }
          }
        });
    setIsDateLoaded(true);
  }, [setDietsOptionValue]);

  // functions
  const handleChange = (event: SelectChangeEvent<typeof diets>) => {
    console.log(event.target.value);
    setDietsOptionValue(event.target.value);
  };


  const saveUserDietsToDatabase = () => {
    Api.post(`${process.env.REACT_APP_DB_API}/diet/diet/set`, dietsOptionValue).then((response) => {
      if (response.success) setAlert({display: true, text: response.text, type: 'success'});
      else setAlert({display: true, text: response.text, type: 'error'});
    });
  };


  return (
    <Container sx={{marginBottom: '4rem', textAlign: 'center'}}>
      {isDateLoaded && diets && (
        <>
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
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {diets.map((diet) => ( <MenuItem key={diet.id} value={diet.name}>{diet.name}</MenuItem>))}
            </Select>
          </FormControl>
          {alert.display && (
            <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
          )}
          <Button variant="contained" sx={{margin: 'auto', width: 'min(400px, 80%)', marginTop: '2rem'}} onClick={saveUserDietsToDatabase}>
Save
          </Button>
        </>
      )}
    </Container>
  );
};

export default DietsMenu;
