using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using TasTierAPI.Services;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace TasTierAPI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/accounts")]
    public class DietSettingsController : ControllerBase
	{
        private IDietSettingsService _dbService;

        public DietSettingsController(IDietSettingsService dbService)
        {
            _dbService = dbService;
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
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            bool success = _dbService.SetDiet(diet_id, int.Parse(id.ToString()));
            if (success) return Ok("Successfuly set current diet");
            return BadRequest("Could not set diet");
        }
    }
}

