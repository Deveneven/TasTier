using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
	public class RecipeToShoppingListInsert
	{
		public string id_list { get; set; }
		public List<RecipeToShoppingList> ingredients { get; set; }
	}
}

