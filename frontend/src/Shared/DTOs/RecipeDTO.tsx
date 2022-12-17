import {IngredientDTO} from '../DTOs/IngredientDTO';
export interface RecipeDTO {
  Id: number,
  Name: string,
  Difficulty: number,
  Time: string,
  Images: Array<string>,
  Description: string,
  Username: string,
  Cousine: string,
  Date: Date,
  Rating: number,
  Ingredients: Array<IngredientDTO>,
}
