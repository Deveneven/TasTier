using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using TasTierAPI.Models;
using TasTierAPI.Services;

namespace TasTierAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/recipes")]
    public class RecipeController:ControllerBase
    {
        private IRecipeService _dbService;

        public RecipeController (IRecipeService dbService)
        {
            _dbService = dbService;
        }
        [AllowAnonymous]
        [Route("get/recipes")]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_dbService.GetRecipesDTO());
        }
        [AllowAnonymous]
        [Route("get/ingredients")]
        [HttpGet]
        public IActionResult GetIngredientList(int Id_Recipe)
        {
            return Ok(_dbService.GetIngriedientList(Id_Recipe));
        }
        [AllowAnonymous]
        [Route("get/steps")]
        [HttpGet]
        public IActionResult GetSteps(int Id_Recipe)
        {
            return Ok(_dbService.GetSteps(Id_Recipe));
        }
        [AllowAnonymous]
        [Route("get/comments")]
        [HttpGet]
        public IActionResult GetComments(int Id_Recipe)
        {
            return Ok(_dbService.GetComments(Id_Recipe));
        }
        [Route("add/comments")]
        [HttpPost]
        public IActionResult AddComment([FromBody] Comment comment)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var idd = securityToken.Claims.First(claim => claim.Type == "id").Value;
            int id = int.Parse(idd);

            bool success = _dbService.AddComment(comment, id);

            if (success) return Ok("Successfuly added comment");

            return BadRequest("Something went wrong");
        }
    }
}
