using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public class ShoppingListService : IShoppingListService
	{
        private string conURL;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public ShoppingListService(IConfiguration configuration)
        {
            conURL = configuration.GetConnectionString("TastierDB");
        }


        public void MakeConnection(string methodQuery)
        {
            connectionToDatabase = new SqlConnection(conURL);
            commandsToDatabase = new SqlCommand();

            commandsToDatabase.Connection = connectionToDatabase;
            commandsToDatabase.CommandText = methodQuery;
        }

        public List<IngredientInShoppingList> GetIngredientsInShoppingList(int Id_ShoppingList)
        {
            List<IngredientInShoppingList> ingredients = new List<IngredientInShoppingList>();
            MakeConnection("SELECT r.Id_Ingredient, r.Name, ri.Amount, ai.Id_Allergen FROM [dbo].[ShoppingList_Ingredient] as ri" +
            " inner join[dbo].[Ingredient] as r on ri.Ingredient_Id_Ingredient = r.Id_Ingredient" +
            " inner join[dbo].[Allergen_Ingredient] as ai on r.Id_Ingredient = ai.Id_Ingredient" +
            " WHERE ri.ShoppingList_Id_ShoppingList = @id; ");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_ShoppingList);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                IngredientInShoppingList ing = new IngredientInShoppingList()
                {
                    Id = int.Parse(sqlDataReader["Id_Ingredient"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Amount = int.Parse(sqlDataReader["Amount"].ToString()),
                    Allergen = string.IsNullOrEmpty(sqlDataReader["Id_Allergen"].ToString())
                };
                ingredients.Add(ing);
            }
            connectionToDatabase.Close();
            return ingredients;
        }

        public List<string> GetShoppingListUsers(int Id_ShoppingList)
        {
            List<string> users = new List<string>();
            MakeConnection("SELECT Nickname from [dbo].[ShoppingList_User] as s" +
            " inner join[dbo].[User] as u on s.Id_User = u.Id_User" +
            " WHERE s.Id_ShoppingList = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_ShoppingList);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                users.Add(sqlDataReader["Nickname"].ToString());
            }
            connectionToDatabase.Close();
            return users;
        }

        public IEnumerable<ShoppingList> GetShoppingLists(int Id_User)
        {
            List<ShoppingList> lists = new List<ShoppingList>();
            MakeConnection("SELECT sl.Id_ShoppingList, Name FROM [dbo].[ShoppingList_User] as su" +
            " inner join[dbo].[ShoppingList] as sl ON su.Id_ShoppingList = sl.Id_ShoppingList" +
            " WHERE su.Id_User = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_User);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                ShoppingList list = new ShoppingList()
                {
                    Id = int.Parse(sqlDataReader["Id_ShoppingList"].ToString()),
                    Name = sqlDataReader["Name"].ToString()
                };
                lists.Add(list);
            }
            connectionToDatabase.Close();
            return lists;
        }

        public ShoppingListExtendDTO GetSingleShoppingList(int Id_ShoppingList)
        {
            ShoppingListExtendDTO shoppingListExtendDTO = new ShoppingListExtendDTO();
            MakeConnection("SELECT Id_ShoppingList, Name FROM [dbo].[ShoppingList] WHERE Id_ShoppingList = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_ShoppingList);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {

                {
                    shoppingListExtendDTO.Id = int.Parse(sqlDataReader["Id_ShoppingList"].ToString());
                    shoppingListExtendDTO.Name = sqlDataReader["Name"].ToString();
                };
            }
            shoppingListExtendDTO.Friends = GetShoppingListUsers(Id_ShoppingList);
            shoppingListExtendDTO.IngredientList = GetIngredientsInShoppingList(Id_ShoppingList);
            connectionToDatabase.Close();
            return shoppingListExtendDTO;

        }
    }
}

