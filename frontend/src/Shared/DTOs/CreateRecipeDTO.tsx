import {IngredientDTO} from '../DTOs/IngredientDTO';
import {StepDTO} from './StepDTO';
export interface CreateRecipeDTO {
  name: string,
  difficulty: number,
  time: string,
  description: string,
  id_cousine: number,
  priv: boolean,
  ingredients: Array<IngredientDTO>,
  steps: Array<StepDTO>,
}
