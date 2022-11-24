import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import {Container} from '@mui/material';
type MultiSelectMenuProps = {
inputName:string;
label: string;
options : string[];
};

const MultiSelectMenu = ({inputName, label, options} : MultiSelectMenuProps) => {
  const [optionValue, setOptionValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: {value},
    } = event;
    setOptionValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <Container sx={{margin: 'auto !important'}}>
      <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: {xs: 'center', sm: 'left'}}}>
        {inputName}
      </Typography>
      <FormControl sx={{width: 'min(600px, 100%)'}}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={optionValue}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
        >
          {options.map((name, key) => ( <MenuItem key={key} value={name}>{name}</MenuItem>))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default MultiSelectMenu;
