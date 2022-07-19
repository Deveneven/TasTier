import {UserDTO} from '../DTOs/UserDTO';
import {IngredientDTO} from '../DTOs/IngredientDTO';
export interface RecipeDTO {
  Id: number,
  Name: string,
  Difficulty: number,
  Time: string,
  Image: string,
  Description: string,
  User: UserDTO,
  // Cousine: CousineDTO,
  Date: Date,
  Rating: number,
  Ingredients: Array<IngredientDTO>,
}
