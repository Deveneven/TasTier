using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
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

        [Route("get/userlists")]
        [HttpGet]
        public IActionResult Get()
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            return Ok(_dbService.GetUserLists(id));
        }
        [Route("get/shoppinglist")]
        [HttpGet]
        public IActionResult GetShoppingList(int Id_ShoppingList)
        {
            return Ok(GetShoppingList(Id_ShoppingList));
        }

    }
}
