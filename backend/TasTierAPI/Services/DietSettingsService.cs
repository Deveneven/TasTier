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

        public bool SetDiet(int id_diet, int id_user)
        {
            bool success = false;
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
        public bool SetCousine(int id_cousine, int id_user)
        {
            bool success = false;
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
    }
}

