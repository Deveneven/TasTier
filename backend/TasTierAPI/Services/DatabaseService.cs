using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace TasTierAPI.Services
{
    public class DatabaseService:IDatabaseService
    {
        string connectionUrl;
        private SqlCommand commandsToDatabase;
        private SqlConnection connectionToDatabase;


        public DatabaseService(IConfiguration configuration)
        {
            //Getting credidentials for MSSQL Database
            connectionUrl = configuration.GetConnectionString("TastierDB");
        }
        public void MakeConnection(string methodQuery)
        {
            //Connecting with the database using creds from configuration file
            connectionToDatabase = new SqlConnection(connectionUrl);
            commandsToDatabase = new SqlCommand();

            //Adding assembled connection and a query for execution
            commandsToDatabase.Connection = connectionToDatabase;
            commandsToDatabase.CommandText = methodQuery;
        }

        public IEnumerable<Recipe> GetRecipes()
        {
            List<Recipe> recipes = new List<Recipe>();
            //Defining method query
            MakeConnection("SELECT Id_Recipe, rec.Name, Difficulty, Time, u.Name as Username, c.Name as Cousine, Date, Rating, Priv " +
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
                            Difficulty  = int.Parse(sqlDataReader["Difficulty"].ToString()),
                            Time = sqlDataReader["Time"].ToString(),
                            Username = sqlDataReader["Username"].ToString(),
                            Cousine = sqlDataReader["Cousine"].ToString(),
                            Date = Convert.ToDateTime(sqlDataReader["Date"].ToString()),
                            Rating = int.Parse(sqlDataReader["Rating"].ToString()),
                            Priv = bool.Parse(sqlDataReader["Priv"].ToString())
                };
                recipes.Add(tmpRecipe);

            }
            //Closing the opened connection after reading the result contents and returning the list
            connectionToDatabase.Close();
            return recipes;
        }
        public IEnumerable<IngriedientInRecipe> GetIngriedientList(int Id_Recipe)
        {
            List<IngriedientInRecipe> ingredientList = new List<IngriedientInRecipe>();
            MakeConnection("SELECT r.Name, ri.Amount, ri.Metric FROM [dbo].[Recipe_Ingredient] as ri " +
                "inner join [dbo].[Ingredient] as r on ri.Ingredient_Id_Ingredient = r.Id_Ingredient " +
                "WHERE ri.Recipe_Id_Recipe = @id;");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_Recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                IngriedientInRecipe ingredient = new IngriedientInRecipe()
                {
                    Name = sqlDataReader["Name"].ToString(),
                    Amount = int.Parse(sqlDataReader["Amount"].ToString()),
                    Metric = sqlDataReader["Metric"].ToString()

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
        public string GetRecipeImage(int Id_Recipe)
        {
            string image_url = "";
            MakeConnection("SELECT url_image FROM [dbo].[Image] WHERE Recipe_Id_Recipe=@id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", Id_Recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                image_url = sqlDataReader["url_image"].ToString();
            }
            return image_url;
        }

        public bool CheckCredidentials(string login, string password)
        {
            //TODO Change login to to email for better login experience
            bool exist = false;
            MakeConnection("SELECT Name From [dbo].[User] WHERE Name=@login AND Password = @password");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@login", login);
            commandsToDatabase.Parameters.AddWithValue("@password", password);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                if (sqlDataReader["Name"] != null)
                {
                    exist = true;
                }
            }
            connectionToDatabase.Close();
            return exist;
        }


        //TODO GET SINGLE RECIPE INFO
        //TODO REGISTER - After adding identities to db
        //TODO CREATE SHOPPING LIST / DELETE / DELETE SKLADNIK / ADD SKLADNIK / GET
        //TODO CREATE SHOPPING LIST FROM RECIPE
    }
}
