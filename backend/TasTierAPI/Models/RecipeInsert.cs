using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
	public class RecipeInsert
	{
		public RecipeInsertDTO recipe { get; set; }
		public List<IngredientInRecipeInsertDTO> ingrs { get; set; }
		public List<Step> steps { get; set; }
		public List<string> tags { get; set; }
 	}
}

