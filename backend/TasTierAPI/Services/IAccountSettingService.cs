using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public interface IAccountSettingService
	{
        public void MakeConnection(string methodQuery);
        public bool ChangePrivacy(int id, bool state);
        public bool ChangeUsername(string username, int id);
        public bool ChangeName(string name, int id);
        public bool ChangeLastName(string lastname, int id);
        public bool ChangeEmail(string email, int id);
        public string ChangePassword(string password, int id_user);
        public LoginAuthDTO GetUserById(int id);
        public string SetAvatar(IFormFile file, int user_id);
        public string UploadBinary(IFormFile file);
    }
}

