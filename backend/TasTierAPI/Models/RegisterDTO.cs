using System;
namespace TasTierAPI.Models
{
    public class RegisterDTO
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
