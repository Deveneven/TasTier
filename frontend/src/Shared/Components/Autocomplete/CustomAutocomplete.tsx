import {Autocomplete, TextField} from '@mui/material';
import React from 'react';

const CustomAutocomplete = (props: any) => {
  return (
    <Autocomplete
      {...props}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={props.label}
            placeholder={props.placeholder}
            fullWidth
          />
        );
      }}
    />
  );
};

export default CustomAutocomplete;
