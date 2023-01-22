using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
	public class UserInfoDTO
	{
		public UserDTO user { get; set; }
		public DietDTO diet { get; set; }
		public IEnumerable<CousineDTO> cousines { get; set; }
		public IEnumerable<Allergen> allergens { get; set; }
		public IEnumerable<IngredientDTO> favoritesIngr { get; set; }
		public IEnumerable<IngredientDTO> dislikedIngrs { get; set; }
	}
}

