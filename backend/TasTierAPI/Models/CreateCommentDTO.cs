namespace TasTierAPI.Models
{
    public class CreateCommentDTO
    {
        public int? UserId { get; set; }
        public string Text { get; set; }
        public int RecipeId { get; set; }
    }
}
