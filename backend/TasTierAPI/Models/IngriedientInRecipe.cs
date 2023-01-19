using System;
namespace TasTierAPI.Models
{
    public class IngriedientInRecipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Calories { get; set; }
        public double Amount { get; set; }
        public string Unit { get; set; }
        public string TotalMass { get; set; }
        public int Id_Allergen { get; set; }
        public string Allergen_name { get; set; }
    }
}
