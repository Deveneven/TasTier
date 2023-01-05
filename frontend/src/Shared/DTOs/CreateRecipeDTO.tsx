import {IngredientDTO} from '../DTOs/IngredientDTO';
export interface CreateRecipeDTO {
  name: string,
  difficulty: number,
  time: string,
  description: string,
  images: Array<string>,
  id_cousine: number,
  date: Date,
  rating: number,
  ingredients: Array<IngredientDTO>,
  priv: boolean
}
