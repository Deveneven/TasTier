using System;
using Microsoft.AspNetCore.Mvc;
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
            
            int result = _dbService.CheckCredidentials(loginDTO.login, loginDTO.password);

            if (result!=0) { return Ok(
                new LoginResponeModel()
                {
                    Id_User = result,
                    SecurityToken = fakeToken
                }
                ); }
            else { return BadRequest("\tWrong login or password"); }
        }
        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody]RegisterDTO registerDTO)
        {
            bool success = _dbService.Register(registerDTO.Name, registerDTO.LastName, registerDTO.Password, registerDTO.Email);
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
