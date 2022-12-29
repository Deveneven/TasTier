﻿using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
	public interface IDietSettingsService
	{
        public void MakeConnection(string methodQuery);
        public IEnumerable<DietDTO> GetAllDiets();
        public bool SetDiet(int id_diet, int id_user);
        public IEnumerable<CousineDTO> GetAllCousines();
        public bool SetCousine(int id_cousine, int id_user);
        public bool ClearCousines(int id_user);
    }
}
