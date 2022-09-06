import {UserDTO} from '../DTOs/UserDTO';

export interface ShoppingListDTO {
  Id: number;
  Name: string;
  Friends: Array<UserDTO>;
  // IngridientsList : Array<IngridientDTO>;
}
