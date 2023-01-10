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
type FavCousinesMenuProps = {
inputName:string;
label: string;
};

const FavCousinesMenu = ({inputName, label} : FavCousinesMenuProps) => {
  const [alert, setAlert] = useState<{
display:boolean,
text: string,
type: 'warning' | 'success' |'error' | 'info'
}>({display: false, text: 'something went wrong!', type: 'error'});


  const [areCousinesLoaded, setAreCousinesLoaded] = useState<boolean>(false);
  const [cousines, setCousines] = useState<any[]>();
  const [cousinesOptionValue, setCousinesOptionValue] = useState<any>([]);

  // get list of all cousines from api
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/cousine/get`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setCousines(response.text);
          }
        });
  }, []);
  // get user cousines from api
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/cousine/user`)
        .then((response) => {
          console.log(response.text);
          if (response.success) {
            if (response.text.length > 0) {
              const names = response.text.map(function(item) {
                return item['name'];
              });
              setCousinesOptionValue(names);
            }
          }
        });
    setAreCousinesLoaded(true);
  }, [setAreCousinesLoaded, setCousinesOptionValue]);


  // set array of strings as user cousine choices
  const handleChange = (event: SelectChangeEvent<typeof cousines>) => {
    console.log(event.target.value);
    const {
      target: {value},
    } = event;
    setCousinesOptionValue(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );
    console.log(cousinesOptionValue);
  };
  // post user diets
  const sendCousinesToDatabase = () => {
    Api.post(`${process.env.REACT_APP_DB_API}/diet/cousine/set`, cousinesOptionValue)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setAlert({display: true, text: response.text, type: 'success'});
          } else setAlert({display: true, text: response.text, type: 'error'});
        });
  };
  return (
    <Container sx={{margin: 'auto !important', textAlign: 'center'}}>
      {areCousinesLoaded && cousines && (
        <>
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
              {cousines.map((cousine) => ( <MenuItem key={cousine.id} value={cousine.name}>{cousine.name}</MenuItem>))}
            </Select>
          </FormControl>
          <Button variant="contained" sx={{margin: 'auto', width: 'min(400px, 80%)', marginTop: '2rem'}} onClick={sendCousinesToDatabase}>
Save
          </Button>
          {alert.display && (
            <CustomizableAlert setOpen={setAlert} message={alert.text} type={alert.type}/>
          )}
        </>
      )}
    </Container>
  );
};

export default FavCousinesMenu;
