using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
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
        public IEnumerable<DietDTO> GetAllDiets();
        public bool SetDiet(int id_diet, int id_user);
        public string ChangePassword(string password, int id_user);
        public LoginAuthDTO GetUserById(int id);
        public bool SetAvatar(IFormFile file, int user_id);
        public string UploadBinary(IFormFile file);
    }
}

