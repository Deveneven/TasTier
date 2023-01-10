using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using TasTierAPI.Services;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Collections.Generic;

namespace TasTierAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/diet")]
    public class DietSettingsController : ControllerBase
	{
        private IDietSettingsService _dbService;

        public DietSettingsController(IDietSettingsService dbService)
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
        [Route("diet/get")]
        //selects all diets
        public IActionResult GetDiets()
        {
            return Ok(_dbService.GetAllDiets());
        }
        [HttpPost]
        [Route("diet/set")]
        public IActionResult SetDiet([FromBody] string diet)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var id = getIDFromToken(jwt);
            bool success = _dbService.SetDiet(diet, int.Parse(id.ToString()));
            if (success) return Ok("Successfuly set current diet");
            return BadRequest("Could not set diet");
        }

        [HttpGet]
        [Route("cousine/get")]
        public IActionResult GetCousines()
        {
            return Ok(_dbService.GetAllCousines());
        }

        [HttpPost]
        [Route("cousine/set")]
        public IActionResult SetCousines([FromBody] List<string> cousines) 
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);
            _dbService.ClearCousines(id);
                
                if (cousines.Count() > 0)
                {
                    foreach(string x in cousines){
                        bool tmp_success = false;
                        tmp_success = _dbService.SetCousine(x, id);
                        if (!tmp_success) return BadRequest("Something went wrong <221L0>");
                    }
                    return Ok("Successfuly edited user data");
                }
                else return Ok("All cousines have been cleared");
        }
        [HttpGet]
        [Route("cousine/user")]
        public IActionResult GetUserCousines()
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            return Ok(_dbService.GetUserCousines(id));
        }
        [HttpGet]
        [Route("diet/user")]
        public IActionResult GetUserDiet()
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            return Ok(_dbService.GetUserDiet(id));
        }
        [HttpGet]
        [Route("allergens/get")]
        public IActionResult GetAllAllergens()
        {
            return Ok(_dbService.GetAllAllergens());
        }
        [HttpGet]
        [Route("allergens/user")]
        public IActionResult GetUserAllergens()
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            return Ok(_dbService.GetUserAllergens(id));
        }
        [HttpDelete]
        [Route("allergens/user/delete")]
        public IActionResult DeleteUserAllergen([FromBody]string allergen)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.DeleteUserAllergen(allergen, id);
            if (success) return Ok("Successfuly deleted allergen from user's list");
            else return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("allergens/user/add")]
        public IActionResult AddUserAllergen([FromBody] string allergen)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.AddUserAllergen(allergen, id);
            if (success) return Ok("Successfuly added allergen to user's list");
            else return BadRequest("Something went wrong");
        }
        [HttpGet]
        [Route("ingredients/favorite")]
        public IActionResult GetFavIngredients()
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            return Ok(_dbService.GetUserFavIngredients(id));
        }
        [HttpGet]
        [Route("ingredients/disliked")]
        public IActionResult GetDislikedIngredients()
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            return Ok(_dbService.GetUserDislikedIngredients(id));
        }
        [HttpDelete]
        [Route("ingredients/favorite/delete")]
        public IActionResult DeleteUserFavIngredients([FromBody]string ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.DeleteUserFavIngredient(ingredient, id);
            if (success) return Ok("Successfuly deleted ingredient from user's list");
            else return BadRequest("Something went wrong");
        }
        [HttpDelete]
        [Route("ingredients/disliked/delete")]
        public IActionResult DeleteUserDislikedIngredients([FromBody] string ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.DeleteUserDislikedIngredient(ingredient, id);
            if (success) return Ok("Successfuly deleted ingredient from user's list");
            else return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("ingredients/favorite/add")]
        public IActionResult AddUserFavIngredients([FromBody] string ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.AddUserFavIngredient(ingredient, id);
            if (success) return Ok("Successfuly added ingredient to user's list");
            else return BadRequest("Something went wrong");
        }
        [HttpPost]
        [Route("ingredients/disliked/add")]
        public IActionResult AddUserDislikedIngredients([FromBody] string ingredient)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);

            bool success = _dbService.AddUserDislikedIngredient(ingredient, id);
            if (success) return Ok("Successfuly added ingredient to user's list");
            else return BadRequest("Something went wrong");
        }


    }
}

