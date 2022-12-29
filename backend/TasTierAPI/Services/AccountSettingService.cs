using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public class AccountSettingService : IAccountSettingService
	{
        private string conURL;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public AccountSettingService(IConfiguration configuration)
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


        public bool ChangeUsername(string username, int id)
        {
            bool success = false;
            MakeConnection("UPDATE[dbo].[User] " +
             "SET Nickname = @username " +
            "OUTPUT inserted.Id_User " +
            "WHERE Id_User = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@username", username);
            commandsToDatabase.Parameters.AddWithValue("@id", id);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                int tmp = int.Parse(sqlDataReader["Id_User"].ToString());
                if (tmp > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;

        }

        public bool ChangeEmail(string email, int id)
        {
            bool success = false;
            MakeConnection("UPDATE[dbo].[User] " +
             "SET Email = @email " +
            "OUTPUT inserted.Id_User " +
            "WHERE Id_User = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@email", email);
            commandsToDatabase.Parameters.AddWithValue("@id", id);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                int tmp = int.Parse(sqlDataReader["Id_User"].ToString());
                if (tmp > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;
        }

        public string ChangePassword(string password, int id_user)
        {
            string success = "";
            MakeConnection("UPDATE [dbo].[User] SET Password = @password OUTPUT inserted.salt WHERE Id_User = @id_user");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@password", password);
            commandsToDatabase.Parameters.AddWithValue("@id_user", id_user);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                success = sqlDataReader["salt"].ToString();
            }
            connectionToDatabase.Close();
            return success;
        }

        public bool ChangeName(string name, int id)
        {
            bool success = false;
            MakeConnection("UPDATE[dbo].[User] " +
             "SET Name = @name " +
            "OUTPUT inserted.Id_User " +
            "WHERE Id_User = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@name", name);
            commandsToDatabase.Parameters.AddWithValue("@id", id);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                int tmp = int.Parse(sqlDataReader["Id_User"].ToString());
                if (tmp > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;
        }

        public bool ChangeLastName(string lastname, int id)
        {
            bool success = false;
            MakeConnection("UPDATE[dbo].[User] " +
             "SET LastName = @lastname " +
            "OUTPUT inserted.Id_User " +
            "WHERE Id_User = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@lastname", lastname);
            commandsToDatabase.Parameters.AddWithValue("@id", id);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                int tmp = int.Parse(sqlDataReader["Id_User"].ToString());
                if (tmp > 0) success = true;
            }
            connectionToDatabase.Close();
            return success;
        }

        public LoginAuthDTO GetUserById(int id)
        {
            LoginAuthDTO loginAuthDTO = new LoginAuthDTO();
            MakeConnection("SELECT Id_User,Password,salt FROM [dbo].[User] WHERE Id_User = @id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", id);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                loginAuthDTO = new LoginAuthDTO()
                {
                    id = int.Parse(sqlDataReader["Id_User"].ToString()),
                    password = sqlDataReader["Password"].ToString(),
                    salt = sqlDataReader["salt"].ToString()
                };
            }
            connectionToDatabase.Close();
            return loginAuthDTO;
        }
    }
}

