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
        public IActionResult GetShoppingList(int Id_ShoppingList)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);
            bool access = false;
            ShoppingListExtendDTO list = _dbService.GetUserList(Id_ShoppingList);
            foreach (UserInShoppingList user in list.Friends)
            {
                if (user.id_user == id) access = true;
            }
            if (access) { return Ok(list); }
            else return Unauthorized("You don't have rights to view this shopping list");
        }
        [HttpPost]
        [Route("add")]
        public IActionResult AddShoppingList([FromBody] string name)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            int result = _dbService.CreateNewShoppingList(name, id);
            if (result>0) { return Ok(result); }
            return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("add/ingredient")]
        public IActionResult AddIngredientToShoppingList([FromBody] IngredientListInsert ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.AddIngredientToList(ingredient.ingredient, int.Parse(ingredient.id_list), id, ingredient.amount);
            if (success) { return Ok("Successfuly added new item to shopping list"); }
            return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("add/recipe")]
        public IActionResult AddIngredientsFromRecipe([FromBody] RecipeToShoppingListInsert ingredients)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);
            if (ingredients.ingredients.Count() > 0)
            {
                foreach (RecipeToShoppingList ingredient in ingredients.ingredients)
                {
                    bool success = _dbService.AddIngredientToList(ingredient.ingredient, int.Parse(ingredients.id_list), id, ingredient.amount);
                    if (!success) { return BadRequest("Something went wrong"); }
                }
                return Ok("Successfuly added ingredients to shopping list");
            }
            return BadRequest("Could not pass the ingredients to shopping list");
        }
        [HttpPost]
        [Route("edit/ingredient")]
        public IActionResult EditIngredientToShoppingList([FromBody] IngredientListInsert ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.ChangeAmountOfIngredient(ingredient.ingredient, int.Parse(ingredient.id_list), id, ingredient.amount);
            if (success) { return Ok("Successfuly changed item in shopping list"); }
            return BadRequest("Something went wrong");
        }
        [HttpDelete]
        [Route("delete/ingredient")]
        public IActionResult DeleteIngredientFromShoppingList([FromBody] IngredientListDelete ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.DeleteIngredientFromShoppingList(ingredient.ingredient, int.Parse(ingredient.id_list), id);
            if (success) {return Ok("Successfuly deleted item from shopping list"); }
            return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("add/friend")]
        public IActionResult AddFriendToShoppingList([FromBody] FriendInsertList friend)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            int result = _dbService.AddFriendToList(friend.email, int.Parse(friend.id_list), id);

            if (result > 0) return Ok(_dbService.GetIdFromEmail(friend.email));
            else if (result < 0) return BadRequest("This user is already added");
            else return BadRequest("Something went wrong");

        }
        [HttpDelete]
        [Route("delete/friend")]
        public IActionResult DeleteFriendFromShoppingList([FromBody] FriendListDelete friend)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            int success = _dbService.DeleteFriendFromShoppingList(friend.email,int.Parse(friend.id_list),id);
            if (success>0) { return Ok(success); }
            return BadRequest("Something went wrong");
        }
        [HttpDelete]
        [Route("delete")]
        public IActionResult DeleteList(int id_list)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);
            int result = _dbService.DeleteList(id_list, id);
            if (result > 0) { return Ok("Successfuly deleted shopping list"); }
            else if (result < 0) { return Unauthorized("You dont have rights to this shopping list"); }
            else return BadRequest("Something went wrong");
        }
    }
}
