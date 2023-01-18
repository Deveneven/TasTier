using System;
namespace TasTierAPI.Models
{
    public class UserDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public string lastname { get; set; }
        public string nickname { get; set; }
        public string avatar { get; set; }
        public string email { get; set; }
        public bool admin { get; set; }
        public int diet_id { get; set; }
    }
}
