using System;
using Microsoft.AspNetCore.Mvc;
using TasTierAPI.Services;

namespace TasTierAPI.Controllers
{
    [ApiController]
    [Route("api/recipes")]
    public class RecipeController:ControllerBase
    {
        private IDatabaseService _dbService;

        public RecipeController (IDatabaseService dbService)
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

    }
}
