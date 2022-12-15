using System;
using Microsoft.AspNetCore.Mvc;
using TasTierAPI.Services;

namespace TasTierAPI.Controllers
{
    [ApiController]
    [Route("api/shoppinglist")]
    public class ShoppingListController : ControllerBase
    {
        private IDatabaseService _dbService;

        public ShoppingListController(IDatabaseService dbService)
        {
            _dbService = dbService;
        }

        [Route("get/userlists")]
        [HttpGet]
        public IActionResult Get(int Id_User)
        {
            return Ok(_dbService.GetShoppingLists(Id_User));
        }
        [Route("get/shoppinglist")]
        [HttpGet]
        public IActionResult GetShoppingList(int Id_ShoppingList)
        {
            return Ok(_dbService.GetSingleShoppingList(Id_ShoppingList));
        }

    }
}
