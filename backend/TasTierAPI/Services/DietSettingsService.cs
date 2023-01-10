using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public class DietSettingsService : IDietSettingsService
	{
        private string conURL;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public DietSettingsService(IConfiguration configuration)
        {
            conURL = configuration.GetConnectionString("TastierDB");
        }


        public void MakeConnection(string methodQuery)
        {
            connectionToDatabase = new SqlConnection(conURL);
            commandsToDatabase = new SqlCommand();

            commandsToDatabase.Connection = connectionToDatabase;
            commandsToDatabase.CommandText = methodQuery;
        }

        public IEnumerable<DietDTO> GetAllDiets()
        {
            List<DietDTO> diets = new List<DietDTO>();
            MakeConnection("SELECT Id_Diet,Name FROM [dbo].[Diet]");
            connectionToDatabase.Open();
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                diets.Add(new DietDTO()
                {
                    id = int.Parse(sqlDataReader["Id_Diet"].ToString()),
                    name = sqlDataReader["Name"].ToString(),
                });
            }
            connectionToDatabase.Close();
            return diets;
        }
        public int GetDietId(string diet)
        {
            int id_diet = 0;
            MakeConnection("SELECT Id_Diet FROM [dbo].[Diet] WHERE Name = @name");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", diet);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id_diet = int.Parse(sqlDataReader["Id_Diet"].ToString());
            }
            connectionToDatabase.Close();
            return id_diet  ;
        }

        public bool SetDiet(string diet, int id_user)
        {
            bool success = false;
            int id_diet = GetDietId(diet);
            if (id_diet > 0)
            {
                MakeConnection("UPDATE [dbo].[User] SET Diet_Id_Diet = @id_diet OUTPUT inserted.Id_User WHERE Id_User = @id_user");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_diet", id_diet);
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["Id_User"].ToString()) > 0) success = true;
                }
                connectionToDatabase.Close();
                return success;
            }
            connectionToDatabase.Close();
            return false;
        }
        public IEnumerable<CousineDTO> GetAllCousines()
        {
            List<CousineDTO> cousines = new List<CousineDTO>();
            MakeConnection("SELECT Id_Cousine,Name,Country FROM [dbo].[Cousine]");
            connectionToDatabase.Open();
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                cousines.Add(new CousineDTO()
                {
                    Id = int.Parse(sqlDataReader["Id_Cousine"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Country = sqlDataReader["Country"].ToString()
                });
            }
            connectionToDatabase.Close();
            return cousines;
        }
        public int GetCousineId (string cousine)
        {
            int id_cousine = 0;
            MakeConnection("SELECT Id_Cousine FROM [dbo].[Cousine] WHERE Name = @name");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", cousine);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id_cousine = int.Parse(sqlDataReader["Id_Cousine"].ToString());
            }
            connectionToDatabase.Close();
            return id_cousine;
        }
        public bool SetCousine(string cousine, int id_user)
        {
            bool success = false;
            int id_cousine = GetCousineId(cousine);
            if (id_cousine > 0)
            {
                MakeConnection("INSERT INTO [dbo].[Favorite_cousines] OUTPUT inserted.User_Id_User VALUES (@id_cousine,@id_user);");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_cousine", id_cousine);
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["User_Id_User"].ToString()) > 0) success = true;
                }
                connectionToDatabase.Close();
                return success;
            }
            connectionToDatabase.Close();
            return false;
        }
        public bool ClearCousines(int id_user)
        {
            bool success = false;
            MakeConnection("DELETE FROM [dbo].[Favorite_cousines] OUTPUT deleted.User_Id_User WHERE User_Id_User = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                if (int.Parse(sqlDataReader["User_Id_User"].ToString()) > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;
        }
        public IEnumerable<CousineDTO> GetUserCousines(int id_user)
        {
            List<CousineDTO> cousines = new List<CousineDTO>();
            MakeConnection("SELECT c.Id_Cousine, c.Name, c.Country From [dbo].[Favorite_cousines] as fc " +
            "inner join[dbo].[Cousine] as c on fc.Cousine_Id_Cousine = c.Id_Cousine " + 
            "WHERE fc.User_Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                cousines.Add(new CousineDTO()
                {
                    Id = int.Parse(sqlDataReader["Id_Cousine"].ToString()),
                    Name = sqlDataReader["Name"].ToString(),
                    Country = sqlDataReader["Country"].ToString()
                });
            }
            connectionToDatabase.Close();
            return cousines;
        }
        public DietDTO GetUserDiet(int id_user)
        {
            DietDTO diet = new DietDTO();
            MakeConnection("SELECT d.Id_Diet, d.Name FROM [dbo].[User] as u " +
            "inner join[dbo].[Diet] as d on u.Diet_Id_Diet = d.Id_Diet " +
            "WHERE u.Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                diet = new DietDTO()
                {
                    id = int.Parse(sqlDataReader["Id_Diet"].ToString()),
                    name = sqlDataReader["Name"].ToString()
                };
            }
            connectionToDatabase.Close();
            return diet;
        }
        public IEnumerable<Allergen> GetUserAllergens(int id_user)
        {
            List<Allergen> allergens = new List<Allergen>();
            MakeConnection("SELECT a.Id_Allergen, a.type as Name FROM [dbo].[User_allergen] as ua " +
                "inner join [dbo].[Allergen] as a on a.Id_Allergen = ua.Allergen_Id_Allergen " +
                "WHERE ua.User_Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                allergens.Add(new Allergen()
                {
                    Id_Allergen = int.Parse(sqlDataReader["Id_Allergen"].ToString()),
                    Name = sqlDataReader["Name"].ToString()
                });
            }
            connectionToDatabase.Close();
            return allergens;
        }

        public bool DeleteUserAllergen (string allergen, int id_user)
        {
            int id_allergen = GetAllergenId(allergen);
            if (id_allergen > 0)
            {
                MakeConnection("DELETE FROM [dbo].[User_allergen] output deleted.User_Id_User WHERE " +
                    "User_Id_User = @id_user AND Allergen_Id_Allergen = @id_allergen");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                commandsToDatabase.Parameters.AddWithValue("@id_allergen", id_allergen);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["User_Id_User"].ToString()) == id_user)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
                connectionToDatabase.Close();
                return false;
            } return false;
        }
        public bool AddUserAllergen (string allergen, int id_user)
        {
            int id_allergen = GetAllergenId(allergen);
            if (id_allergen > 0)
            {
                MakeConnection("INSERT INTO [dbo].[User_allergen] output inserted.User_Id_User VALUES (@id_allergen,@id_user)");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                commandsToDatabase.Parameters.AddWithValue("@id_allergen", id_allergen);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["User_Id_User"].ToString()) == id_user)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
            }
            connectionToDatabase.Close();
            return false;
        }
        public IEnumerable<Allergen> GetAllAllergens()
        {
            List<Allergen> allergens = new List<Allergen>();
            MakeConnection("SELECT * FROM [dbo].[Allergen]");
            connectionToDatabase.Open();
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                allergens.Add(new Allergen()
                {
                    Id_Allergen = int.Parse(sqlDataReader["Id_Allergen"].ToString()),
                    Name = sqlDataReader["type"].ToString()
                });
            }
            connectionToDatabase.Close();
            return allergens;
        }
        public IEnumerable<IngredientDTO> GetUserFavIngredients(int id_user)
        {
            List<IngredientDTO> ingredients = new List<IngredientDTO>();
            MakeConnection("SELECT i.Id_Ingredient, i.Name FROM [dbo].[Favorite_ingredient] as fi "+
            "inner join[dbo].[Ingredient] as i ON fi.Ingredient_Id_Ingredient = i.Id_Ingredient "+
            "WHERE fi.User_Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                ingredients.Add(new IngredientDTO()
                {
                    id_ingredient = int.Parse(sqlDataReader["Id_Ingredient"].ToString()),
                    Name = sqlDataReader["Name"].ToString()
                });
            }
            connectionToDatabase.Close();
            return ingredients;
        }
        public IEnumerable<IngredientDTO> GetUserDislikedIngredients(int id_user)
        {
            List<IngredientDTO> ingredients = new List<IngredientDTO>();
            MakeConnection("SELECT i.Id_Ingredient, i.Name FROM [dbo].[DislikedIngredient] as fi " +
            "inner join[dbo].[Ingredient] as i ON fi.Ingredient_Id_Ingredient = i.Id_Ingredient " +
            "WHERE fi.User_Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                ingredients.Add(new IngredientDTO()
                {
                    id_ingredient = int.Parse(sqlDataReader["Id_Ingredient"].ToString()),
                    Name = sqlDataReader["Name"].ToString()
                });
            }
            connectionToDatabase.Close();
            return ingredients;
        }
        public bool AddUserFavIngredient(string ingredient, int id_user)
        {
            int id_ingredient = GetIngredientId(ingredient);
            if (id_ingredient > 0)
            {
                MakeConnection("INSERT INTO [dbo].[Favorite_ingredient] output inserted.User_Id_User VALUES (@id_ingredient,@id_user)");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                commandsToDatabase.Parameters.AddWithValue("@id_ingredient", id_ingredient);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["User_Id_User"].ToString()) == id_user)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
                connectionToDatabase.Close();
                return false;
            }return false;
        }
        public bool AddUserDislikedIngredient(string ingredient, int id_user)
        {
            int id_ingredient = GetIngredientId(ingredient);
            if (id_ingredient > 0)
            {
                MakeConnection("INSERT INTO [dbo].[DislikedIngredient] output inserted.User_Id_User VALUES (@id_user,@id_ingredient)");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                commandsToDatabase.Parameters.AddWithValue("@id_ingredient", id_ingredient);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["User_Id_User"].ToString()) == id_user)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
                connectionToDatabase.Close();
                return false;
            }
            return false;
        }
        public bool DeleteUserFavIngredient(string ingredient, int id_user)
        {
            int id_ingredient = GetIngredientId(ingredient);
            if (id_ingredient > 0)
            {
                MakeConnection("DELETE FROM [dbo].[Favorite_ingredient] output deleted.User_Id_User WHERE " +
                    "User_Id_User = @id_user AND Ingredient_Id_Ingredient = @id_ingredient");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                commandsToDatabase.Parameters.AddWithValue("@id_ingredient", id_ingredient);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["User_Id_User"].ToString()) == id_user)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
                connectionToDatabase.Close();
                return false;
            } return false;
        }
        public bool DeleteUserDislikedIngredient(string ingredient, int id_user)
        {
            int id_ingredient = GetIngredientId(ingredient);
            if (id_ingredient > 0)
            {
                MakeConnection("DELETE FROM [dbo].[DislikedIngredient] output deleted.User_Id_User WHERE " +
                    "User_Id_User = @id_user AND Ingredient_Id_Ingredient = @id_ingredient");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
                commandsToDatabase.Parameters.AddWithValue("@id_ingredient", id_ingredient);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    if (int.Parse(sqlDataReader["User_Id_User"].ToString()) == id_user)
                    {
                        connectionToDatabase.Close();
                        return true;
                    }
                }
                connectionToDatabase.Close();
                return false;
            }return false;
        }
        public int GetAllergenId (string name)
        {
            int id = 0;
            MakeConnection("SELECT TOP 1 Id_Allergen FROM [dbo].[Allergen] WHERE type = @name");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", name);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id = int.Parse(sqlDataReader["Id_Allergen"].ToString());
            }
            return id;
        }
        public int GetIngredientId (string ingredient)
        {
            int id = 0;
            MakeConnection("SELECT TOP 1 Id_Ingredient FROM [dbo].[Ingredient] WHERE Name = @name");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", ingredient);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                id = int.Parse(sqlDataReader["Id_Ingredient"].ToString());
            }
            return id;
        }
    }
}
