import {TextField} from '@material-ui/core';
import {Autocomplete, Grid} from '@mui/material';
import React from 'react';
import './AddBasicInfo.scss';
const AddBasicInformation = (props: any) => {
  const [value, setValue] = React.useState([]);
  const handleKeyDown = (event) => {
    console.log(event);
    switch (event.key) {
      case 'Enter': {
        // event.preventDefault();
        // event.stopPropagation();
        if (event.target.value.length > 0) {
          console.log(...value);
          console.log(event.target.value);
          setValue([]);
          //  setValue([...value, event.target.value]);
        }
        break;
      }
      default:
    }
  };
  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          label="Nazwa dania"
          name="name"
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <textarea className='decription-textarea'/>
      </Grid>
      <Grid item xs={12} md={12}>
        <Autocomplete
          multiple
          freeSolo
          id="tags-outlined"
          value={value}
          onChange={props.onChange}
          options={[]}
          filterSelectedOptions
          renderInput={(params) => {
            params.inputProps.onKeyDown = handleKeyDown;
            return (
              <TextField
                {...params}
                variant="outlined"
                label="filterSelectedOptions"
                placeholder="Favorites"
                margin="normal"
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
