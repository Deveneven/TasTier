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
    [Route("api/shoppinglist")]
    public class ShoppingListController : ControllerBase
    {
        private IShoppingListService _dbService;

        public ShoppingListController(IShoppingListService dbService)
        {
           _dbService = dbService;
        }
        private int getIDFromToken(string jwtt)
        {
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            return int.Parse(id);
        }


        [HttpGet]
        [Route("get/userlists")]
        public IActionResult Get()
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            return Ok(_dbService.GetUserLists(id));
        }
        [HttpGet]
        [Route("get/shoppinglist")]
        public IActionResult GetShoppingList([FromBody] int Id_ShoppingList)
        {
            return Ok(_dbService.GetUserList(Id_ShoppingList));
        }
        [HttpPost]
        [Route("add")]
        public IActionResult AddShoppingList([FromBody] string name)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.CreateNewShoppingList(name, id);
            if (success) { Ok("Successfuly added new shopping list"); }
            return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("add/ingredient")]
        public IActionResult AddIngredientToShoppingList([FromBody] IngredientListInsert ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.AddIngredientToList(ingredient.ingredient, ingredient.id_list, id, ingredient.amount);
            if (success) { Ok("Successfuly added new item to shopping list"); }
            return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("edit/ingredient")]
        public IActionResult EditIngredientToShoppingList([FromBody] IngredientListInsert ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.ChangeAmountOfIngredient(ingredient.ingredient, ingredient.id_list, id, ingredient.amount);
            if (success) { Ok("Successfuly changed item in shopping list"); }
            return BadRequest("Something went wrong");
        }
        [HttpDelete]
        [Route("delete/ingredient")]
        public IActionResult DeleteIngredientFromShoppingList([FromBody] IngredientListDelete ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.DeleteFriendFromShoppingList(ingredient.ingredient, ingredient.id_list, id);
            if (success) { Ok("Successfuly deleted item from shopping list"); }
            return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("add/friend")]
        public IActionResult AddFriendToShoppingList([FromBody] FriendInsertList friend)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            int result = _dbService.AddFriendToList(friend.email, friend.id_list, id);

            if (result > 0) return Ok("Successfuly added the user to the shopping list");
            else if (result < 0) return BadRequest("This user is already added");
            else return BadRequest("Something went wrong");

        }
        [HttpDelete]
        [Route("delete/friend")]
        public IActionResult DeleteFriendFromShoppingList([FromBody] FriendListDelete friend)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.DeleteFriendFromShoppingList(friend.email,friend.id_list,id);
            if (success) { Ok("Successfuly deleted friend from shopping list"); }
            return BadRequest("Something went wrong");
        }

    }
}
