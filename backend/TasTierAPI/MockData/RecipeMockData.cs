using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.MockData
{
    public class RecipeMockData
    {
        public IEnumerable<Recipe> GetMockRecipes()
        {
            IngriedientInRecipe carrots = new IngriedientInRecipe
            {
                name = "Carrots",
                amount = 10,
                measurment = "grams"
            };
            List<string> steps = new List<string>();
            steps.Add("Add butter");
            steps.Add("Mix butter");
            steps.Add("Cut mixed butter");

            List<string> hashtags = new List<string>();
            hashtags.Add("#healthy");
            hashtags.Add("#easy");

            List<IngriedientInRecipe> ingriedients = new List<IngriedientInRecipe>();
            ingriedients.Add(carrots);

            List<Recipe> recipes = new List<Recipe>();

            Recipe recipe1 = new Recipe
            {
                ingriedientList = ingriedients,
                stepList = steps,
                hashtagsList = hashtags,
                imageUrl = "url1",
                recipeTitle = "recipe1",
                recipeDescription = "Mock recipe number 1"
            };
            Recipe recipe2 = new Recipe
            {
                ingriedientList = ingriedients,
                stepList = steps,
                hashtagsList = hashtags,
                imageUrl = "url2",
                recipeTitle = "recipe2",
                recipeDescription = "Mock recipe number 2"
            };
            Recipe recipe3 = new Recipe
            {
                ingriedientList = ingriedients,
                stepList = steps,
                hashtagsList = hashtags,
                imageUrl = "url3",
                recipeTitle = "recipe3",
                recipeDescription = "Mock recipe number 3"
            };
            Recipe recipe4 = new Recipe
            {
                ingriedientList = ingriedients,
                stepList = steps,
                hashtagsList = hashtags,
                imageUrl = "url4",
                recipeTitle = "recipe4",
                recipeDescription = "Mock recipe number 4"
            };
            Recipe recipe5 = new Recipe
            {
                ingriedientList = ingriedients,
                stepList = steps,
                hashtagsList = hashtags,
                imageUrl = "url5",
                recipeTitle = "recipe5",
                recipeDescription = "Mock recipe number 5"
            };
            recipes.Add(recipe1);
            recipes.Add(recipe2);
            recipes.Add(recipe3);
            recipes.Add(recipe4);
            recipes.Add(recipe5);

            return recipes;
        }
    }
}
