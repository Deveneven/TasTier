import {Avatar, Button, Grid, TextField} from '@mui/material';
import React, {useState} from 'react';
import '../../../Shared/Components/Comment/Comment.scss';
const AddCookingSteps = (props: any) => {
  const [stepDescription, setStepDescription] = useState<string>();
  const [steps, setSteps] = useState<string[]>([]);
  // TO DO: Usuwanie kroku
  // TO DO: Edytowanie kroku
  // TO DO: Czyczczenie po wpisaniu
  // TO DO: Enter zatwierdza krok
  const AddNextStep = () => {
    if (!!stepDescription) {
      setSteps([...steps, stepDescription]);
      setStepDescription('');
      props.onChange({name: 'steps', value: [...steps, stepDescription]});
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
            <div className='comment'>
              <Avatar>{index+1}</Avatar>
              <TextField
                multiline
                disabled
                fullWidth
                defaultValue={step}/>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AddCookingSteps;
