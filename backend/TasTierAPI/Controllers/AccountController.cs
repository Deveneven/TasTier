using System;
using Microsoft.AspNetCore.Mvc;
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

        [Route("login")]
        [HttpGet]
        public IActionResult Login(string login, string password)
        {
            bool result = _dbService.CheckCredidentials(login, password);

            if (result) { return Ok(result + "\tSuccessfully logged in"); }
            else { return Ok(result + "\tWrong login or password"); }
        }
    }
}
