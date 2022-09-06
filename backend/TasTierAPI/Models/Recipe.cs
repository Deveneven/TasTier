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
        public string Username { get; set; }
        public string Cousine { get; set; }
        public DateTime Date { get; set; }  
        public int Rating { get; set; }
        public bool Priv { get; set; }
    }
}
