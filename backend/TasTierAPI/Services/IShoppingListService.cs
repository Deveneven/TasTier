using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public interface IShoppingListService
	{
        public void MakeConnection(string methodQuery);
        public List<ShoppingList> GetUserLists(int id_user);
        public ShoppingListExtendDTO GetUserList(int id_list);
        public List<IngredientInShoppingList> GetIngredientsInShoppingList(int id_shoppingList);
        public List<UserInShoppingList> getUsers(int id_shoppingList);
        public ShoppingList GetListDefinition(int id_shoppingList);


    }
}

