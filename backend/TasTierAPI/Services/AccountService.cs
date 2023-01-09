using System;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public class AccountService : IAccountService
	{
        private string conURL;
        private SqlConnection connectionToDatabase;
        private SqlCommand commandsToDatabase;

        public AccountService(IConfiguration configuration)
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

        public LoginAuthDTO GetUserByLogin(string login)
        {
            LoginAuthDTO loginAuth = new LoginAuthDTO();
            MakeConnection("SELECT Id_User, Password, salt FROM [dbo].[User] WHERE Email=@login");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("login", login);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                loginAuth = new LoginAuthDTO()
                {
                    id = int.Parse(sqlDataReader["Id_User"].ToString()),
                    password = sqlDataReader["Password"].ToString(),
                    salt = sqlDataReader["salt"].ToString()
                };
            }
            return loginAuth;
        }

        public int Register(string name, string lastname, string password, string email, string salt)
        {
            int result = 0;
            MakeConnection("exec [dbo].Register  @Name = @imie, @LastName = @nazwisko, @Password = @haslo, @Email = @mail,@Salt=@sol;");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@imie", name);
            commandsToDatabase.Parameters.AddWithValue("@nazwisko", lastname);
            commandsToDatabase.Parameters.AddWithValue("@haslo", password);
            commandsToDatabase.Parameters.AddWithValue("@mail", email);
            commandsToDatabase.Parameters.AddWithValue("@sol", salt);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();

            while (sqlDataReader.Read())
            {
                result = int.Parse(sqlDataReader["result"].ToString());
            }
            connectionToDatabase.Close();
            return result;
        }

        public UserDTO GetUserDTO(int id)
        {
            UserDTO user = new UserDTO();
            MakeConnection("SELECT Name,LastName,Nickname,Avatar,Email,Admin,Diet_Id_Diet FROM [dbo].[User] WHERE Id_User =@id");
            connectionToDatabase.Open();
            commandsToDatabase.Parameters.AddWithValue("@id", id);
            SqlDataReader sqlDataReader = commandsToDatabase.ExecuteReader();
            while (sqlDataReader.Read())
            {
                user = new UserDTO()
                {
                    name = (sqlDataReader["Name"] != null ? sqlDataReader["Name"].ToString() : null),
                    lastname = (sqlDataReader["LastName"] != null ? sqlDataReader["LastName"].ToString() : null),
                    nickname = (sqlDataReader["Nickname"] != null ? sqlDataReader["Nickname"].ToString() : null),
                    avatar = (sqlDataReader["Avatar"] != null ? sqlDataReader["Avatar"].ToString() : null),
                    email = (sqlDataReader["Email"] != null ? sqlDataReader["Email"].ToString() : null),
                    admin = (sqlDataReader["Admin"] != null ? bool.Parse(sqlDataReader["Admin"].ToString()) : false),
                    // diet_id = int.Parse(sqlDataReader["Diet_Id_Diet"].ToString())
                };


            }
            connectionToDatabase.Close();
            return user;
        }
    }
}

