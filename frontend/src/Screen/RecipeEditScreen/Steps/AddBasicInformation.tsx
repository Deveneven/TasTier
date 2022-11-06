import {Grid} from '@mui/material';
import React from 'react';
import CustomAutocomplete from '../../../Shared/Components/Autocomplete/CustomAutocomplete';
import ValidatedTextField from '../../../Shared/Components/ValidatedTextField/ValidatedTextField';
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
        <ValidatedTextField
          required
          minLenght={5}
          variant='outlined'
          fullWidth
          label="Name of dish"
          name="name"
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <ValidatedTextField
          required
          maxLenght={250}
          multiline
          variant='outlined'
          fullWidth
          label="Short description"
          name="description"
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <CustomAutocomplete
          required
          multiple
          freeSolo
          options={['miesne', 'wege', 'gluten']}
          value={value}
          onChange={setTags}
          filterSelectedOptions
          label='Tags'
          placeholder="Set tags"
        />
      </Grid>
    </Grid>
  );
};
export default AddBasicInformation;
