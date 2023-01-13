using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
	public class RecipeToShoppingListInsert
	{
		public string list_name { get; set; }
		public List<IngriedientInRecipe> ingredients { get; set; }
	}
}

