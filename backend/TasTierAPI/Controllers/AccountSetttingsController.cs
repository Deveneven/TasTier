using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using TasTierAPI.Models;
using TasTierAPI.Services;
using Microsoft.Extensions.Configuration;

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
        private int getIDFromToken(string jwtt)
        {
            var jwt = jwtt.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            return int.Parse(id);
        }

        [HttpPost]
        [Route("username/change")]
        public IActionResult ChangeUsername([FromBody] string username)
        {
            var id = getIDFromToken(Request.Headers[HeaderNames.Authorization]);
            bool success = _dbService.ChangeUsername(username, id);

            if (success) return Ok("Succesfully changed the username");
            return BadRequest("Could not change the username");
        }
        [HttpPost]
        [Route("name/change")]
        public IActionResult ChangeName([FromBody] string name)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString();
            var id = getIDFromToken(jwt);
            bool success = _dbService.ChangeName(name, id);

            if (success) return Ok("Succesfully changed the user data");
            return BadRequest("Could not change the user data");
        }
        [HttpPost]
        [Route("lastname/change")]
        public IActionResult ChangeLastName([FromBody] string lastname)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString();
            var id = getIDFromToken(jwt);
            bool success = _dbService.ChangeLastName(lastname, id);

            if (success) return Ok("Succesfully changed the user data");
            return BadRequest("Could not change the user data");
        }
        [HttpPost]
        [Route("email/change")]
        public IActionResult ChangeEmail([FromBody] string email)
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString();
            var id = getIDFromToken(jwt);
            bool success = _dbService.ChangeEmail(email, id);

            if (success) return Ok("Successfuly changed the email");
            return BadRequest("Could not change the email");
        }
        [HttpPost]
        [Route("password/change")]
        public IActionResult ChangePassword([FromBody] string password)
        {
            String salt ;
            var jwt = Request.Headers[HeaderNames.Authorization].ToString();
            var id = getIDFromToken(jwt);
            LoginAuthDTO loginAuthDTO = _dbService.GetUserById(id);
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
            string salt2 = _dbService.ChangePassword(passedPassword, id);
            if (!salt2.IsNullOrEmpty()) { 
                return Ok("Successfuly changed password"); }
            return BadRequest("Could not change the password");
        }
        [HttpPost]
        [Consumes("multipart/form-data")]
        [Route("avatar/change")]
        public IActionResult ChangeAvatar()
        {
            if (Request.HasFormContentType)
            {
                var id = getIDFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                if (Request.Form.Files.Count > 0)
                {
                    IFormFile file = Request.Form.Files.FirstOrDefault();
                    string url = _dbService.SetAvatar(file, id);
                    if (!url.Equals("Error"))
                    {
                        AvatarChangeDTO avatarChangeDTO = new AvatarChangeDTO();
                        avatarChangeDTO.Message = "Successfuly changed avatar";
                        avatarChangeDTO.AvatarURL = url;
                        return Ok(avatarChangeDTO);
                    }
                    return BadRequest("Something went wrong");
                }
                return BadRequest("File was not passed");
            }
            return BadRequest("Request did not contain form content");

        }

    }
}
