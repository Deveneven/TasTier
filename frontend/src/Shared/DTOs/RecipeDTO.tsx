import {IngredientDTO} from '../DTOs/IngredientDTO';
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
}
