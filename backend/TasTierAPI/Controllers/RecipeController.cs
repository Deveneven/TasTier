using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using TasTierAPI.Models;
using TasTierAPI.Services;

namespace TasTierAPI.Controllers
{
    [ApiController]
    [Route("api/recipes")]
    public class RecipeController:ControllerBase
    {
        private IRecipeService _dbService;

        public RecipeController (IRecipeService dbService)
        {
            _dbService = dbService;
        }

        [Route("get/recipes")]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_dbService.GetRecipesDTO());
        }
        [Route("get/ingredients")]
        [HttpGet]
        public IActionResult GetIngredientList(int Id_Recipe)
        {
            return Ok(_dbService.GetIngriedientList(Id_Recipe));
        }
        [Route("get/steps")]
        [HttpGet]
        public IActionResult GetSteps(int Id_Recipe)
        {
            return Ok(_dbService.GetSteps(Id_Recipe));
        }
        [Route("get/metrics")]
        [HttpGet]
        public IActionResult GetMetricDefinitions()
        {
            return Ok(_dbService.GetMetricDefinitions());
        }
        [Authorize]
        [Route("add/recipe")]
        [HttpPost]
        public IActionResult AddRecipe([FromBody] RecipeInsert recipeInsert)
        {
            int id_recipe = 0;
            var jwtt = Request.Headers[HeaderNames.Authorization].ToString();
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
            int id = int.Parse(idd);
          //  if (Request.HasFormContentType)
          //  {
                id_recipe = _dbService.AddRecipe(recipeInsert.recipe, recipeInsert.ingrs, recipeInsert.steps,id);
                if (id_recipe>0)
                {
                    return Ok(id_recipe);

                }
                return BadRequest("Something went wrong");

        //    }

       //     return BadRequest("Missing from content");
        }

        [HttpPost]
        [Route("add/recipe/images")]
        public IActionResult AddRecipeImages()
        {
            if (Request.HasFormContentType)
            {
                List<string> url = _dbService.UploadRecipeImages(Request.Form.Files);
                if (url.Count > 0)
                {
                    int id_recipe = int.Parse(Request.Form["id_recipe"].ToString());
                    if (id_recipe > 0)
                    {
                        bool success = _dbService.AddRecipeImages(url, id_recipe);
                        if (success) return Ok("Successfuly uploaded images for the recipe");
                    }
                    return BadRequest("Could not find recipe with passed id");
                }
                return BadRequest("No images were attached");
            }
            return BadRequest("Request doesnt have form content");
        }
    }
}
