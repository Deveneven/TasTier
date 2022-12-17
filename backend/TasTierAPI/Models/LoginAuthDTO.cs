using System;
namespace TasTierAPI.Models
{
    public class LoginAuthDTO
    {
        public int id { get; set; }
        public string password { get; set; }
        public string salt { get; set; }
    }
}
