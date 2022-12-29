using System;
namespace TasTierAPI.Models
{
    public class Comment
    {
        public int rating { get; set; }
        public string image { get; set; }
        public string text { get; set; }
        public int id_recipe { get; set; }
    }
}

