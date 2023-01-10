using System;
namespace TasTierAPI.Models
{
    public class IngriedientInRecipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public bool Allergen { get; set; }
        public double Amount { get; set; }
        public string Unit { get; set; }
    }
}
