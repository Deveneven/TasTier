import {UserDTO} from './UserDTO';
import {IngredientDTO} from './IngredientDTO';
export interface ShoppingListDTO {
  Id: number;
  Name: string;
  Friends: Array<UserDTO>;
  IngredientsList: Array<IngredientDTO>;
}
