import {Button, Step, StepLabel, Stepper} from '@mui/material';
import React, {useState} from 'react';
import './RecipeEditScreen.scss';
import AddBasicInformation from './Steps/AddBasicInformation';
import AddIngridiensList from './Steps/AddIngredientsList';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import AddCookingSteps from './Steps/AddCookingSteps';
import AddPhoto from './Steps/AddPhoto';

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
  const stepList = [{id: 0, name: 'Complete the basic information',
    content: <AddBasicInformation onChange={onValueChange}/>},
  {id: 1, name: 'Add a list of ingredients', content: <AddIngridiensList/>},
  {id: 2, name: 'Add steps', content: <AddCookingSteps/>},
  {id: 3, name: 'Add photo', content: <AddPhoto/>}];

  return (
    <BaseLayout>
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
    </BaseLayout>
  );
};
export default RecipeEditScreen;
