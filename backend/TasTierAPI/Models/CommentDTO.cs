using System;
namespace TasTierAPI.Models
{
	public class CommentDTO
	{
		public int id_user { get; set; }
		public string username { get; set; }
		public string avatar { get; set; }
        public int id_comment { get; set; }
		public int rating { get; set; }
        public string image { get; set; }
		public string text { get; set; }

	}
}

