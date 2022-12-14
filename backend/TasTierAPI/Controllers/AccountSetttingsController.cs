using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using TasTierAPI.Models;
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
        public IActionResult ChangeUsername([FromBody] string username)
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
        public IActionResult ChangeEmail([FromBody] string email)
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
        [HttpPost]
        [Route("password/change")]
        public IActionResult ChangePassword([FromBody] string password)
        {
            String salt ;
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            salt = _dbService.ChangePassword(password, int.Parse(id.ToString()));
            if(!salt.IsNullOrEmpty()){
                string userPassword = password;
                byte[] saltBytes = Convert.FromBase64String(salt);
                using (var random = RandomNumberGenerator.Create())
                {
                    random.GetBytes(saltBytes);
                    Convert.ToBase64String(saltBytes);
                }
                string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8
                ));
                return Ok("Successfuly changed password"); }
            return BadRequest("Could not change the password");
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
        public IActionResult SetDiet([FromBody]int diet_id)
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
