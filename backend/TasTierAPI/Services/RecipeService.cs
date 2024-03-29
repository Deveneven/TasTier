﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Azure.Storage.Blobs;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;

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
        public bool CheckForPrivateAccount(int id_user)
        {
            bool account_private = false;
            MakeConnection("SELECT Private_account from [dbo].[User] WHERE Id_User = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                account_private = bool.Parse(sqlDataReader["Private_account"].ToString());
            }
            return account_private;
        }

        public IEnumerable<Recipe> GetRecipesDTO()
        {
            List<Recipe> recipes = new List<Recipe>();

            recipes = GetRecipes();

            foreach (Recipe recipe in recipes)
            {
                recipe.Ingredients = GetIngriedientList(recipe.Id);
                recipe.Images = GetRecipeImages(recipe.Id);
                recipe.Steps = GetSteps(recipe.Id);
                recipe.Tags = GetTags(recipe.Id);
            }
            connectionToDatabase.Close();
            return recipes;
        }
        public IEnumerable<Recipe> GetUserRecipesDTO(int id_user)
        {
            List<Recipe> recipes = new List<Recipe>();

            recipes = GetUserRecipes(id_user);

            foreach (Recipe recipe in recipes)
            {
                recipe.Ingredients = GetIngriedientList(recipe.Id);
                recipe.Images = GetRecipeImages(recipe.Id);
                recipe.Steps = GetSteps(recipe.Id);
                recipe.Tags = GetTags(recipe.Id);
            }
            connectionToDatabase.Close();
            return recipes;
        }
        public Recipe GetSingleRecipe(int id_recipe)
        {
            Recipe recipe = new Recipe();

            recipe = GetRecipe(id_recipe);

            recipe.Ingredients = GetIngriedientList(recipe.Id);
            recipe.Images = GetRecipeImages(recipe.Id);
            recipe.Steps = GetSteps(recipe.Id);
            recipe.Tags = GetTags(recipe.Id);
            
            connectionToDatabase.Close();
            return recipe;
        }
        public Recipe GetRecipe(int id_recipe)
        {
            Recipe tmpRecipe = new Recipe();
            MakeConnection("SELECT Id_Recipe, rec.Name, Difficulty,Description, Time, u.Name as Username,Avatar, c.Name as Cousine, Date, Rating, Private, Total_Calories, u.Id_User " +
                "FROM [dbo].[Recipe] AS rec  INNER JOIN [dbo].[User] as u ON rec.User_Id_User = u.Id_User" +
                " INNER JOIN [dbo].[Cousine] as c ON rec.Cousine_Id_Cousine = c.Id_Cousine " +
                "WHERE Id_Recipe = @id_recipe");

            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", id_recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var rating = sqlDataReader["Rating"].ToString();
                tmpRecipe = new Recipe()
                {
                    Id =int.Parse(sqlDataReader["Id_Recipe"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Difficulty = int.Parse(sqlDataReader["Difficulty"].ToString()),
                    Description = sqlDataReader["Description"].ToString(),
                    Time = sqlDataReader["Time"].ToString()[0..^3],
                    id_user = int.Parse(sqlDataReader["Id_User"].ToString()),
                    Username = sqlDataReader["Username"].ToString(),
                    Cousine = sqlDataReader["Cousine"].ToString(),
                    Date = Convert.ToDateTime(sqlDataReader["Date"].ToString()),
                    Priv = bool.Parse(sqlDataReader["Private"].ToString()),
                    Avatar = sqlDataReader["Avatar"].ToString(),
                    Total_Calories = sqlDataReader["Total_Calories"].ToString(),
                    Rating = string.IsNullOrEmpty(rating) ? 0 : float.Parse(rating),
                };

            }
            connectionToDatabase.Close();
            return tmpRecipe;
        }

        public List<Recipe> GetRecipes()
        {

            List<Recipe> recipes = new List<Recipe>();
            MakeConnection("SELECT Id_Recipe, rec.Name, Difficulty,Description, Time, u.Name as Username,Avatar, c.Name as Cousine, Date, Rating, Private, Total_Calories, u.Private_account, u.Id_User " +
                "FROM [dbo].[Recipe] AS rec  INNER JOIN [dbo].[User] as u ON rec.User_Id_User = u.Id_User" +
                " INNER JOIN [dbo].[Cousine] as c ON rec.Cousine_Id_Cousine = c.Id_Cousine");
            connectionToDatabase.Open();
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                bool priv = bool.Parse(sqlDataReader["Private_account"].ToString());
                var rating = sqlDataReader["Rating"].ToString();
                Recipe tmpRecipe = new Recipe()
                {
                    Id = int.Parse(sqlDataReader["Id_Recipe"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Difficulty = int.Parse(sqlDataReader["Difficulty"].ToString()),
                    Description = sqlDataReader["Description"].ToString(),
                    Time = sqlDataReader["Time"].ToString()[0..^3],
                    id_user = int.Parse(sqlDataReader["Id_User"].ToString()),
                    Username = sqlDataReader["Username"].ToString(),
                    Cousine = sqlDataReader["Cousine"].ToString(),
                    Date = Convert.ToDateTime(sqlDataReader["Date"].ToString()),
                    Priv = bool.Parse(sqlDataReader["Private"].ToString()),
                    Avatar = sqlDataReader["Avatar"].ToString(),
                    Total_Calories = sqlDataReader["Total_Calories"].ToString(),
                    Rating = string.IsNullOrEmpty(rating) ? 0 : float.Parse(rating),
                };
                if (!priv)
                {
                    recipes.Add(tmpRecipe);
                }

            }
            connectionToDatabase.Close();
            return recipes;
        }
        public List<Recipe> GetUserRecipes(int id_user)
        {

            List<Recipe> recipes = new List<Recipe>();
            MakeConnection("SELECT Id_Recipe, rec.Name, Difficulty,Description, Time, u.Name as Username,Avatar, c.Name as Cousine, Date, Rating, Private, u.Id_User " +
                "FROM [dbo].[Recipe] AS rec  INNER JOIN [dbo].[User] as u ON rec.User_Id_User = u.Id_User" +
                " INNER JOIN [dbo].[Cousine] as c ON rec.Cousine_Id_Cousine = c.Id_Cousine WHERE rec.User_Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                var rating = sqlDataReader["Rating"].ToString();
                Recipe tmpRecipe = new Recipe()
                {
                    Id = int.Parse(sqlDataReader["Id_Recipe"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Difficulty = int.Parse(sqlDataReader["Difficulty"].ToString()),
                    Description = sqlDataReader["Description"].ToString(),
                    Time = sqlDataReader["Time"].ToString()[0..^3],
                    id_user = int.Parse(sqlDataReader["Id_User"].ToString()),
                    Username = sqlDataReader["Username"].ToString(),
                    Cousine = sqlDataReader["Cousine"].ToString(),
                    Date = Convert.ToDateTime(sqlDataReader["Date"].ToString()),
                    Rating = string.IsNullOrEmpty(rating) ? 0 : float.Parse(rating),
                    Priv = bool.Parse(sqlDataReader["Private"].ToString()),
                    Avatar = sqlDataReader["Avatar"].ToString()
                };
                recipes.Add(tmpRecipe);

            }
            connectionToDatabase.Close();
            return recipes;
        }

        public List<IngriedientInRecipe> GetIngriedientList(int Id_Recipe)
        {
            List<IngriedientInRecipe> ingredientList = new List<IngriedientInRecipe>();
            MakeConnection("SELECT r.Id_Ingredient, r.Name,r.Calories_Per_100g, ri.Amount, md.Name as MetricName, md.WeightPerUnit, ai.Id_Allergen, ri.Total_Mass, ii.type FROM [dbo].[Recipe_Ingredient] as ri" +
            " inner join[dbo].[Ingredient] as r on ri.Ingredient_Id_Ingredient = r.Id_Ingredient" +
            " inner join[dbo].[Metric_Definiton] as md on ri.Id_Metric_Definition = md.Id_Metric_Definiton" +
            " inner join [dbo].[Allergen_Ingredient] as ai on r.Id_Ingredient = ai.Id_Ingredient" +
            " inner join [dbo].[Allergen] as ii on ai.Id_Allergen = ii.Id_Allergen" +
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
                    Calories = int.Parse(sqlDataReader["Calories_Per_100g"].ToString()),
                    Amount = int.Parse(sqlDataReader["Amount"].ToString()),
                    Unit = sqlDataReader["MetricName"].ToString(),
                    TotalMass = sqlDataReader["Total_Mass"].ToString(),
                    Id_Allergen = int.Parse(sqlDataReader["Id_Allergen"].ToString()),
                    Allergen_name = sqlDataReader["type"].ToString()
                };
                ingredientList.Add(ingredient);
            }
            connectionToDatabase.Close();
            return ingredientList;

        }

        public List<Step> GetSteps(int Id_Recipe)
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
            connectionToDatabase.Close();
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
            connectionToDatabase.Close();
            return images;
        }
        public List<Tag> GetTags(int Id_Recipe)
        {
            List<Tag> tags = new List<Tag>();
            MakeConnection("Select rc.Id_RecipeCategory, rc.Name FROM [dbo].[Recipe_RecipeCategory] as rr " +
                "inner join [dbo].[RecipeCategory] as rc on rc.Id_RecipeCategory = rr.RecipeCategory_Id_RecipeCategory " +
                "WHERE rr.Recipe_Id_Recipe = @id_recipe;");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", Id_Recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                tags.Add(new Tag()
                {
                    id_tag = int.Parse(sqlDataReader["Id_RecipeCategory"].ToString()),
                    TagName = sqlDataReader["Name"].ToString()
                });
            }
            connectionToDatabase.Close();
            return tags;
        }
        public IEnumerable<Tag> GetAllTags()
        {
            List<Tag> tags = new List<Tag>();
            MakeConnection("SELECT * FROM [dbo].[RecipeCategory]");
            connectionToDatabase.Open();
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                tags.Add(new Tag()
                {
                    id_tag = int.Parse(sqlDataReader["Id_RecipeCategory"].ToString()),
                    TagName = sqlDataReader["Name"].ToString()
                });
            }
            connectionToDatabase.Close();
            return tags;
        }
        public List<string> UploadRecipeImages(IFormFileCollection images)
        {
            List<string> urls = new List<string>();
            string uri = null;
            foreach (IFormFile file in images)
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
        public bool IsRecipeLiked(int id_recipe,int id_user)
        {
            bool isLiked = false;
            MakeConnection("SELECT fl.Id_Favorites FROM [dbo].[FavoriteLIst_Recipe] as flr " +
                "inner join [dbo].[FavoriteList] as fl on flr.FavoriteList_Id_Favorites = fl.Id_Favorites " +
                "WHERE flr.Recipe_Id_Recipe = @id_recipe AND fl.User_Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", id_recipe);
            commandsToDatabase.Parameters.AddWithValue("id_user", id_user);

            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                isLiked = int.Parse(sqlDataReader["Id_Favorites"].ToString()) > 0;
            }
            connectionToDatabase.Close();
            return isLiked;
        }
        public bool DeleteRecipe (int id_recipe,int id_user)
        {
            bool success = false;
            MakeConnection("exec DeleteRecipe @id_user = @user,@id_recipe=@recipe");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@user", id_user);
            commandsToDatabase.Parameters.AddWithValue("@recipe", id_recipe);

            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                success = int.Parse(sqlDataReader["Id_Recipe"].ToString()) > 0;
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
            MakeConnection("exec AddIngrToRecipe @id_recipe = @recipe ,@id_ingredient = @ingr ,@amount = @amnt ,@id_metrics  = @metric;");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@recipe", id_recipe);
            commandsToDatabase.Parameters.AddWithValue("@ingr", ingr.id_ingredient);
            commandsToDatabase.Parameters.AddWithValue("@amnt", (ingr.amount.ToString()));
            commandsToDatabase.Parameters.AddWithValue("metric", ingr.id_metric);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                if (int.Parse(sqlDataReader["Recipe_Id_Recipe"].ToString()) > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;
        }
        public bool AddRecipeIngredients(List<IngredientInRecipeInsertDTO> ingrs, int id_recipe)
        {
            if (ingrs.Count > 0)
            {
                foreach (IngredientInRecipeInsertDTO ingr in ingrs)
                {
                    bool tmp_success = false;
                    tmp_success = AddRecipeIngredient(ingr, id_recipe);
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
            foreach (Step step in steps)
            {
                success = AddRecipeStep(step, id_recipe);
                if (!success) return false;
            }
            return true;

        }
        public int AddTag(string tag)
        {
            int id_tag = 0;
            MakeConnection("exec [dbo].AddTag @name = @name");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", tag.ToLower());
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id_tag = int.Parse(sqlDataReader["Id_RecipeCategory"].ToString());
            }
            connectionToDatabase.Close();
            return id_tag;
        }
        public bool AddRecipeTag(string tag, int id_recipe)
        {
            int id_tag = AddTag(tag);
            if (id_tag > 0)
            {
                MakeConnection("INSERT INTO [dbo].[Recipe_RecipeCategory] output inserted.Recipe_Id_Recipe VALUES (@id_tag, @id_recipe)");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_tag", id_tag);
                commandsToDatabase.Parameters.AddWithValue("@id_recipe", id_recipe);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["Recipe_Id_Recipe"].ToString()).Equals(id_recipe))
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
            }
            connectionToDatabase.Close();
            return false;
        }
        public bool AddRecipeTags(List<string> tags, int id_recipe)
        {
            bool success = false;
            foreach (string tag in tags)
            {
                success = AddRecipeTag(tag, id_recipe);
                if (!success) return false;
            }
            return true;
        }

        public int AddRecipeDefinition(RecipeInsertDTO recipe, int id_user)
        {
            int id_recipe = 0;
            MakeConnection("INSERT INTO [dbo].[Recipe] (Name, Difficulty, Time, Description, User_Id_User, Cousine_Id_Cousine, Date, Private, Total_Calories) "
                + "OUTPUT inserted.Id_Recipe VALUES (@name,@diff,@time,@desc,@id_user,@id_cousine,GETDATE(),@private,@calories);");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", recipe.Name);
            commandsToDatabase.Parameters.AddWithValue("@diff", int.Parse(recipe.Difficulty));
            commandsToDatabase.Parameters.AddWithValue("@time", recipe.Time);
            commandsToDatabase.Parameters.AddWithValue("@desc", recipe.Description);
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            commandsToDatabase.Parameters.AddWithValue("@id_cousine", recipe.Id_Cousine);
            commandsToDatabase.Parameters.AddWithValue("@private", recipe.Priv);
            commandsToDatabase.Parameters.AddWithValue("@calories", recipe.TotalCalories);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id_recipe = int.Parse(sqlDataReader["Id_Recipe"].ToString());
            }
            connectionToDatabase.Close();
            return id_recipe;
        }
        public int AddRecipe(RecipeInsertDTO recipe, List<IngredientInRecipeInsertDTO> ingrs, List<Step> steps, List<string> tags, int id_user)
        {
            int id_recipe = AddRecipeDefinition(recipe, id_user);
            if (id_recipe > 0)
            {
                bool ingredient_success = AddRecipeIngredients(ingrs, id_recipe);
                if (ingredient_success)
                {
                    bool steps_success = AddRecipeSteps(steps, id_recipe);
                    if (steps_success)
                    {
                        bool tags_success = AddRecipeTags(tags, id_recipe);
                        if (tags_success) return id_recipe;
                    }

                }


            }
            return 0;
        }
        public bool AddNewTag(string tag)
        {
            bool success = false;
            MakeConnection("INSERT INTO [dbo].[RecipeCategory] OUTPUT inserted.Id_RecipeCategory VALUES (@tag);");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@tag", tag);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                if (sqlDataReader["Id_RecipeCategory"].ToString().Length > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;
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
        public List<IngredientDTO> GetAllIngredients()
        {
            List<IngredientDTO> ingredientDTOs = new List<IngredientDTO>();
            MakeConnection("SELECT Id_Ingredient,Name FROM [dbo].[Ingredient];");
            connectionToDatabase.Open();
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                IngredientDTO ingredient = new IngredientDTO()
                {
                    id_ingredient = int.Parse(sqlDataReader["Id_Ingredient"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),

                };
                ingredientDTOs.Add(ingredient);
            }
            connectionToDatabase.Close();
            return ingredientDTOs;
        }
        public bool AddRecipeToFavorites(int id_recipe, int id_user)
        {
            bool success = false;
            int id_favorite = GetFavortiesId(id_user);
            MakeConnection("INSERT INTO [dbo].[FavoriteList_Recipe] output inserted.Recipe_Id_Recipe VALUES (@id_favorite,@id_recipe)");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_favorite", id_favorite);
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", id_recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                success = (int.Parse(sqlDataReader["Recipe_Id_Recipe"].ToString()) == id_recipe);
            }
            connectionToDatabase.Close();
            return success;
        }
        public int GetFavortiesId(int id_user)
        {
            int id_favorites = 0;
            MakeConnection("SELECT Id_Favorites FROM [dbo].[FavoriteList] WHERE User_Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id_favorites = int.Parse(sqlDataReader["Id_Favorites"].ToString());
            }
            connectionToDatabase.Close();
            return id_favorites;
        }
        public List<Recipe> GetFavoriteRecipes(int id_user)
        {

            List<Recipe> recipes = new List<Recipe>();
            MakeConnection("SELECT Id_Recipe, rec.Name, Difficulty,Description, Time, u.Name as Username,Avatar, c.Name as Cousine, Date, Rating, Private " +
                "FROM [dbo].[Recipe] AS rec  INNER JOIN [dbo].[User] as u ON rec.User_Id_User = u.Id_User " +
                "INNER JOIN [dbo].[Cousine] as c ON rec.Cousine_Id_Cousine = c.Id_Cousine " +
                "INNER JOIN [dbo].[FavoriteLIst_Recipe] as flr ON flr.Recipe_Id_Recipe = Id_Recipe " +
                "INNER JOIN [dbo].[FavoriteList] as fl ON fl.Id_Favorites = flr.FavoriteList_Id_Favorites " +
                "WHERE fl.User_Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                Recipe tmpRecipe = new Recipe()
                {
                    Id = int.Parse(sqlDataReader["Id_Recipe"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Difficulty = int.Parse(sqlDataReader["Difficulty"].ToString()),
                    Description = sqlDataReader["Description"].ToString(),
                    Time = sqlDataReader["Time"].ToString()[0..^3],
                    Username = sqlDataReader["Username"].ToString(),
                    Cousine = sqlDataReader["Cousine"].ToString(),
                    Date = Convert.ToDateTime(sqlDataReader["Date"].ToString()),
                    Rating = int.Parse(sqlDataReader["Rating"].ToString()),
                    Priv = bool.Parse(sqlDataReader["Private"].ToString()),
                    Avatar = sqlDataReader["Avatar"].ToString()
                };
                recipes.Add(tmpRecipe);
            }
            return recipes;
        }
        public IEnumerable<Recipe> GetFavoriteRecipesDTO(int id_user)
        {
            List<Recipe> recipes = new List<Recipe>();

            recipes = GetFavoriteRecipes(id_user);

            foreach (Recipe recipe in recipes)
            {
                recipe.Ingredients = GetIngriedientList(recipe.Id);
                recipe.Images = GetRecipeImages(recipe.Id);
                recipe.Steps = GetSteps(recipe.Id);
                recipe.Tags = GetTags(recipe.Id);
            }
            connectionToDatabase.Close();
            return recipes;
        }
        public bool DeleteFromFavorites(int id_user, int id_recipe)
        {
            bool success = false;
            int id_fav = GetFavortiesId(id_user);
            MakeConnection("DELETE FROM [dbo].[FavoriteList_Recipe] output deleted.Recipe_Id_Recipe WHERE FavoriteList_Id_Favorites = @fav AND " +
                "Recipe_Id_Recipe = @recipe");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("fav", id_fav);
            commandsToDatabase.Parameters.AddWithValue("@recipe", id_recipe);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                success = (int.Parse(sqlDataReader["Recipe_Id_Recipe"].ToString()) == id_recipe);
            }
            connectionToDatabase.Close();
            return success;
        }


        public List<CommentDTO> GetAllCommentsById(int id)
        {
            List<CommentDTO> commentDTOs = new List<CommentDTO>();
            MakeConnection("SELECT c.Text, u.Name as Username, u.Avatar " +
            "FROM [dbo].[Comment] AS c INNER JOIN [dbo].[User] AS u ON c.Id_User = u.Id_User " +
            "WHERE c.Recipe_Id_Recipe = @id_recipe");

            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_recipe", id);

            using (SqlDataReader reader = commandsToDatabase.ExecuteReader())
            {
                while (reader.Read())
                {
                    CommentDTO tmpRecipe = new CommentDTO()
                    {
                        Text = reader["Text"].ToString(),
                        Avatar = reader["Avatar"].ToString(),
                        UserName = reader["Username"].ToString()
                    };
                    commentDTOs.Add(tmpRecipe);

                }
            }

            connectionToDatabase.Close();
            return commentDTOs;
        }

        public List<CommentDTO> AddNewComment(CreateCommentDTO createCommentDTO)
        {
            MakeConnection("exec [dbo].AddComment @text = @text, @userId = @userId, @recipeId = @recipeId");

            commandsToDatabase.Parameters.AddWithValue("@text", createCommentDTO.Text);
            commandsToDatabase.Parameters.AddWithValue("@userId", createCommentDTO.UserId);
            commandsToDatabase.Parameters.AddWithValue("@recipeId", createCommentDTO.RecipeId);

            try
            {
                connectionToDatabase.Open();
                commandsToDatabase.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                connectionToDatabase.Close();
            }
            return GetAllCommentsById(createCommentDTO.RecipeId);
        }

        public bool AddRating(CreateRatingDTO createRatingDTO)
        {
            MakeConnection("exec [dbo].AddRating @rating = @rating, @userId = @userId, @recipeId = @recipeId");

            commandsToDatabase.Parameters.AddWithValue("@rating", createRatingDTO.Rating);
            commandsToDatabase.Parameters.AddWithValue("@userId", createRatingDTO.UserId);
            commandsToDatabase.Parameters.AddWithValue("@recipeId", createRatingDTO.RecipeId);
            try
            {
                connectionToDatabase.Open();
                commandsToDatabase.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                connectionToDatabase.Close();
            }
            return true;
        }
    }
}

