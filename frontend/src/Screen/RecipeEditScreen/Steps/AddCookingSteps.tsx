import {Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField} from '@mui/material';
import React, {useState} from 'react';
import '../../../Shared/Components/Comment/Comment.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const AddCookingSteps = (props: any) => {
  const [stepDescription, setStepDescription] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [stepIndexToEdit, setIndexStepToEdit] = useState<number>(-1);

  const addNextStep = () => {
    if (!!stepDescription) {
      setSteps([...steps, stepDescription.trim()]);
      setStepDescription('');
      props.onChange({name: 'steps', value: [...steps, stepDescription]});
    }
  };

  const deleteStep = (index) => {
    if (index !== -1) {
      const updatedList = steps;
      updatedList.splice(index, 1);
      setSteps((prevLists) => [...updatedList]);
    }
  };

  const setStepToEdit = (index) => {
    if (index !== -1) {
      setIndexStepToEdit(index);
      setStepDescription(steps[index]);
      setIsEdit(true);
    }
  };

  const editStep = () => {
    if (stepIndexToEdit !== -1) {
      steps[stepIndexToEdit] = stepDescription.trim();
    }
    setStepDescription('');
    setSteps(steps);
    setIsEdit(false);
  };
  const onEnter = (e) => {
    if (e.keyCode == 13) {
      isEdit ? editStep() : addNextStep();
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
          value={stepDescription}
          onKeyDown={onEnter}
          onChange={(e) => setStepDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12} >
        <Button
          disabled={!stepDescription}
          variant='contained'
          onClick={isEdit ? editStep : addNextStep}>
          {isEdit ? 'Edit step' : 'Add step'}
        </Button>
      </Grid>
      <Grid item xs={12} md={12}>
        <List>
          {steps?.map((step, index) => {
            return (
              <ListItem key={index}
                secondaryAction={
                  <div>
                    <IconButton onClick={() => deleteStep(index)}>
                      <DeleteIcon/>
                    </IconButton>
                    <IconButton onClick={() => setStepToEdit(index)}>
                      <EditIcon/>
                    </IconButton>
                  </div>
                }>
                <ListItemAvatar>
                  <Avatar>{index+1}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={step}
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default AddCookingSteps;
