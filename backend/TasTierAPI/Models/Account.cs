using System;
namespace TasTierAPI.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string email { get; set; }
    }
}
