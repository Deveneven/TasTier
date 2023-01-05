import {Button, Card, Step, StepLabel, Stepper} from '@mui/material';
import React, {useState} from 'react';
import './RecipeEditScreen.scss';
import AddBasicInformation from './Steps/AddBasicInformation';
import AddIngridiensList from './Steps/AddIngredientsList';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import AddCookingSteps from './Steps/AddCookingSteps';
import AddPhoto from './Steps/AddPhoto';
import {CreateRecipeDTO} from '../../Shared/DTOs/CreateRecipeDTO';
// import {Api} from '../../Utils/Api';

const RecipeEditScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isValid] = useState(true);
  const [newRecipe] = useState<CreateRecipeDTO>({
    name: '',
    difficulty: 1,
    time: '',
    description: '',
    id_cousine: 0,
    priv: true,
    ingredients: [],
    steps: [],
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
    console.log('On Walue Change');
    console.log(`${value} ${name}`);
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
  };
  const submitSteps = async () => {
    console.log('Submit steps');
    const payload = {recipe: {
      name: newRecipe.name,
      difficulty: newRecipe.difficulty,
      time: newRecipe.time,
      description: newRecipe.description,
      id_Cousine: newRecipe.id_cousine,
      priv: newRecipe.priv,
    },
    ingrs: newRecipe.ingredients.map((elem) => {
      console.log(elem);
      return {id_ingredient: elem.id++, amount: elem.amount, id_metric: elem.id_metric};
    }),
    steps: newRecipe.steps.map((elem, index)=> {
      return {step_number: index, stepdesc: elem};
    })};
    console.log(payload);
    // await Api.post(`${process.env.REACT_APP_DB_API}/recipes/add/recipe`, payload).then( (response) => {
    //   console.log('AddRecipeResponse:');
    //   console.log(response);
    //   // if (response.success) setAlert({display: true, text: response.text, type: 'success'});
    //   // else setAlert({display: true, text: response.text, type: 'error'});
    // });
  };
  const stepList = [{id: 0, name: 'Complete the basic information',
    content: <AddBasicInformation onChange={onValueChange} checkIsValid={checkIsValid}/>},
  {id: 1, name: 'Add a list of ingredients',
    content: <AddIngridiensList onChange={onValueChange} checkIsValid={checkIsValid}/>},
  {id: 2, name: 'Add steps', content: <AddCookingSteps onChange={onValueChange}/>},
  {id: 3, name: 'Add photo', content: <AddPhoto onChange={onValueChange}/>}];

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
