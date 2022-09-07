import {TextField} from '@material-ui/core';
import {Autocomplete, Grid} from '@mui/material';
import React from 'react';
const AddBasicInformation = (props: any) => {
  const [value, setValue] = React.useState<string[]>([]);

  const setTags = (event, newValue) => {
    setValue(newValue);
    props.onChange({type: 'text', name: 'tags', value: newValue});
  };
  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          label="Name of dish"
          name="name"
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          label="Short description"
          name="description"
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Autocomplete
          multiple
          freeSolo
          options={['miesne', 'wege', 'gluten']}
          value={value}
          onChange={setTags}
          filterSelectedOptions
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label="filterSelectedOptions"
                placeholder="Favorites"
                fullWidth
              />
            );
          }}
        />
      </Grid>
    </Grid>
  );
};
export default AddBasicInformation;
