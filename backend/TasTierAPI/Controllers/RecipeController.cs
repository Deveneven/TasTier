using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        private IHttpContextAccessor HttpContextAccessor { get; set; }

        public RecipeController (IRecipeService dbService, IHttpContextAccessor httpContext)
        {
            _dbService = dbService;
            HttpContextAccessor = httpContext;
        }

        [Route("get/recipes")]
        [HttpGet]
        public IActionResult Get()
        {
            var jwtt = Request.Headers[HeaderNames.Authorization].ToString();
            if (!jwtt.Contains("Bearer"))
            {
                IEnumerable<Recipe> result = _dbService.GetRecipesDTO();
                if (result.Count() > 0)
                {
                    return Ok(_dbService.GetRecipesDTO());
                }
                return BadRequest("Something went wrong");
            }
            else
            {
                var jwt = jwtt.Replace("Bearer ", "");
                var handler = new JwtSecurityTokenHandler();
                var securityToken = handler.ReadJwtToken(jwt);
                var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
                int id = int.Parse(idd);
                IEnumerable<Recipe> result = _dbService.GetRecipesDTO();
                if (result.Count() > 0)
                {
                    foreach(Recipe recipe in result)
                    {
                        recipe.isLiked = _dbService.IsRecipeLiked(recipe.Id,id);
                    }
                    return Ok(result);
                }
                return BadRequest("Something went wrong");
            }

        }
        [Route("get/user/recipes")]
        [HttpGet]
        public IActionResult GetUserRecipes()
        {
            var jwtt = Request.Headers[HeaderNames.Authorization].ToString();
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
            int id = int.Parse(idd);

            return Ok(_dbService.GetUserRecipesDTO(id));
        }
        [Route("get/friend/recipes")]
        [HttpGet]
        public IActionResult GetFriendRecipes(int id_friend)
        {
            if (!_dbService.CheckForPrivateAccount(id_friend))
            {
                return Ok(_dbService.GetUserRecipesDTO(id_friend));
            }

            return Unauthorized("User's account is private");
                
        }
        [Route("get/recipe")]
        [HttpGet]
        public IActionResult GetSingleRecipe(int id_recipe)
        {
            return Ok(_dbService.GetSingleRecipe(id_recipe));
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
        [Route("get/tags")]
        [HttpGet]
        public IActionResult GetTags()
        {
            return Ok(_dbService.GetAllTags());
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
            var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
            int id = int.Parse(idd);
          //  if (Request.HasFormContentType)
          //  {
                id_recipe = _dbService.AddRecipe(recipeInsert.recipe, recipeInsert.ingrs, recipeInsert.steps,recipeInsert.tags,id);
                if (id_recipe>0)
                {
                    return Ok(id_recipe);

                }
                return BadRequest("Something went wrong");

        //    }

       //     return BadRequest("Missing from content");
        }
        [Authorize]
        [Route("delete/recipe")]
        [HttpDelete]
        public IActionResult DeleteRecipe([FromBody] int id_recipe)
        {
            var jwtt = Request.Headers[HeaderNames.Authorization].ToString();
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
            int id = int.Parse(idd);

            bool success = _dbService.DeleteRecipe(id_recipe, id);
            if (success) { return Ok("Successfuly deleted recipe"); }
            return BadRequest("Could not delete recipe");
        }
        [Authorize]
        [Route("add/tag")]
        [HttpPost]
        public IActionResult AddTag([FromBody] string tag)
        {
            bool success = _dbService.AddNewTag(tag);
            if (success) { return Ok("Successfuly added new tag"); }
            return BadRequest("Something went wrong");
        }

        [HttpPost]
        [Route("add/recipe/images")]
        public IActionResult AddRecipeImages()
        {
            if (Request.HasFormContentType)
            {

                int id_recipe = int.Parse(Request.Form["id_recipe"].ToString());

                List<string> url = _dbService.UploadRecipeImages(Request.Form.Files);
                if (id_recipe > 0)
                {
                    if (url.Count > 0)
                    {
                        bool success = _dbService.AddRecipeImages(url, id_recipe);
                        if (success) return Ok("Successfuly uploaded images for the recipe");
                    }
                    else
                    {
                        string default_image = "https://tastierblobstorage.blob.core.windows.net/images/no_photo.jpg";
                        bool success = _dbService.AddRecipeImage(default_image, id_recipe);
                        if (success) return Ok("Successfuly uploaded images for the recipe");
                    }
                }
                return Ok("Could not find passed recipe");
            }
            return BadRequest("Request doesnt have form content");
        }
        [HttpGet]
        [Route("get/ingredients/all")]
        public IActionResult GetAllIngredients()
        {
            return Ok(_dbService.GetAllIngredients());
        }
        [HttpPost]
        [Route("add/recipe/favorites")]
        public IActionResult AddRecipeToFavorites([FromBody] int id_recipe)
        {
            var jwtt = Request.Headers[HeaderNames.Authorization].ToString();
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
            int id = int.Parse(idd);

            bool success = _dbService.AddRecipeToFavorites(id_recipe, id);
            if (success) return Ok("Successfuly added recipe to favorites");
            else return BadRequest("Something went wrong");
        }
        [HttpGet]
        [Route("get/recipes/favorite")]
        public IActionResult GetFavoritesRecipes()
        {
            var jwtt = Request.Headers[HeaderNames.Authorization].ToString();
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
            int id = int.Parse(idd);
            return Ok(_dbService.GetFavoriteRecipesDTO(id));

        }
        [HttpDelete]
        [Route("delete/recipes/favorites")]
        public IActionResult DeleteFavoritesRecipes([FromBody]int id_recipe)
        {
            var jwtt = Request.Headers[HeaderNames.Authorization].ToString();
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
            int id = int.Parse(idd);

            bool success = _dbService.DeleteFromFavorites(id, id_recipe);
            if (success) return Ok("Successfuly deleted recipe");
            else return BadRequest("Could not delete recipe");
        }

        [HttpGet]
        [Route("comment/{id}")]
        public IActionResult GetAllComments(int id)
        {
            return Ok(_dbService.GetAllCommentsById(id));
        }

        [HttpPost]
        [Route("comment")]
        [Authorize]
        public IActionResult AddNewComment(CreateCommentDTO createCommentDTO)
        {
            var userId = HttpContextAccessor.HttpContext.User.FindFirst("id").Value;
            createCommentDTO.UserId = int.Parse(userId);
            var result = _dbService.AddNewComment(createCommentDTO);

            if (result == null)
                return BadRequest("Something went wrong");
            return Ok(_dbService.AddNewComment(createCommentDTO));
        }

        [HttpPost]
        [Route("rating")]
        [Authorize]
        public IActionResult AddRating(CreateRatingDTO createRatingDTO)
        {
            var userId = HttpContextAccessor.HttpContext.User.FindFirst("id").Value;
            createRatingDTO.UserId = int.Parse(userId);
            var result = _dbService.AddRating(createRatingDTO);

            if (!result)
                return BadRequest("Something went wrong");
            return Ok();
        }
    }
}
