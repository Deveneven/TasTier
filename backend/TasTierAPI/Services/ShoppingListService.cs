using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public class ShoppingListService
	{
        private string conURL;
        private string blobURL;
        private string containerName;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public ShoppingListService(IConfiguration configuration)
        {
            conURL = configuration.GetConnectionString("TastierDB");
            blobURL = configuration.GetConnectionString("BlobConnectionString"); ;
            containerName = configuration.GetConnectionString("ContainerName"); ;

        }

        public void MakeConnection(string methodQuery)
        {
            connectionToDatabase = new SqlConnection(conURL);
            commandsToDatabase = new SqlCommand();

            commandsToDatabase.Connection = connectionToDatabase;
            commandsToDatabase.CommandText = methodQuery;
        }
        public List<ShoppingList> GetUserLists(int id_user)
        {
            List<ShoppingList> shoppingLists = new List<ShoppingList>();
            MakeConnection("SELECT sl.Id_ShoppingList, sl.Name FROM [dbo].[ShoppingList_User] as slu " +
                "inner join [dbo].[ShoppingList] " +
                "tas sl ON sl.Id_ShoppingList = slu.Id_ShoppingList " +
                "WHERE slu.Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                shoppingLists.Add(new ShoppingList()
                {
                    Id = int.Parse(sqlDataReader["Id_ShoppingList"].ToString()),
                    Name = sqlDataReader["Name"].ToString()
                });
            }
            connectionToDatabase.Close();
            return shoppingLists;
        }
        public ShoppingListExtendDTO GetUserList (int id_list)
        {
            List<IngredientInShoppingList> ingredients = GetIngredientsInShoppingList(id_list);
            List<UserInShoppingList> users = getUsers(id_list);
            ShoppingList listDef = GetListDefinition(id_list);

            ShoppingListExtendDTO lista = new ShoppingListExtendDTO()
            {
                Id = listDef.Id,
                Name = listDef.Name,
                Friends = users,
                IngredientList = ingredients
            };
            return lista;

        }
        public List<IngredientInShoppingList> GetIngredientsInShoppingList (int id_shoppingList)
        {
            List<IngredientInShoppingList> ingredients = new List<IngredientInShoppingList>();
            MakeConnection("SELECT i.Id_Ingredient, i.Name, sli.Amount FROM [dbo].[ShoppingList_Ingredient] as sli " +
                "inner join [dbo].[Ingredient] as i ON i.Id_Ingredient = sli.Ingredient_Id_Ingredient " +
                "WHERE sli.ShoppingList_Id_ShoppingList = @id_shoppingList");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_shoppingList", id_shoppingList);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                ingredients.Add(new IngredientInShoppingList()
                {
                    Id = int.Parse(sqlDataReader["Id_Ingredient"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Amount = int.Parse(sqlDataReader["Amount"].ToString())
                });

            }
            connectionToDatabase.Close();
            return ingredients;
        }
        public List<UserInShoppingList> getUsers(int id_shoppingList)
        {
            List<UserInShoppingList> users = new List<UserInShoppingList>();
            MakeConnection("SELECT u.Id_User, u.Email  FROM [dbo].[ShoppingList_User] as slu " +
                "inner join [dbo].[User] as u ON slu.Id_User = u.Id_User " +
                "WHERE slu.Id_ShoppingList = @id_shoppingList");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("id_shoppingList", id_shoppingList);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                users.Add(new UserInShoppingList()
                {
                    id_user = int.Parse(sqlDataReader["Id_User"].ToString()),
                    email = sqlDataReader["Email"].ToString()
                });
            }
            connectionToDatabase.Close();
            return users;
        }
        public ShoppingList GetListDefinition (int id_shoppingList)
        {
            ShoppingList list = new ShoppingList();
            MakeConnection("SELECT Id_ShoppingList, Name FROM [dbo].[ShoppingList] WHERE Id_ShoppingList = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", id_shoppingList);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                list = new ShoppingList()
                {
                    Id = int.Parse(sqlDataReader["Id_ShoppingList"].ToString()),
                    Name = sqlDataReader["Name"].ToString()
                };
            }
            connectionToDatabase.Close();
            return list;
        }
    }
}

