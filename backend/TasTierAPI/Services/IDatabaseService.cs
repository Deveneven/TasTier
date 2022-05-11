using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
    public interface IDatabaseService
    {
        public IEnumerable<Recipe> GetRecipes();
        public bool CheckCredidentials(string login,string password);
    }
}
