import {Avatar, Button, Grid, TextField} from '@mui/material';
import React, {useState} from 'react';

const AddCookingSteps = () => {
  const [stepDescription, setStepDescription] = useState<string>();
  const [steps, setSteps] = useState<string[]>([]);

  const AddNextStep = () => {
    if (!!stepDescription) {
      console.log(stepDescription);
      setSteps([...steps, stepDescription]);
      console.log('Czyszczxenie textfielda');
      setStepDescription('');
    }
  };

  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <TextField
          multiline
          variant='outlined'
          fullWidth
          label="Describe process"
          defaultValue={stepDescription}
          onChange={(e) => setStepDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12} >
        <Button
          disabled={!stepDescription}
          variant='contained'
          onClick={AddNextStep}>
          Add step
        </Button>
      </Grid>
      {steps?.map((step, index) => {
        return (
          <Grid key={index+1} item xs={12} md={12}>
            <Avatar>{index+1}</Avatar>
            <TextField
              multiline
              disabled
              fullWidth
              defaultValue={step}/>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AddCookingSteps;
