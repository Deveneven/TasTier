using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public interface IRecipeService
	{
        public void MakeConnection(string methodQuery);
        public IEnumerable<Recipe> GetRecipesDTO();
        public List<String> GetRecipeImages(int Id_Recipe);
        public List<Recipe> GetRecipes();
        public List<IngriedientInRecipe> GetIngriedientList(int Id_Recipe);
        public List<Step> GetSteps(int Id_Recipe);
       // public bool AddRecipe();
        public List<string> UploadRecipeImages(IFormFileCollection images);
        public bool AddRecipeImage(string url, int id_recipe);
        public bool AddRecipeImages(List<string> urls, int id_recipe);
        public bool AddRecipeIngredient(IngredientInRecipeInsertDTO ingr, int id_recipe);
        public bool AddRecipeIngredients(List<IngredientInRecipeInsertDTO> ingrs, int id_recipe);
        public List<MetricDefinition> GetMetricDefinitions();
        public int AddRecipeDefinition(RecipeInsertDTO recipe, int id_user);
        //public bool AddRecipe(RecipeInsertDTO recipe, List<IngredientInRecipeInsertDTO> ingrs, IFormFileCollection images, int id_user);
        public int AddRecipe(RecipeInsertDTO recipe, List<IngredientInRecipeInsertDTO> ingrs, List<Step> steps,List<string>tags, int id_user);
        public bool AddRecipeSteps(List<Step> steps, int id_recipe);
        public bool AddRecipeStep(Step step, int id_recipe);
        public bool AddRecipeTag(string tag, int id_recipe);
        public bool AddRecipeTags(List<string> tags, int id_recipe);
        public IEnumerable<Recipe> GetUserRecipesDTO(int id_user);
        public List<Recipe> GetUserRecipes(int id_user);
        public List<Tag> GetTags(int Id_Recipe);
        public IEnumerable<Tag> GetAllTags();
        public bool AddNewTag(string tag);
        public int AddTag(string tag);
        public List<IngredientDTO> GetAllIngredients();
        public int GetFavortiesId(int id_user);
        public bool AddRecipeToFavorites(int id_recipe, int id_user);
        public IEnumerable<Recipe> GetFavoriteRecipesDTO(int id_user);
        public List<Recipe> GetFavoriteRecipes(int id_user);
        public bool DeleteFromFavorites(int id_user, int id_recipe);
        public List<CommentDTO> GetAllCommentsById(int id);
        public List<CommentDTO> AddNewComment(CreateCommentDTO createCommentDTO);
        public bool AddRating(CreateRatingDTO createRatingDTO);
    }
}

