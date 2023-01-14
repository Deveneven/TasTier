using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
	public class RecipeInsertDTO
	{
        public string Name { get; set; }
        public string Difficulty { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public int Id_Cousine { get; set; }
        public bool Priv { get; set; }
        public int TotalCalories { get; set; }
    }
}

