import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Typography from '@mui/material/Typography';

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
    <div style={{padding: '2rem'}}>
      <Typography component="h4" variant="h6" sx={{wordWrap: ' break-word', textAlign: {xs: 'center', sm: 'left'}}}>
        {inputName}
      </Typography>
      <FormControl sx={{m: 1, width: '300px'}}>
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
    </div>
  );
};

export default MultiSelectMenu;
