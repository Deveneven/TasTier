using System;
using System.Collections.Generic;

namespace TasTierAPI.Models
{
    public class ShoppingListExtendDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Friends { get; set; }
        public List<IngredientInShoppingList> IngredientList { get; set; }
    }
}
