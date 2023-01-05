using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public class AccountSettingService : IAccountSettingService
	{
        private string conURL;
        private string blobURL;
        private string containerName;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public AccountSettingService(IConfiguration configuration)
        {
            conURL = configuration.GetConnectionString("TastierDB");
            blobURL = configuration.GetConnectionString("BlobConnectionString"); ;
            containerName = configuration.GetConnectionString("ContainerName"); ;

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
        public string UploadBinary(IFormFile file)
        {
            string uri = null;
            if (!file.Equals(null))
            {
                BlobContainerClient blobContainerClient = new BlobContainerClient(blobURL, containerName);
                string fileName = "";
                fileName = !file.FileName.Equals(null) ? file.FileName : "unknown";
                BlobClient blobClient = blobContainerClient.GetBlobClient(fileName);

                var ms = new MemoryStream();
                file.CopyTo(ms);
                var bytes = ms.ToArray();

                BinaryData binaryData = new BinaryData(bytes);

                blobClient.Upload(binaryData, true);

                uri = blobClient.Uri.AbsoluteUri;

                ms.Close();
            }

            return uri;
        }

        public string SetAvatar(IFormFile file, int user_id)
        {
            string avatarURI = null;
            avatarURI = UploadBinary(file);
            if (!avatarURI.Equals(null))
            {
                MakeConnection("UPDATE[dbo].[User] " +
                 "SET Avatar = @avatar " +
                "OUTPUT inserted.Id_User " +
                "WHERE Id_User = @id");
                connectionToDatabase.Open();
                commandsToDatabase.Parameters.AddWithValue("@avatar", avatarURI);
                commandsToDatabase.Parameters.AddWithValue("@id", user_id);
                SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    int tmp = int.Parse(sqlDataReader["Id_User"].ToString());
                    if (tmp > 0) return avatarURI;
                }
                connectionToDatabase.Close();
            }
            return "Error";
        }
    }
}

