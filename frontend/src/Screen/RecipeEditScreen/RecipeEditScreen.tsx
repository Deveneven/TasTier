import {Button, Card, Step, StepLabel, Stepper} from '@mui/material';
import React, {useState} from 'react';
import './RecipeEditScreen.scss';
import AddBasicInformation from './Steps/AddBasicInformation';
import AddIngridiensList from './Steps/AddIngredientsList';

const RecipeEditScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const setNextStep = () => {
    if (activeStep < stepList.length) {
      setActiveStep(activeStep+1);
    } else {
      console.log('Submit Action');
    }
  };
  const setStep = (step: number) => {
    const stepToRender = stepList.find((x) => x.id == step);
    if (!!stepToRender) {
      return stepToRender.content;
    }
  };
  const onValueChange = (event: any) => {
    const {type, name, value} = !!event.target ? event.target : event;
    console.log('On Walue Change');
    console.log(type);
    console.log(name);
    console.log(value);
  };
  const stepList = [{id: 0, name: 'Uzupelnij informacje',
    content: <AddBasicInformation onChange={onValueChange}/>},
  {id: 1, name: 'Uzupelnij informacje2', content: <AddIngridiensList/>},
  {id: 2, name: 'Uzupelnij informacje3', content: <AddBasicInformation/>}];

  return (
    <Card className="create-recipe-card">
      <Stepper
        activeStep={activeStep}>
        {stepList?.map((step) => {
          return (
            <Step key={step.id}>
              <StepLabel>{step.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className='create-recipe-step-content'>
        {setStep(activeStep)}
      </div>
      <Button
        onClick={setNextStep}>
        {activeStep < stepList.length-1 ? 'Next' : 'Submit'}
      </Button>
    </Card>
  );
};
export default RecipeEditScreen;
