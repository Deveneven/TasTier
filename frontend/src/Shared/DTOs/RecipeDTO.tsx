import {IngredientDTO} from '../DTOs/IngredientDTO';
import {StepDTO} from './StepDTO';
import {TagDTO} from './TagDTO';
export interface RecipeDTO {
  id: number,
  name: string,
  difficulty: number,
  time: string,
  images: Array<string>,
  description: string,
  username: string,
  cousine: string,
  date: string,
  rating: number,
  priv: boolean,
  ingredients: Array<IngredientDTO>,
  avatar: string,
  tags: Array<TagDTO>,
  steps: Array<StepDTO>
  id_user: number,
  liked : boolean,
}
