using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using TasTierAPI.Services;

namespace TasTierAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/settings")]
    public class AccountSetttingsController : ControllerBase
    {
        private IDatabaseService _dbService;
        public AccountSetttingsController(IDatabaseService dbService)
        {
            _dbService = dbService;
        }

        [HttpPost]
        [Route("username/change")]
        public IActionResult changeUsername([FromBody] string username)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            bool success = _dbService.ChangeUsername(username, int.Parse(id.ToString()));

            if (success) return Ok("Succesfully changed the username");
            return BadRequest("Could not change the username");
        }
        [HttpPost]
        [Route("email/change")]
        public IActionResult changeEmail([FromBody] string email)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            bool success = _dbService.ChangeEmail(email, int.Parse(id.ToString()));

            if (success) return Ok("Successfuly changed the email");
            return BadRequest("Could not change the email");
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("diet/get")]
        //selects all diets
        public IActionResult getDiets()
        {
            return Ok(_dbService.GetAllDiets());
        }
        [HttpPost]
        [Route("diet/set")]
        public IActionResult setDiet([FromBody]int diet_id)
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
