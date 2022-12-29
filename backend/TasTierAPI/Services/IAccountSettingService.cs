using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public interface IAccountSettingService
	{
        public void MakeConnection(string methodQuery);
        public bool ChangeUsername(string username, int id);
        public bool ChangeName(string name, int id);
        public bool ChangeLastName(string lastname, int id);
        public bool ChangeEmail(string email, int id);
        public string ChangePassword(string password, int id_user);
        public LoginAuthDTO GetUserById(int id);
    }
}

