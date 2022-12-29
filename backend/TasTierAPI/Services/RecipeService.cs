using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Xml.Linq;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;
using static System.Net.Mime.MediaTypeNames;

namespace TasTierAPI.Services
{
	public class RecipeService : IRecipeService
	{
        private string conURL;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public RecipeService(IConfiguration configuration)
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
            MakeConnection("SELECT Id_Recipe, rec.Name, Difficulty,Description, Time, u.Name as Username,Avatar, c.Name as Cousine, Date, Rating, Private " +
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
                    Priv = bool.Parse(sqlDataReader["Private"].ToString()),
                    Avatar = sqlDataReader["Avatar"].ToString()
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
        public IEnumerable<CommentDTO> GetComments(int Id_Recipe)
        {
            List<CommentDTO> comments = new List<CommentDTO>();
            MakeConnection("SELECT u.Id_User, u.Email, u.Avatar, c.Id_Comment, c.Rating, c.Image, c.Text FROM [dbo].[Recipe] as r " +
                "INNER JOIN [dbo].[Comment] as c on r.Id_Recipe = c.Recipe_Id_Recipe " +
                "INNER JOIN [dbo].[User] as u on c.Id_User = u.Id_User WHERE Id_Recipe = @id_recipe");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", Id_Recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                comments.Add(new CommentDTO()
                {
                    id_user = int.Parse(sqlDataReader["Id_User"].ToString()),
                    username = sqlDataReader["Email"].ToString(),
                    avatar = sqlDataReader["Avatar"].ToString(),
                    id_comment = int.Parse(sqlDataReader["Id_Comment"].ToString()),
                    rating = int.Parse(sqlDataReader["Rating"].ToString()),
                    image = sqlDataReader["Image"].ToString(),
                    text = sqlDataReader["Text"].ToString()

                });
            }
            connectionToDatabase.Close();
            return comments;
        }
        public bool AddComment(Comment comment, int id_user)
        {
            bool success = false;
            MakeConnection("INSERT INTO [dbo].[Comment] OUTPUT inserted.Id_Comment VALUES (@recipe_id,@rating,@image,@text,@id_user)");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@recipe_id", comment.id_recipe);
            commandsToDatabase.Parameters.AddWithValue("@rating", comment.rating);
            commandsToDatabase.Parameters.AddWithValue("@image", comment.image);
            commandsToDatabase.Parameters.AddWithValue("@text", comment.text);
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                if (int.Parse(sqlDataReader["Id_Comment"].ToString()) > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;
        }
    }
}

