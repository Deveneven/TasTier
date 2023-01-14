using System;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public interface IAccountService
	{
        public UserDTO GetUserDTO(int id);
        public int Register(string name, string lastname, string password, string email, string salt);
        public LoginAuthDTO GetUserByLogin(string login);
    }
}

