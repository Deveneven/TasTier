using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
    public class ShoppingListExtendDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<UserInShoppingList> Friends { get; set; }
        public List<IngredientInShoppingList> IngredientList { get; set; }
    }
}
