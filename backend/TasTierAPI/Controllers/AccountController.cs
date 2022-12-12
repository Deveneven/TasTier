﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TasTierAPI.Models;
using TasTierAPI.Services;

namespace TasTierAPI.Controllers
{
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
        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]LoginDTO loginDTO)
        {
            string fakeToken = "verysecretoken5912359213";
            LoginAuthDTO loginAuth = _dbService.GetUserByLogin(loginDTO.login);
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
            new Claim(ClaimTypes.Name, loginAuth.id.ToString())
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(fakeToken));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: userClaim,
                expires: DateTime.UtcNow.AddDays(3),
                signingCredentials: cred
                ) ;

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            if (userPassword == loginDTO.password) { return Ok(
                    jwt
                ); }
            else { return BadRequest("\tWrong login or password"); }
        }
        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody]RegisterDTO registerDTO)
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
            bool success = _dbService.Register(registerDTO.Name, registerDTO.LastName, hashedPassword, registerDTO.Email,convertedSalt);
            if (success) { return Ok(success); }
            else return BadRequest("Something went wrong");
        }
        [Route("user")]
        [HttpGet]
        public IActionResult GetUser (int Id_User)
        {
            return Ok(_dbService.GetUserDTO(Id_User));
        }
    }
}
