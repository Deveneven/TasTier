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
    }
}

