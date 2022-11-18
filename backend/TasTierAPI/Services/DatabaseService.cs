using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;
using System.Data.SqlClient;


namespace TasTierAPI.Services
{




    public class DatabaseService : IDatabaseService
    {
        private string conURL;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public DatabaseService(IConfiguration configuration)
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

        public IEnumerable<Recipe> GetRecipesDTO()
        {
            List<Recipe> recipes = new List<Recipe>();

            recipes = GetRecipes();

            foreach (Recipe recipe in recipes)
            {
                recipe.Ingredients = GetIngriedientList(recipe.Id);
                recipe.Images = GetRecipeImages(recipe.Id);
            }
            return recipes;
        }
        public List<Recipe> GetRecipes()
        {

            List<Recipe> recipes = new List<Recipe>();
            //Defining method query
            MakeConnection("SELECT Id_Recipe, rec.Name, Difficulty,Description, Time, u.Name as Username, c.Name as Cousine, Date, Rating, Private " +
                "FROM [dbo].[Recipe] AS rec  INNER JOIN [dbo].[User] as u ON rec.User_Id_User = u.Id_User" +
                " INNER JOIN [dbo].[Cousine] as c ON rec.Cousine_Id_Cousine = c.Id_Cousine");

            //Opening the connection to database
            connectionToDatabase.Open();
            //Executing query and assining the results to sql reader
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            //Reading content of the results and assigning values to temporary variable which then is added to result list
            while (sqlDataReader.Read())
            {
                Recipe tmpRecipe = new Recipe()
                {
                    Id = int.Parse(sqlDataReader["Id_Recipe"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Difficulty = int.Parse(sqlDataReader["Difficulty"].ToString()),
                    Description = sqlDataReader["Description"].ToString(),
                    Time = sqlDataReader["Time"].ToString(),
                    Username = sqlDataReader["Username"].ToString(),
                    Cousine = sqlDataReader["Cousine"].ToString(),
                    Date = Convert.ToDateTime(sqlDataReader["Date"].ToString()),
                    Rating = int.Parse(sqlDataReader["Rating"].ToString()),
                    Priv = bool.Parse(sqlDataReader["Private"].ToString())
                };
                recipes.Add(tmpRecipe);

            }
            //Closing the opened connection after reading the result contents and returning the list
            connectionToDatabase.Close();
            return recipes;
        }
        public List<IngriedientInRecipe> GetIngriedientList(int Id_Recipe)
        {
            List<IngriedientInRecipe> ingredientList = new List<IngriedientInRecipe>();
            MakeConnection("SELECT r.Id_Ingredient, r.Name,r.Calories_Per_100g, ri.Amount, md.Name as MetricName, md.WeightPerUnit, ai.Id_Allergen FROM [dbo].[Recipe_Ingredient] as ri" +
            " inner join[dbo].[Ingredient] as r on ri.Ingredient_Id_Ingredient = r.Id_Ingredient" +
            " inner join[dbo].[Metric_Definiton] as md on ri.Id_Metric_Definition = md.Id_Metric_Definiton" +
            " inner join [dbo].[Allergen_Ingredient] as ai on r.Id_Ingredient = ai.Id_Ingredient" +
            " WHERE ri.Recipe_Id_Recipe = @id; ");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_Recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                IngriedientInRecipe ingredient = new IngriedientInRecipe()
                {
                    Id = int.Parse(sqlDataReader["Id_Ingredient"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Calories = (int.Parse(sqlDataReader["WeightPerUnit"].ToString()) * int.Parse(sqlDataReader["Amount"].ToString()) * (int.Parse(sqlDataReader["Calories_Per_100g"].ToString()) / 100)),
                    Allergen = String.IsNullOrEmpty(sqlDataReader["Id_Allergen"].ToString()),
                    Amount = int.Parse(sqlDataReader["Amount"].ToString()),
                    Unit = sqlDataReader["MetricName"].ToString()

                };
                ingredientList.Add(ingredient);
            }
            return ingredientList;

        }
        public IEnumerable<Step> GetSteps(int Id_Recipe)
        {
            List<Step> steps = new List<Step>();
            MakeConnection("SELECT Step_number, Step FROM [dbo].[Step] WHERE Recipe_Id_Recipe =@id;");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_Recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                Step step = new Step()
                {
                    Step_Number = int.Parse(sqlDataReader["Step_Number"].ToString()),
                    StepDesc = sqlDataReader["Step"].ToString()
                };
                steps.Add(step);
            }
            return steps;
        }
        public List<String> GetRecipeImages(int Id_Recipe)
        {
            List<String> images = new List<String>();
            MakeConnection("SELECT url_image FROM [dbo].[Image] WHERE Recipe_Id_Recipe=@id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_Recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                images.Add(sqlDataReader["url_image"].ToString());
            }
            return images;
        }

        public bool CheckCredidentials(string login, string password)
        {

            //TODO Change login to to email for better login experience
            bool exist = false;
            MakeConnection("SELECT Name From [dbo].[User] WHERE Email=@login AND Password = @password");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@login", login);
            commandsToDatabase.Parameters.AddWithValue("@password", password);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                if(login == sqlDataReader["Name"].ToString())
                {
                    connectionToDatabase.Close();
                    return true;
                }
            }
            connectionToDatabase.Close();
            return false;

        }
            
        public bool Register (string name, string lastname, string password, string email)
        {
            bool result = false;
            MakeConnection("exec [dbo].Register  @Name = @imie, @LastName = @nazwisko, @Password = @haslo, @Email = @mail;");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@imie", name);
            commandsToDatabase.Parameters.AddWithValue("@nazwisko", lastname);
            commandsToDatabase.Parameters.AddWithValue("@haslo", password);
            commandsToDatabase.Parameters.AddWithValue("@mail", email);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                result = bool.Parse(sqlDataReader["result"].ToString());
            }
            return result;
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

            return shoppingListExtendDTO;

        }


        //TODO GET SINGLE RECIPE INFO
        //TODO REGISTER - After adding identities to db
        //TODO CREATE SHOPPING LIST / DELETE / DELETE SKLADNIK / ADD SKLADNIK / GET
        //TODO CREATE SHOPPING LIST FROM RECIPE
        //TODO LOGIN VIA FACEBOOK/GOOGLE <- dokumetnacja microsoft
        //TODO AZURE BLOB 

    }
}
