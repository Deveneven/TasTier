using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
    public interface IDatabaseService
    {

        public void MakeConnection(string methodQuery);
        public List<Recipe> GetRecipes();
        public List<IngriedientInRecipe> GetIngriedientList(int Id_Recipe);
       // public IEnumerable<Step> GetSteps(int Id_Recipe);
        public int CheckCredidentials(string login,string password);
        public bool Register(string name, string lastname, string password, string email);
        public UserDTO GetUserDTO(int id);
        public IEnumerable<Recipe> GetRecipesDTO();
        public List<String> GetRecipeImages(int Id_Recipe);
        public IEnumerable<ShoppingList> GetShoppingLists(int Id_User);
        public List<string> GetShoppingListUsers(int Id_ShoppingList);
        public List<IngredientInShoppingList> GetIngredientsInShoppingList(int Id_ShoppingList);
        public ShoppingListExtendDTO GetSingleShoppingList(int Id_ShoppingList);
        public IEnumerable<Step> GetSteps(int Id_Recipe);
    }
}
