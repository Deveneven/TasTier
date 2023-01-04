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
        public IActionResult SetDiet([FromBody] int diet_id)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var id = getIDFromToken(jwt);
            bool success = _dbService.SetDiet(diet_id, int.Parse(id.ToString()));
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
        public IActionResult SetCousines([FromBody] List<int> cousines) 
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            int id = getIDFromToken(jwt);
            _dbService.ClearCousines(id);
                
                if (cousines.Count() > 0)
                {
                    foreach(int x in cousines){
                        bool tmp_success = false;
                        tmp_success = _dbService.SetCousine(x, id);
                        if (!tmp_success) return BadRequest("Something went wrong <221L0>");
                    }
                    return Ok("Successfuly edited user data");
                }
                else return Ok("All cousines have been cleared");
        }
    }
}

