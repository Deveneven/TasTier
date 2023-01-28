using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public class ShoppingListService : IShoppingListService
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
                "as sl ON sl.Id_ShoppingList = slu.Id_ShoppingList " +
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
        public int CreateNewListDefinition(string name)
        {
            int id_list = 0;
            MakeConnection("INSERT INTO [dbo].[ShoppingList] OUTPUT inserted.Id_ShoppingList VALUES (@name);");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", name);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id_list = int.Parse(sqlDataReader["Id_ShoppingList"].ToString());
            }
            connectionToDatabase.Close();
            return id_list;
        }
        public int CreateNewShoppingList(string name, int id_user)
        {
            int id_shoppingList = CreateNewListDefinition(name);
            if (id_shoppingList > 0)
            {
                MakeConnection("INSERT INTO [dbo].[ShoppingList_User] OUTPUT inserted.Id_ShoppingList VALUES (@id_shopping,@id_user);");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_shopping", id_shoppingList);
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                   if(int.Parse(sqlDataReader["Id_ShoppingList"].ToString()) == id_shoppingList) {
                        connectionToDatabase.Close();
                        return id_shoppingList; }
                }
            }
            connectionToDatabase.Close();
            return -1;
        }
        public int GetIngredientId(string ingredient)
        {
            int id = 0;
            MakeConnection("SELECT TOP 1 Id_Ingredient FROM [dbo].[Ingredient] WHERE Name = @name");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", ingredient);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id = int.Parse(sqlDataReader["Id_Ingredient"].ToString());
            }
            connectionToDatabase.Close();
            return id;
        }

        public bool AddIngredientToList(string ingredient, int id_list, int id_user,int amount)
        {
            int id_ingr = GetIngredientId(ingredient);
            if (id_ingr > 0)
            {
                MakeConnection("exec [dbo].AddIngrToList @id_ingr = @ingr, @id_list = @list, @id_user = @user, @amount = @amount");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@ingr", id_ingr);
                commandsToDatabase.Parameters.AddWithValue("@list", id_list);
                commandsToDatabase.Parameters.AddWithValue("@user", id_user);
                commandsToDatabase.Parameters.AddWithValue("@amount", amount);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["Ingredient_Id_Ingredient"].ToString()) > 0)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
            }
            return false;
        }
        public int AddFriendToList(string email, int id_list, int id_user)
        {
            int id_friend = GetIdFromEmail(email);
            int result = 0;
            if (id_friend > 0)
            {
                MakeConnection("exec AddFriendToList @id_friend = @friend, @id_list = @list, @id_creator = @user");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@friend", id_friend);
                commandsToDatabase.Parameters.AddWithValue("@list", id_list);
                commandsToDatabase.Parameters.AddWithValue("@user", id_user);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    result = int.Parse(sqlDataReader["Id_User"].ToString());
                }
            }
            
            connectionToDatabase.Close();
            return result; 
        }
        public int GetIdFromEmail (string email)
        {
            int id = 0;
            MakeConnection("SELECT Id_User FROM [dbo].[User] WHERE Email =@email");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@email", email);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id = int.Parse(sqlDataReader["Id_User"].ToString());
            }
            connectionToDatabase.Close();
            return id;
        }
        public bool ChangeAmountOfIngredient (string ingredient, int shoppingList, int user,int amount)
        {
            int id_ingredient = GetIngredientId(ingredient);
            if (id_ingredient > 0)
            {
                MakeConnection("exec UpdateAmount @id_ingr = @ingr, @id_list = @list, @id_creator = @user,@amount = @amount");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@ingr", id_ingredient);
                commandsToDatabase.Parameters.AddWithValue("@list", shoppingList);
                commandsToDatabase.Parameters.AddWithValue("@user", user);
                commandsToDatabase.Parameters.AddWithValue("@amount", amount);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["Ingredient_Id_Ingredient"].ToString()) > 0)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
            }
            connectionToDatabase.Close();
            return false;
        }
        public bool DeleteIngredientFromShoppingList(string ingredient, int shoppingList, int user)
        {
            int id_ingredient = GetIngredientId(ingredient);
            if (id_ingredient > 0)
            {
                MakeConnection("exec [dbo].DeleteIngredient @id_ingr = @ingr, @id_list = @list, @id_creator = @user");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@ingr", id_ingredient);
                commandsToDatabase.Parameters.AddWithValue("@list", shoppingList);
                commandsToDatabase.Parameters.AddWithValue("@user", user);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["Ingredient_Id_Ingredient"].ToString()) > 0)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
            }
            connectionToDatabase.Close();
            return false;
        }
        public int DeleteFriendFromShoppingList(string email, int shoppingList, int user)
        {
            int id_friend = GetIdFromEmail(email);
            if (id_friend > 0)
            {
                MakeConnection("exec [dbo].DeleteFriend @id_friend = @friend, @id_list = @list, @id_creator = @user");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@friend", id_friend);
                commandsToDatabase.Parameters.AddWithValue("@list", shoppingList);
                commandsToDatabase.Parameters.AddWithValue("@user", user);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    int result = int.Parse(sqlDataReader["Id_User"].ToString());
                    if (result > 0) { connectionToDatabase.Close();
                        return result; }
                }
            }
            connectionToDatabase.Close();
            return 0;
        }
        public int DeleteList(int id_list,int id_user)
        {
            int result = 0;
            MakeConnection("EXEC [dbo].DeleteList @id_list = @list, @id_user = @user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@list", id_list);
            commandsToDatabase.Parameters.AddWithValue("@user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                result = int.Parse(sqlDataReader["Id_ShoppingList"].ToString());
            }
            connectionToDatabase.Close();
            return result;
        }
        public int GetUserListIdByName (string name, int id_user)
        {
            int id = 0;
            MakeConnection("SELECT TOP 1 su.Id_ShoppingList FROM [dbo].[ShoppingList_User] as su " +
                "INNER JOIN [dbo].[ShoppingList] as s ON s.Id_ShoppingList = su.Id_ShoppingList " +
                "WHERE su.Id_User = @id_user AND s.Name = @name");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            commandsToDatabase.Parameters.AddWithValue("@name", name);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id = int.Parse(sqlDataReader["Id_ShoppingList"].ToString());
            }
            connectionToDatabase.Close();
            return id;
        }
    }
}

