using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
    public class Recipe
    {
        public List<IngriedientInRecipe> ingriedientList { get; set; }
        public List<string> stepList { get; set; }
        public List<string> hashtagsList { get; set; }
        public string imageUrl { get; set; }
        public string recipeTitle { get; set; }
        public string recipeDescription { get; set; }
    }
}
