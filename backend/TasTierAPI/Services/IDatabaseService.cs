using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
    public interface IDatabaseService
    {
        public void MakeConnection(string methodQuery);
        public IEnumerable<Recipe> GetRecipes();
        public IEnumerable<IngriedientInRecipe> GetIngriedientList(int Id_Recipe);
        public string GetRecipeImage(int Id_Recipe);
        public IEnumerable<Step> GetSteps(int Id_Recipe);
        public bool CheckCredidentials(string login,string password);
    }
}
