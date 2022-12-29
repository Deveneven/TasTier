using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public interface IShoppingListService
	{
        public void MakeConnection(string methodQuery);
        public IEnumerable<ShoppingList> GetShoppingLists(int Id_User);
        public List<string> GetShoppingListUsers(int Id_ShoppingList);
        public List<IngredientInShoppingList> GetIngredientsInShoppingList(int Id_ShoppingList);
        public ShoppingListExtendDTO GetSingleShoppingList(int Id_ShoppingList);
    }
}

