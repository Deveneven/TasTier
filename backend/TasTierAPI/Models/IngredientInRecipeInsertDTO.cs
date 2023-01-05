using System;
namespace TasTierAPI.Models
{
	public class IngredientInRecipeInsertDTO
	{
		public int id_ingredient { get; set; }
        public int amount { get; set; }
        public int id_metric { get; set; }
	}
}

