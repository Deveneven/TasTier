import {Button, Card, Step, StepLabel, Stepper} from '@mui/material';
import React, {useState} from 'react';
import './RecipeEditScreen.scss';
import AddBasicInformation from './Steps/AddBasicInformation';
import AddIngridiensList from './Steps/AddIngredientsList';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import AddCookingSteps from './Steps/AddCookingSteps';
import AddPhoto from './Steps/AddPhoto';
import {CreateRecipeDTO} from '../../Shared/DTOs/CreateRecipeDTO';

const RecipeEditScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isValid] = useState(true);
  const [newRecipe] = useState<CreateRecipeDTO>({
    name: '',
    difficulty: 1,
    time: '',
    description: '',
    images: [],
    id_cousine: 0,
    date: new Date(),
    rating: 0,
    ingredients: [],
    priv: false,
  });
  const results: Array<{name: string, isValid: boolean}> = [];

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
    const {name, value} = !!event.target ? event.target : event;
    // console.log('On Walue Change');
    // console.log(`${type} ${value} ${name}`);
    // console.log(newRecipe);
    newRecipe[name] = value;
    // console.log(newRecipe[name]);
  };
  const checkIsValid = (elem: ({name: string, isValid: boolean})) => {
    const index = results.findIndex((x) => x.name == elem.name);
    if (index !== -1) {
      results[index] = elem;
    } else {
      results.push(elem);
    }
    console.log(results);
  };
  const submitSteps = () => {
    console.log('Submit steps');
    console.log(newRecipe);
  };
  const stepList = [{id: 0, name: 'Complete the basic information',
    content: <AddBasicInformation onChange={onValueChange} checkIsValid={checkIsValid}/>},
  {id: 1, name: 'Add a list of ingredients',
    content: <AddIngridiensList onChange={onValueChange} checkIsValid={checkIsValid}/>},
  {id: 2, name: 'Add steps', content: <AddCookingSteps/>},
  {id: 3, name: 'Add photo', content: <AddPhoto/>}];

  return (
    <BaseLayout>
      <Card className='create-recipe-card'>
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
          disabled={!isValid}
          onClick={activeStep < stepList.length-1 ? setNextStep : submitSteps}>
          {activeStep < stepList.length-1 ? 'Next' : 'Submit'}
        </Button>
      </Card>
    </BaseLayout>
  );
};
export default RecipeEditScreen;
