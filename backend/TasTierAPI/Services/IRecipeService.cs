using System;
using System.Collections.Generic;
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
        public IEnumerable<Step> GetSteps(int Id_Recipe);
        public IEnumerable<CommentDTO> GetComments(int Id_Recipe);
        public bool AddComment(Comment comment, int id_user);
    }
}

