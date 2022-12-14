using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using TasTierAPI.Models;
using TasTierAPI.Services;

namespace TasTierAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/accounts")]
    public class AccountController : ControllerBase
    {
        private IDatabaseService _dbService;

        public AccountController(IDatabaseService dbService)
        {
            _dbService = dbService;
        }

        //MOCK LOGIN B4 GOOGLE/FB
        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            string fakeToken = "verysecretoken5912359213";
            LoginAuthDTO loginAuth = _dbService.GetUserByLogin(loginDTO.login);
            System.Diagnostics.Debug.WriteLine(loginAuth.id);
            if (loginAuth.id <= 0) { return Unauthorized("Wrong login or password"); }

            else
            {
                string userPassword = loginDTO.password;
                byte[] salt = Convert.FromBase64String(loginAuth.salt);
                string passedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    userPassword,
                    salt,
                    KeyDerivationPrf.HMACSHA1,
                    10000,
                    256 / 8
                  ));
                List<Claim> userClaim = new List<Claim>
            {
            new Claim("id", loginAuth.id.ToString())
            };
                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(fakeToken));
                var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
                var token = new JwtSecurityToken(
                    issuer: "https://localhost:44309",
                    audience: "https://localhost:44309",
                    claims: userClaim,
                    expires: DateTime.UtcNow.AddDays(3),
                    signingCredentials: cred
                    );

                var jwt = new JwtSecurityTokenHandler().WriteToken(token);

                if (userPassword == loginDTO.password)
                {
                    return Ok(
                        jwt
                    );
                }
                else { return BadRequest("\tWrong login or password"); }
            }
        }
        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] RegisterDTO registerDTO)
        {
            byte[] salt = new byte[128 / 8];
            using (var random = RandomNumberGenerator.Create())
            {
                random.GetBytes(salt);
                Convert.ToBase64String(salt);
            }
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: registerDTO.Password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8
            ));

            string convertedSalt = Convert.ToBase64String(salt);
            bool success = _dbService.Register(registerDTO.Name, registerDTO.LastName, hashedPassword, registerDTO.Email, convertedSalt);
            if (success) { return Ok("You've successfuly registered"); }
            else return Unauthorized("Something went wrong");
        }
        [Route("user")]
        [HttpGet]
        public IActionResult GetUser()
        {
            var jwt = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.ReadJwtToken(jwt);
            System.Diagnostics.Debug.WriteLine(securityToken.Claims);
            var id = securityToken.Claims.First(claim => claim.Type == "id").Value;
            return Ok(_dbService.GetUserDTO(int.Parse(id.ToString())));
        }


    }
}
