export interface IngredientDTO {
  id: number,
  name: string,
  calories: number,
  allergen: boolean,
  amount: number,
  unit: string|number,
  allergen_name?: string,
}
