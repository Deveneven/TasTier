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

        [Route("get")]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_dbService.GetRecipes());
        }


    }
}
