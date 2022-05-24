import UserDTO from '../DTOs/UserDTO';

export interface RecipeDTO {
  Name: string,
  Difficulty: number,
  Time: string,
  Image: string,
  Description: string,
  User: UserDTO,
  //Cousine: CousineDTO,
  Date: Date,
  Rating: number
}