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
        private IAccountSettingService _dbService;
        public AccountSetttingsController(IAccountSettingService dbService)
        {
            _dbService = dbService;
        }
        private string getIDFromToken(string jwtt)
        {
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            return id;
        }

        [HttpPost]
        [Route("username/change")]
        public IActionResult ChangeUsername([FromBody] string username)
        {
            var id = getIDFromToken(Request.Headers[HeaderNames.Authorization].ToString());
            bool success = _dbService.ChangeUsername(username, int.Parse(id.ToString()));

            if (success) return Ok("Succesfully changed the username");
            return BadRequest("Could not change the username");
        }
        [HttpPost]
        [Route("name/change")]
        public IActionResult ChangeName([FromBody] string name)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            bool success = _dbService.ChangeName(name, int.Parse(id.ToString()));

            if (success) return Ok("Succesfully changed the user data");
            return BadRequest("Could not change the user data");
        }
        [HttpPost]
        [Route("lastname/change")]
        public IActionResult ChangeLastName([FromBody] string lastname)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            bool success = _dbService.ChangeLastName(lastname, int.Parse(id.ToString()));

            if (success) return Ok("Succesfully changed the user data");
            return BadRequest("Could not change the user data");
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
            LoginAuthDTO loginAuthDTO = _dbService.GetUserById(int.Parse(id.ToString()));
            salt = loginAuthDTO.salt;
                string userPassword = password;
                byte[] saltBytes = Convert.FromBase64String(salt);
                string passedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    userPassword,
                    saltBytes,
                    KeyDerivationPrf.HMACSHA1,
                    10000,
                    256 / 8
                  ));
            string salt2 = _dbService.ChangePassword(passedPassword, int.Parse(id));
            if (!salt2.IsNullOrEmpty()) { 
                return Ok("Successfuly changed password"); }
            return BadRequest("Could not change the password");
        }

    }
}
