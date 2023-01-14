using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
    public class Recipe
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public int Difficulty { get; set; }
        public string Time { get; set; }
        public List<String> Images { get; set; }
        public string Description { get; set; }
        public string Username { get; set; }
        public string Cousine { get; set; }
        public DateTime Date { get; set; }  
        public float Rating { get; set; }
        public bool Priv { get; set; }
        public List<IngriedientInRecipe> Ingredients { get; set;}
        public List<Step> Steps { get;set; }
        public List<Tag> Tags { get; set; }
        public string Avatar { get; set; }
    }
}
