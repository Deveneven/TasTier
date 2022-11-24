import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type InputFieldProps = {
value:string | null;
label : string;
id:string;
description:string | null;
};

const InputField = ({value, label, id, description}:InputFieldProps) => {
  return (
    <Grid
      container
    >
      <Grid item md={3}
      >
        <Typography component="h4" variant="h6" sx={{marginBlock: '1.2rem', textAlign: {sm: 'right', xs: 'center'}}}>
          {label}
        </Typography>
      </Grid>
      <Grid item md={8} sx={{marginInline: {xs: '2rem', md: 'auto'}}}>
        <TextField
          margin="normal"
          required
          fullWidth
          id={id}
          label={label}
          name={id}
          size="small"
          defaultValue={value}/>
        <Typography component="h6" variant="caption"
          sx={{marginTop: '0', padding: '0', fontFamily: ' var(--secondary-font) !important',
            color: 'var(--fnt-primary-color)',
            textAlign: {sm: 'left', xs: 'center'}}} >
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default InputField;
