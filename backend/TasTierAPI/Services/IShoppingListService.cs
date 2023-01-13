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

        public int GetIdFromEmail(string email);
        public int AddFriendToList(string email, int id_list, int id_user);
        public bool AddIngredientToList(string ingredient, int id_list, int id_user, int amount);
        public int GetIngredientId(string ingredient);
        public int CreateNewShoppingList(string name, int id_user);
        public int CreateNewListDefinition(string name);
        public bool ChangeAmountOfIngredient(string ingredient, int shoppingList, int user, int amount);
        public int DeleteFriendFromShoppingList(string email, int shoppingList, int user);
        public bool DeleteIngredientFromShoppingList(string ingredient, int shoppingList, int user);
        public int DeleteList(int id_list, int id_user);
        public int GetUserListIdByName(string name, int id_user);
    }
}

