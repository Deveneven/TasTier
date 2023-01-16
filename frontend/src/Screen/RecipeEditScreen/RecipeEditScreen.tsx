import {Button, Card, MobileStepper, Step, StepLabel, Stepper} from '@mui/material';
import React, {useEffect, useState} from 'react';
import './RecipeEditScreen.scss';
import AddBasicInformation from './Steps/AddBasicInformation';
import AddIngridiensList from './Steps/AddIngredientsList';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import AddCookingSteps from './Steps/AddCookingSteps';
import AddPhoto from './Steps/AddPhoto';
import {CreateRecipeDTO} from '../../Shared/DTOs/CreateRecipeDTO';
import {Api} from '../../Utils/Api';
import CustomizableAlert from '../../Shared/Components/Alert/CustomizableAlert';
import {useNavigate} from 'react-router-dom';
import {Box} from '@mui/system';
import MediaQuery from 'react-responsive';

const RecipeEditScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [newRecipe] = useState<CreateRecipeDTO>({
    name: '',
    difficulty: '1',
    time: '',
    description: '',
    id_cousine: 1,
    priv: true,
    ingredients: [],
    steps: [],
    images: [],
    tags: [],
  });
  const results: Array<{name: string, isValid: boolean}> = [];
  const [error, setError] = useState({display: false, text: ''});
  const navigate = useNavigate();

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
    newRecipe[name] = value;
  };
  const checkIsValid = (elem: ({name: string, isValid: boolean})) => {
    const index = results.findIndex((x) => x.name == elem.name);
    if (index !== -1) {
      results[index] = elem;
    } else {
      results.push(elem);
    }
    const isAnyInValid = results.some((x) => x.isValid == false);
    setIsValid(isAnyInValid);
  };
  const submitSteps = async () => {
    const payload = {recipe: {
      name: newRecipe.name,
      difficulty: newRecipe.difficulty,
      time: newRecipe.time,
      description: newRecipe.description,
      id_Cousine: newRecipe.id_cousine,
      priv: newRecipe.priv,
      totalCalories: 0, // dodac obliczanie total calories
    },
    ingrs: newRecipe.ingredients.map((elem) => {
      return {id_ingredient: elem.id, amount: elem.amount, id_metric: elem.unit};
    }),
    steps: newRecipe.steps.map((elem, index)=> {
      return {step_number: index, stepdesc: elem};
    }),
    tags: newRecipe.tags};

    await Api.post(`${process.env.REACT_APP_DB_API}/recipes/add/recipe`, payload).then( (response) => {
      if (response.success) {
        fileUpload(newRecipe.images, response.text);
      } else {
        setError({display: true, text: 'Error Adding Recipe'});
      }
    });
  };

  const fileUpload = (images, id) => {
    // TO DO: dodawanie wszystkich zdjęc
    const formData = new FormData();
    formData.append('file', images[0]);
    formData.append('id_recipe', id);
    Api.postImage(`${process.env.REACT_APP_DB_API}/recipes/add/recipe/images`, formData).then((response) => {
      if (response.success) {
        console.log('Upload images success');
        navigate('/myrecipes');
      } else {
        setError({display: true, text: 'Uploading photo error'});
      }
    });
  };

  const stepList = [{id: 0, name: 'Complete the basic information',
    content: <AddBasicInformation onChange={onValueChange} checkIsValid={checkIsValid}/>},
  {id: 1, name: 'Add a list of ingredients',
    content: <AddIngridiensList onChange={onValueChange} checkIsValid={checkIsValid}/>},
  {id: 2, name: 'Add steps', content: <AddCookingSteps onChange={onValueChange}/>},
  {id: 3, name: 'Add photo', content: <AddPhoto onChange={onValueChange}/>}];

  return (
    <BaseLayout>
      {error.display && (
        <CustomizableAlert setOpen={setError} message={error.text} type={'error'}/>
      )}
      <Card className='create-recipe-card'>
        <MediaQuery maxWidth={800}>
          <Box className='box-step'>
            {setStep(activeStep)}
          </Box>
          <MobileStepper
            variant="text"
            steps={stepList.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                disabled={isValid}
                onClick={activeStep < stepList.length-1 ? setNextStep : submitSteps}>
                {activeStep < stepList.length-1 ? 'Next' : 'Submit'}
              </Button>
            }
            backButton={
              <Button disabled={activeStep < 1}>
                Back
              </Button>
            }
          />
        </MediaQuery>
        <MediaQuery minWidth={800}>
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
            disabled={isValid}
            onClick={activeStep < stepList.length-1 ? setNextStep : submitSteps}>
            {activeStep < stepList.length-1 ? 'Next' : 'Submit'}
          </Button>
        </MediaQuery>
      </Card>
    </BaseLayout>
  );
};
export default RecipeEditScreen;
