﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Azure.Storage.Blobs;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;
using static System.Net.Mime.MediaTypeNames;
using System.Security.Policy;

namespace TasTierAPI.Services
{
	public class RecipeService : IRecipeService
	{
        private string conURL;
        private string blobURL;
        private string containerName;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public RecipeService(IConfiguration configuration)
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
        public List<string> UploadRecipeImages(IFormFileCollection images)
        {
            List<string> urls = new List<string>();
            string uri = null;
            foreach(IFormFile file in images)
            if (!file.Equals(null))
            {
                BlobContainerClient blobContainerClient = new BlobContainerClient(blobURL, containerName);
                string fileName = "";
                fileName = !file.FileName.Equals(null) ? file.FileName : "unknown";
                BlobClient blobClient = blobContainerClient.GetBlobClient(fileName);

                var ms = new MemoryStream();
                file.CopyTo(ms);
                var bytes = ms.ToArray();

                BinaryData binaryData = new BinaryData(bytes);

                blobClient.Upload(binaryData, true);

                uri = blobClient.Uri.AbsoluteUri;
                urls.Add(uri);

                ms.Close();
            }
            return urls;
        }
        public bool AddRecipeImage(string url, int id_recipe)
        {
            bool success = false;
            MakeConnection("INSERT INTO [dbo].[Image] OUTPUT inserted.Recipe_Id_Recipe VALUES (@id_recipe,@url);");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", id_recipe);
            commandsToDatabase.Parameters.AddWithValue("@url", url);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                if (int.Parse(sqlDataReader["Recipe_Id_Recipe"].ToString()) > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;

        }
        public bool AddRecipeImages(List<string> urls, int id_recipe)
        {
            if (urls.Count > 0)
             {
               foreach (string url in urls)
                {
                 bool tmp_success = false;
                 tmp_success = AddRecipeImage(url, id_recipe);
                 if (!tmp_success) return false;
                 }
                return true;
                }
            return false;
        }
        public bool AddRecipeIngredient(IngredientInRecipeInsertDTO ingr, int id_recipe)
        {
            bool success = false;
            MakeConnection("INSERT INTO [dbo].[Recipe_Ingredient] OUTPUT inserted.Recipe_Id_Recipe VALUES (@id_recipe,@id_ingredient,@amount,@id_metrics);");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", id_recipe);
            commandsToDatabase.Parameters.AddWithValue("@id_ingredient", ingr.id_ingredient);
            commandsToDatabase.Parameters.AddWithValue("@amount", (ingr.amount.ToString()));
            commandsToDatabase.Parameters.AddWithValue("id_metrics", ingr.id_metric);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                if (int.Parse(sqlDataReader["Recipe_Id_Recipe"].ToString()) > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;
        }
        public bool AddRecipeIngredients(List<IngredientInRecipeInsertDTO> ingrs,int id_recipe)
        {
            if (ingrs.Count > 0)
            {
                foreach (IngredientInRecipeInsertDTO ingr in ingrs)
                {
                    bool tmp_success = false;
                    tmp_success = AddRecipeIngredient(ingr,id_recipe);
                    if (!tmp_success) return false;
                }
                return true;
            }
            return false;
        }
        public bool AddRecipeStep(Step step, int id_recipe)
        {
            bool success = false;
            MakeConnection("INSERT INTO [dbo].[Step] OUTPUT inserted.Recipe_Id_Recipe VALUES (@step_number,@step,@id_recipe);");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@step_number", step.Step_Number);
            commandsToDatabase.Parameters.AddWithValue("@step", step.StepDesc);
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", id_recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                if (int.Parse(sqlDataReader["Recipe_Id_Recipe"].ToString()).Equals(id_recipe)) success = true;
            }
            connectionToDatabase.Close();
            return success;

        }
        public bool AddRecipeSteps(List<Step> steps, int id_recipe)
        {
            bool success = false;
            foreach(Step step in steps)
            {
                success = AddRecipeStep(step, id_recipe);
                if (!success) return false;
            }
            return true;
        }
        public int AddRecipeDefinition(RecipeInsertDTO recipe, int id_user)
        {
            int id_recipe = 0;
            MakeConnection("INSERT INTO [dbo].[Recipe] OUTPUT inserted.Id_Recipe VALUES (@name,@diff,@time,@desc,@id_user,@id_cousine,GETDATE(),0,@private);");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", recipe.Name);
            commandsToDatabase.Parameters.AddWithValue("@diff", int.Parse(recipe.Difficulty));
            commandsToDatabase.Parameters.AddWithValue("@time", recipe.Time);
            commandsToDatabase.Parameters.AddWithValue("desc", recipe.Description);
            commandsToDatabase.Parameters.AddWithValue("id_user", id_user);
            commandsToDatabase.Parameters.AddWithValue("id_cousine", recipe.Id_Cousine);
            commandsToDatabase.Parameters.AddWithValue("private", recipe.Priv);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id_recipe = int.Parse(sqlDataReader["Id_Recipe"].ToString());
            }
            connectionToDatabase.Close();
            return id_recipe;
        }

        //public bool AddRecipe(RecipeInsertDTO recipe, List<IngredientInRecipeInsertDTO> ingrs, IFormFileCollection images, int id_user)
        public int AddRecipe(RecipeInsertDTO recipe,List<IngredientInRecipeInsertDTO> ingrs,List<Step> steps, int id_user)
        {
            int id_recipe = AddRecipeDefinition(recipe,id_user);
            if (id_recipe > 0)
            {
                bool ingredient_success = AddRecipeIngredients(ingrs,id_recipe);
                if (ingredient_success)
                {
                    bool steps_success = AddRecipeSteps(steps, id_recipe);
                    if (steps_success) return id_recipe;

                }
                    /*
                {
                    List<string> urls = UploadRecipeImages(images);
                    bool images_success = AddRecipeImages(urls,id_recipe);
                    if (images_success) return true;
                    return false;
                }
                return false;*/

            }
            return 0;
        }
        public List<MetricDefinition> GetMetricDefinitions()
        {
            List<MetricDefinition> metricDefinitions = new List<MetricDefinition>();
            MakeConnection("SELECT Id_Metric_Definiton,Name,WeightPerUnit FROM [dbo].[Metric_Definiton];");
            connectionToDatabase.Open();
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                MetricDefinition definition = new MetricDefinition()
                {
                    id = int.Parse(sqlDataReader["Id_Metric_Definiton"].ToString()),
                    name = sqlDataReader["Name"].ToString(),
                    weightPerUnit = int.Parse(sqlDataReader["WeightPerUnit"].ToString())
                };
                metricDefinitions.Add(definition);
            }
            connectionToDatabase.Close();
            return metricDefinitions;
        }
    }
}
