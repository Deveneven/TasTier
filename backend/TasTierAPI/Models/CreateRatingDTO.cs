namespace TasTierAPI.Models
{
    public class CreateRatingDTO
    {
        public int? UserId { get; set; }
        public int RecipeId { get; set; }
        public int Rating { get; set; }
    }
}
