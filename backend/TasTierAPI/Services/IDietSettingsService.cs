using System;
using System.Collections.Generic;
using Microsoft.VisualBasic;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public interface IDietSettingsService
	{
        public void MakeConnection(string methodQuery);
        public IEnumerable<DietDTO> GetAllDiets();
        public bool SetDiet(string diet, int id_user);
        public IEnumerable<CousineDTO> GetAllCousines();
        public bool SetCousine(string cousine, int id_user);
        public bool ClearCousines(int id_user);
        public IEnumerable<CousineDTO> GetUserCousines(int id_user);
        public DietDTO GetUserDiet(int id_user);
        public int GetDietId(string diet);
        public int GetCousineId(string cousine);
        public IEnumerable<Allergen> GetUserAllergens(int id_user);
        public bool DeleteUserAllergen(string allergen, int id_user);
        public bool AddUserAllergen(string allergen, int id_user);
        public IEnumerable<Allergen> GetAllAllergens();
        public IEnumerable<IngredientDTO> GetUserDislikedIngredients(int id_user);
        public IEnumerable<IngredientDTO> GetUserFavIngredients(int id_user);
        public bool AddUserFavIngredient(string ingredient, int id_user);
        public bool AddUserDislikedIngredient(string ingredient, int id_user);
        public bool DeleteUserFavIngredient(string ingredient, int id_user);
        public bool DeleteUserDislikedIngredient(string ingredient, int id_user);

    }
}

